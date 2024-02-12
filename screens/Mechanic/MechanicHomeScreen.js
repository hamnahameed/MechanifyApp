import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import AppContext from '../../Provider/AppContext';
import Geocoder from 'react-native-geocoding';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';
import axios from 'axios';
import axiosconfig from '../../axios/axios'
import { getTokenFromStorage } from '../../authUtils/authUtils';


// Import your modal component here if you have one
const MechanicHomeScreen = ({ navigation }) => {
  const myContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState(myContext.address)

  Geocoder.init("AIzaSyCYvOXB3SFyyeR0usVOgnLyoDiAd2XDunU");
  // current Location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    // console.log(location?.coords?.latitude,location?.coords?.longitude);
    myContext.setLatitude(location?.coords?.latitude);
    myContext.setLongitude(location?.coords?.longitude);
    getAddressFromCoordinates(location?.coords?.latitude, location?.coords?.longitude);
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const newAddress = response.results[0].formatted_address;
      myContext.setAddress(newAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log('Submitted:', inputText);

    // After submission, close the modal
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            const token = await getTokenFromStorage();
            const response = await axiosconfig.get('/auth/getUser', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response?.data?.data.address, "res");
            setAddress(response?.data?.data?.address)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Alert.alert(error.response?.data?.message || "An Error Occured")
            }
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [myContext.userRefresh]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
     
        <View style={styles.container}>

          {/* Popup Modal */}
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Enter Your Address First</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Type Address"
                  onChangeText={(text) => setInputText(text)}
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
                  <Icon name='plus' size={15} style={{ marginLeft: 110 }} />
                  <Text style={styles.buttonText} onPress={() => navigation.navigate('MapViewScreen')}>Add New Address</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


         <TopBar navigation={navigation}/>
         <ScrollView showsVerticalScrollIndicator={false}>
          {/* Background with Tag Line */}
          <View style={styles.background}>
            <Text style={styles.tagline}>At your Service</Text>
            <Text style={styles.tagline}>24 / 7</Text>
          </View>
          {loading? <ActivityIndicator color={"#1697c7"} size={'large'}/>:
           <View style={styles.location}>
           <Icon name='map-marker' size={20} color='#1697c7' />
           <Text style={{ marginLeft: 10, fontSize: 15 }}>{address}</Text>
         </View>
          }
         
          <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: moderateScale(40) }}>
            <Image source={require('../../assets/heroImg2.png')} style={{ width: 300, height: 300, resizeMode:'cover' }} />
          </View>

          <View style={{
            backgroundColor: '#1697c7',
            padding: moderateScale(15),
            marginHorizontal: moderateScale(30),
            marginVertical:moderateScale(40),
            borderRadius:15,
            justifyContent:'center',
            alignItems:'center',

          }}>
            <Text style={styles.button} onPress={() => { navigation.navigate('ServiceRequestsScreen'); }}>View All Requests</Text>
          </View>


          </ScrollView>
        </View>
        {/* <BottomSheetExample/> */}



    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  background: {
    backgroundColor: '#1697C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    color: '#fff',
    fontSize: 35,
    textAlign: 'center',
    padding: 10,
    fontFamily: 'serif',
    fontWeight: 'bold'
  },
  location: {
    backgroundColor: 'whitesmoke',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    padding: moderateScale(10),
    marginTop: moderateScale(10)
  },
  button: {
    fontSize: 18,
    color: '#fff',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // marginTop:600
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    height: '40%',
    marginTop: 500
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
  modalButton: {
    backgroundColor: '#1697c7',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 160

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    textAlign: 'center'
  },

});

export default MechanicHomeScreen;
