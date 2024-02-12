import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native';
import * as Location from 'expo-location';
import { getTokenFromStorage, getUserFromStorage } from '../../authUtils/authUtils';
import axios from 'axios';
import axiosconfig from '../../axios/axios'
import TopBar from '../../components/TopBar';
import { moderateScale } from 'react-native-size-matters';
import LoadingScreen from '../Main/LoadingScreen';
import { ActivityIndicator } from 'react-native-paper';
import AppContext from '../../Provider/AppContext';



const MechanicAcceptedScreen = () => {
  
  const myContext = useContext(AppContext)
  console.log(myContext.requestRefresh,'refresh');
  const [loading, setLoading] = useState(false)
  const [isloading, setloading] = useState(false)
  const [request, setRequest] = useState(null)
  const [mechanic, setMechanic] = useState(null)
  // Handle opening WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = mechanic.phoneNum;
    const whatsappMessage = 'Hello, I am your mechanic.';

    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${whatsappMessage}`);
  };
  // Handle making a phone call
  const makePhoneCall = () => {
    const phoneNumber = mechanic.phoneNum;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // back functionality
  const navigation = useNavigation();


  //   open drawer
  const openDrawer = () => {
    navigation.openDrawer();
  };


  // current Location
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);



      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };


    getLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = await getTokenFromStorage();
        const user = await getUserFromStorage();
        const response = await axiosconfig.get(`/allRequests/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response?.data?.data, "res");
        const filteredRequests = response?.data?.data.filter(
          (request) => request.currentStatus === "pending" || request.currentStatus === "inprogress"
        );
        console.log(filteredRequests);
        if (filteredRequests.length !== 0) {
          const res = await axiosconfig.get(`/getRequest/${filteredRequests[0]._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res?.data?.data?.request);
          setRequest(res?.data?.data?.request);
          setMechanic(res?.data?.data?.mechanic);
          setInitialRegion({
            latitude: res?.data?.data?.mechanic.latitude,
            longitude: res?.data?.data?.mechanic.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
        else{
          setMechanic(null)
          setRequest(null)
        }
       


      } catch (error) {
        if (axios.isAxiosError(error)) {
          Alert.alert(error.response?.data?.message || "An Error Occured")
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [myContext.requestRefresh]);
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    // Format date as dd-mm-yyyy
    const formattedDate = dateTime.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Format time as 12-hour clock with AM/PM
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  const cancelRequest = async () => {
    try {
      if (request.isAccepted) {
        Alert.alert("Accepted Request can't be cancelled !!")
        return
      }
      setloading(true);
      const obj = {
        currentStatus: 'cancelledbyuser'
      }
      console.log(obj, "obj to send");

      const token = await getTokenFromStorage();
      const response = await axiosconfig.put(`/updateRequest/${request._id}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert(response?.data?.message)
      myContext.setRequestRefresh(!myContext.requestRefresh)
      navigation.navigate('UserHomeScreen');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data?.message || "An Error Occured")
        console.log(error);
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      {loading ? <LoadingScreen /> :
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <TopBar navigation={navigation} />
            {!request || !mechanic ?
            <>
            <View><Text style={{textAlign:'center'}}>No Active Request found</Text></View>
            <TouchableOpacity
              onPress={()=>navigation.navigate("FindMechanicScreen")}
                style={{
                  backgroundColor: '#1697c7',
                  padding: moderateScale(15),
                  marginHorizontal: moderateScale(30),
                  borderRadius: 10,
                  justifyContent: 'center',
                  marginTop: moderateScale(10),
                  flexDirection: 'row',
                }}>
                <Text style={{ color: "#FFF", textAlign: 'center', fontSize: 15 }}>{"Find Mechanic"}</Text>
              </TouchableOpacity> 
            </>
              :
              <View style={{ flex: 1 }}>

                <View style={{ flex: 2 }}>
                  {initialRegion && (
                    <MapView style={styles.map} initialRegion={initialRegion} >
                      {currentLocation && (
                        <Marker
                          coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                          }}
                          tracksViewChanges={true}
                          title="Your Location"
                        />
                      )}

                    </MapView>
                  )}
                </View>
                <View style={{ flex: 3 }}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{
                      backgroundColor: '#1697c7',
                      padding: moderateScale(15),
                      marginHorizontal: moderateScale(30),
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                      <View style={{ flex: 1, padding: moderateScale(5) }}>
                        <Text style={{ color: '#FFF', fontSize: 20 }}>Status:</Text>
                      </View>
                      <View style={{ flex: 1, backgroundColor: request.currentStatus == "pending" ? "red" : "green", padding: moderateScale(5) }}>
                        <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center' }}>{request.currentStatus}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{
                    flex: 3,
                    borderColor: '#C0c0c0',
                    borderWidth: 2,
                    marginHorizontal: moderateScale(20),
                    borderRadius: 10,
                    padding: moderateScale(10)
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.dateTimeView}><Text style={styles.dateTime}>Request Date:</Text></View>
                      <View style={styles.dateTimeView}><Text style={styles.dateTime}> {formatDateTime(request.createdAt).date}</Text></View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.dateTimeView}><Text style={styles.dateTime}>Request Time:</Text></View>
                      <View style={styles.dateTimeView}><Text style={styles.dateTime}> {formatDateTime(request.createdAt).time}</Text></View>
                    </View>
                    {Array.isArray(request.services) && request.services.length > 0 &&
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.dateTimeView}><Text style={styles.dateTime}>Request Services: </Text></View>
                        <View style={styles.dateTimeView}><Text style={styles.dateTime}>{request.services.map(obj => obj['item']).join(', ')}</Text></View>
                      </View>

                    }
                    {isloading ? <ActivityIndicator /> :
                      <TouchableOpacity
                        onPress={cancelRequest}
                        style={{
                          backgroundColor: '#1697c7',
                          padding: moderateScale(15),
                          marginHorizontal: moderateScale(30),
                          borderRadius: 10,
                          justifyContent: 'center',
                          marginTop: moderateScale(10),
                          flexDirection: 'row',
                        }}>
                        <Text style={{ color: "#FFF", textAlign: 'center', fontSize: 15 }}>{"Cancel Request"}</Text>
                      </TouchableOpacity>
                    }






                  </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <View style={{
                    flexDirection: 'row',
                    padding: 16,
                    borderTopStartRadius: 30,
                    borderTopEndRadius: 30,
                    backgroundColor: '#1697c7',
                  }}>
                    <View style={{ flex: 1 }}>
                      <Image source={require('../../assets/john.jpg')} style={styles.contactImage} />
                    </View>
                    <View style={{ flex: 3 }}>
                      <Text style={{ fontSize: 20, marginLeft: 20, color: '#C0C0C0', fontWeight: 'bold', width: 100 }}>{mechanic.username}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity onPress={makePhoneCall} style={styles.phoneButton}>
                        <Icon name="phone" size={30} color="#007AFF" style={styles.phoneIcon} />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }}>
                      <TouchableOpacity onPress={openWhatsApp} style={styles.phoneButton}>
                        <Icon name="whatsapp" size={30} color="#027148" style={styles.whatsappIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </View>
            }









          </View>
        </SafeAreaView>
      }
    </>



  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: moderateScale(30)
  },
  map: {
    flex: 1,
  },
  dateTime: {
    fontSize: 15,
    color: '#000'
  },
  dateTimeView: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: moderateScale(10)
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },


  phoneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#C0c0c0',
    width: 50,
    height: 50
  },

});

export default MechanicAcceptedScreen;
