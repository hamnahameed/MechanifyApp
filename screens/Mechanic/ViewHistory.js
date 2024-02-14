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
import { ActivityIndicator } from 'react-native-paper';
import AppContext from '../../Provider/AppContext';
import Modal from "react-native-modal";
import Geocoder from 'react-native-geocoding';



const ViewHistory = ({route}) => {
console.log(route.params);
  const myContext = useContext(AppContext)
  console.log(myContext.requestRefresh, 'refresh');
  const [loading, setLoading] = useState(false)
  const [isloading, setloading] = useState(false)
  const [request, setRequest] = useState({})
  const [requestor, setRequestor] = useState({})
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState("")
  // Handle opening WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = requestor.phoneNum;
    const whatsappMessage = 'Hello, I am your mechanic.';

    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${whatsappMessage}`);
  };
  // Handle making a phone call
  const makePhoneCall = () => {
    const phoneNumber = requestor.phoneNum;
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
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const newAddress = response.results[0].formatted_address;
      setAddress(newAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = await getTokenFromStorage();
      const res = await axiosconfig.get(`/getRequest/${route?.params?.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res?.data?.data?.request);
          setRequest(res?.data?.data?.request);
          setRequestor(res?.data?.data?.requestor);
          setInitialRegion({
            latitude: res?.data?.data?.request.latitude,
            longitude: res?.data?.data?.request.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          await getAddressFromCoordinates(res?.data?.data?.request.latitude,res?.data?.data?.request.longitude)
      
       


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
    if (request.isAccepted) {
      Alert.alert("Accepted Request can't be cancelled !!")
      return
    }
    else {
      setModalVisible(!isModalVisible)
    }

  }
  const handleDelete = async () => {
    try {

      setloading(true);
      const token = await getTokenFromStorage();
      const response = await axiosconfig.delete(`/delRequest/${route?.params?.id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert(response?.data?.message)
      myContext.setRequestRefresh(!myContext.requestRefresh)
      setModalVisible(!isModalVisible)
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
      {loading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator color={"#1697c7"} size={'large'}/>
                </View> :
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <TopBar navigation={navigation} />
          
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
                        <Text style={{ color: '#FFF', fontSize: 15 }}>Status:</Text>
                      </View>
                      <View style={{ flex: 3, backgroundColor: request.currentStatus == "completed" ? "green" : "red", padding: moderateScale(5) }}>
                        <Text style={{ color: '#FFF', fontSize: 15, textAlign: 'center' }}>{request.currentStatus}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{
                    flex: 3,
                    borderRadius: 10,
                    padding: moderateScale(10)
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.dateTimeView, { flex: 1 }]}><Text style={styles.dateTime}>Date & Time:</Text></View>
                      <View style={styles.dateTimeView}><Text style={styles.dateTime}> {formatDateTime(request.createdAt).date}  {formatDateTime(request.createdAt).time}</Text></View>
                    </View>

                    {Array.isArray(request.services) && request.services.length > 0 &&
                      <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.dateTimeView, { flex: 1 }]}><Text style={styles.dateTime}>Services: </Text></View>
                        <View style={styles.dateTimeView}><Text style={styles.dateTime}>{request.services.map(obj => obj['item']).join(', ')}</Text></View>
                      </View>

                    }
                    
                   
                      <TouchableOpacity
                        onPress={cancelRequest}
                        style={{
                          backgroundColor: '#1697c7',
                          padding: moderateScale(10),
                          marginHorizontal: moderateScale(30),
                          borderRadius: 10,
                          justifyContent: 'center',
                          marginTop: moderateScale(10),
                          flexDirection: 'row',
                        }}>
                        <Text style={{ color: "#FFF", textAlign: 'center', fontSize: 15 }}>{"Delete Request"}</Text>
                      </TouchableOpacity>
                   
                      <View style={{margin:moderateScale(10)}}>
                      <Text style={styles.dateTime}>Description: </Text>
                      <Text>{request.description}</Text>
                    </View>





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
                    <View style={{ flex: 3, padding: moderateScale(5) }}>
                      <Text style={{ fontSize: 15, color: '#C0C0C0' }}>{requestor.username}</Text>
                      <Text style={{ fontSize: 10, color: '#C0C0C0' }}>{address}</Text>
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
           

            <Modal isVisible={isModalVisible}
              onRequestClose={() => {
                setModalVisible(!isModalVisible);
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                  backgroundColor: 'white',
                  padding: moderateScale(20),
                  overflow: 'hidden',
                  borderRadius: 5
                }}
              >
                <Text>Are you sure you want to delete the request? It can't be undone.</Text>
                <View style={{ flexDirection: 'row', marginTop: moderateScale(10) }}>
                  <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} style={{
                    flex: 1,
                    backgroundColor: '#1697c7',
                    padding: moderateScale(5),
                    borderRadius: 5,
                    marginHorizontal: moderateScale(5)
                  }}>
                    <Text style={{ textAlign: 'center', color: '#FFF' }}>cancel</Text>
                  </TouchableOpacity>
                  {isloading? <ActivityIndicator color='#1697c7'/>:
                   <TouchableOpacity
                    onPress={handleDelete}
                    style={{ flex: 1, backgroundColor: '#1697c7', padding: moderateScale(5), borderRadius: 5, marginHorizontal: moderateScale(5) }}>
                   <Text style={{ textAlign: 'center', color: '#FFF' }}>yes</Text>
                   </TouchableOpacity>
                  }
                 
                </View>
              </View>
            </Modal>







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
    fontSize: 12,
    color: '#000'
  },
  dateTimeView: {
    flex: 3,
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

export default ViewHistory;
