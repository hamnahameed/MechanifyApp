import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Location from 'expo-location';
import TopBar from '../../components/TopBar';
import AppContext from '../../Provider/AppContext';
import { moderateScale } from 'react-native-size-matters';
import { getTokenFromStorage } from '../../authUtils/authUtils';
import axios from 'axios';
import axiosconfig from '../../axios/axios'
import RBSheet from "react-native-raw-bottom-sheet";
import RequestSheet from '../../components/RequestSheet';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { OPTIONS } from '../Mechanic/ServicesOptions';
import Geocoder from 'react-native-geocoding';


const FindMechanicScreen = ({ navigation }) => {
  const myContext = useContext(AppContext)
  const refRBSheet = useRef();
  const [selectedMechanic, setSelectedMechanic] = useState(null)
  const [selectedService, setSelectedService] = useState([])
  // current Location
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // fetchMechanics(); // Fetch mechanic data
  }, []);

  const [mechanics, setMechanics] = useState([
    { id: 1, name: 'Mechanic 1', latitude: 37.78825, longitude: -122.4324, time: 30, chargs: 100 },
    { id: 2, name: 'Mechanic 2', latitude: 37.7749, longitude: -122.4194, time: 30, chargs: 100 },
    { id: 3, name: 'Mechanic 3', latitude: 37.7749, longitude: -122.4194, time: 30, chargs: 100 },
    { id: 4, name: 'Mechanic 4', latitude: 37.7749, longitude: -122.4194, time: 30, chargs: 100 },
    // Add more mechanic data as needed
  ]);

  // back functionality
  const handleBack = () => { navigation.navigate('UserHomeScreen') };
  const [modalVisible, setModalVisible] = useState(false);
  const handleMarkerPress = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    return () => {
      handleMarkerPress()
    };
  }, []);
  const handleLocationInputPress = () => {
    // Navigate to the 'LocationType' screen when the TextInput is pressed
    navigation.navigate('LocationType');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const obj = {
          latitude: myContext.latitude,
          longitude: myContext.longitude,
          services: selectedService,
        }
        console.log(obj, "send");
        console.log(selectedService);
        const token = await getTokenFromStorage();
        const response = await axiosconfig.post('/auth/getMechanics', obj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response?.data, "res");
        setMechanics(response?.data)

      } catch (error) {
        if (axios.isAxiosError(error)) {
          Alert.alert(error.response?.data?.message || "An Error Occured")
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedService, myContext.address]);

  function onMultiChange() {
    return (item) => setSelectedService(xorBy(selectedService, [item], 'id'))
  }
  const [addresses, setAddresses] = useState([]);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const newAddress = response.results[0].formatted_address;
      return newAddress;
    } catch (error) {
      console.error("Error fetching address:", error);
      return 'Address not available';
    }
  };

  // Assuming you have a useEffect to fetch and set addresses
  useEffect(() => {
    // Assuming mechanics is your data array
    const fetchAddresses = async () => {
      const newAddresses = await Promise.all(
        mechanics.map(async (item) => await getAddressFromCoordinates(item.latitude, item.longitude))
      );
      setAddresses(newAddresses);
    };

    fetchAddresses();
  }, [mechanics]);

  return (
    <>
      {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={"#1697c7"} size={'large'} />
      </View> :
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <TopBar navigation={navigation} />
            <TouchableOpacity onPress={handleLocationInputPress} style={styles.location}>
              <Icon name='map-marker' size={20} color='#1697c7' />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>{myContext.address}</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', margin: moderateScale(10) }}>
              <Text style={{ color: "#1697c7" }}>{'Please Select Service(s)'}</Text>
              <SelectBox
                labelStyle={{ display: 'none' }}
                arrowIconColor="#1697c7"
                searchIconColor="#1697c7"
                toggleIconColor="#1697c7"
                multiOptionContainerStyle={{ backgroundColor: '#1697c7' }}
                options={OPTIONS}
                selectedValues={selectedService}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
                listOptionProps={{ nestedScrollEnabled: true }}
                fixedHeight={true}

              />
            </View>

            <Text style={{
              marginLeft: 30,
              marginTop: 10,
              fontSize: 25,
              color: '#1697c7', fontWeight: 'bold'
            }}>All Mechanic</Text>


            {/* Mechanic list */}
            {mechanics.length == 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No data Avalaible</Text></View>
              :
              <FlatList

                data={mechanics}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <>
                    <View style={styles.card}>
                      <View>
                        <Text style={styles.mechanicName}>{item.username}</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon style={{ marginRight: moderateScale(5) }} name='map-marker' size={20} color='#1697c7' />
                        <Text>{addresses[index]}</Text>
                      </View>
                      {Array.isArray(item.services) && item.services.length > 0 &&
                        <View style={{ flexDirection: 'row' }}>
                          <Entypo style={{ marginRight: moderateScale(5) }} name='tools' size={20} color='#1697c7' />
                          <Text>{item.services.map(obj => obj['item']).join(', ')}</Text>
                        </View>
                      }

                      <Text style={styles.button} onPress={() => {
                        setSelectedMechanic(item)
                        refRBSheet.current.open()
                      }} >Request Service</Text>
                    </View>


                  </>

                )}
              />

            }


          </View>

          <RBSheet
            animationType='fade'
            height={Dimensions.get('window').height * 0.7}
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent"
              },
              draggableIcon: {
                backgroundColor: "#000"
              }
            }}
          >
            <RequestSheet navigation={navigation} mechanic={selectedMechanic} />
          </RBSheet>

        </SafeAreaView>


      }
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: moderateScale(20)
  },
  location: {
    backgroundColor: 'whitesmoke',
    // borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    padding: moderateScale(10),
    marginTop: moderateScale(10)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 8,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: '#1697c7',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  mechanicName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  distance: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    backgroundColor: '#1697c7',
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: 200,
    borderRadius: 10,
    fontSize: 15,
    color: '#fff',
    marginTop: 20

  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  infoColumn: {
    flexDirection: 'row',
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  infoValue: {
    marginRight: 10,
  },
});

export default FindMechanicScreen;
