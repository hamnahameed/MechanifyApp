//import liraries
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AppContext from '../../Provider/AppContext';
import TopBar from '../../components/TopBar';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import axiosconfig from '../../axios/axios'
import { ActivityIndicator } from 'react-native';
import { getTokenFromStorage, getUserFromStorage } from '../../authUtils/authUtils';
// create a component
const UserHomeScreen = () => {
  const [isloading, setloading] = useState(false)
  const navigation = useNavigation();
  const myContext = useContext(AppContext)


  // drawer
  const openDrawer = () => {
    navigation.openDrawer();
  };


  // current Location
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
  useEffect(()=>{
    const userUpdate = async ()=>{
      try {
        setloading(true);
        const user = await getUserFromStorage();
        getAddressFromCoordinates(myContext.latitude,myContext.longitude)
        const obj = {
          latitude: myContext.latitude,
          longitude: myContext.longitude,
          address:myContext.address,
          username:user.username,
        }
        console.log(obj, "obj to send");
  
        const token = await getTokenFromStorage();
        const response = await axiosconfig.put('/auth/updateuser', obj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Alert.alert(response?.data?.message)
        myContext.setUserRefresh(!myContext.userRefresh)
       } catch (error) {
        if (axios.isAxiosError(error)) {
          Alert.alert(error.response?.data?.message || "An Error Occured")
          console.log(error);
        }
      } finally {
        setloading(false);
      }
    }
    userUpdate();
  },[])



  const route = useRoute();
  // services functionality
  const [selectedService, setSelectedService] = useState(null);
  const handleServiceSelect = (serviceIndex) => {
    setSelectedService(serviceIndex);
  };



  // location input
  const handleLocationInputPress = () => {
    // Navigate to the 'LocationType' screen when the TextInput is pressed
    navigation.navigate('LocationType');
  };
  // the location from the location type screen
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (route.params && route.params.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
  }, [route.params]);
  // the location from the map
  const selectedMapLocation = route.params?.selectedMapLocation;

  const services = [
    { id: 0, name: 'car Repair', icon: require('../../assets/car.png') },
    { id: 1, name: 'Bike Repair', icon: require('../../assets/bike.png') },
    { id: 2, name: 'Tire services', icon: require('../../assets/tire.png') },
    { id: 3, name: 'Oil change', icon: require('../../assets/truck.png') },
    { id: 4, name: 'Battery Services', icon: require('../../assets/battery.png') },
    { id: 5, name: 'Health Checkup', icon: require('../../assets/shield.png') },
  ];
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TopBar navigation={navigation} />
        {isloading? <ActivityIndicator color={'#1697c7'}/>: 
         <TouchableOpacity onPress={handleLocationInputPress} style={styles.location}>
         <Icon name='map-marker' size={20} color='#1697c7' />
         <Text style={{ marginLeft: 10, fontSize: 15 }}>{myContext.address}</Text>
       </TouchableOpacity>
        }
       
        <ScrollView>


          <View style={{
            paddingTop: moderateScale(20),
            paddingHorizontal: moderateScale(10),
          }}>
            <Text style={{ fontSize: 29, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
              Get your Automobiles Fixed at Lowest Rates</Text>
            <Text style={{ textAlign: 'center', marginTop: moderateScale(10) }}>Select Mechanic that suits your budget</Text>
          </View>

          <Image style={{
            width: '100%',
            height: moderateScale(200), resizeMode: 'contain'
          }} source={require('../../assets/userhomeImage.jpg')} />


          <View>
            <Text style={{ fontSize: 30, color: '#1697c7', textAlign: 'center' }}>Our Services</Text>
            <View style={styles.ServiceContainer}>
              {services.map((service, index) => (
                <TouchableOpacity
                  key={service.id}
                  style={[styles.serviceBox, selectedService === index && styles.selectedService]}
                  onPress={() => handleServiceSelect(service.id, index)}
                >

                  <Image source={service.icon} />
                  <Text style={{ textAlign: 'center' }}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>


          {/* <Icon name='map-marker' size={25} style={{marginLeft:20,marginTop:10}} /> */}
          {/* <TouchableOpacity onPress={handleLocationInputPress}>
            <TextInput style={styles.input}
              // placeholder="Select Location" 
              placeholderTextColor='#1697c7' editable={false}
              value={myContext.address} />
          </TouchableOpacity> */}


          <View style={styles.button}>
            <Text style={{
              fontSize: 20,
              color: '#fff',
            }} onPress={() => navigation.navigate('FindMechanicScreen')}>Find a Mechanic</Text>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: moderateScale(30)
  },
  map: {
    marginTop: 60,
    height: 300,
  },

  servicesSlider: {
    flexDirection: 'row',
    padding: 10,


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
  serviceItem: {
    alignItems: 'center',
    padding: 10,
  },
  serviceName: {
    marginTop: 10,
    fontSize: 16,
  },
  scrollIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,

  },
  navigator: {
    backgroundColor: '#1697c7',
    borderRadius: 50,
    padding: 10
  },
  serviceinput: {
    width: 190,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 30,
    marginTop: -70,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#1697C7'
  },
  categoryinput: {
    width: 190,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 30,
    marginTop: -70,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#1697C7'
  },
  input: {
    width: 350,
    height: 40,
    marginLeft: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    marginBottom: 30,
    marginTop: 30,
    paddingHorizontal: 120,
    fontSize: 16,
    color: 'black'
  },
  button: {
    backgroundColor: '#1697c7',
    padding: moderateScale(15),
    marginHorizontal: moderateScale(30),
    marginVertical: moderateScale(40),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',

  },

  ServiceContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10)
  },
  serviceBox: {
    width: '30%',
    height: moderateScale(120),
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedService: {
    backgroundColor: 'lightGreen', // Change the color or add a border to indicate selection
  },
});

export default UserHomeScreen;
