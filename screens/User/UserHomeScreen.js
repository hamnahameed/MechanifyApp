//import liraries
import React,  { useState,useRef,useEffect} from 'react';
import { View, Text,Image, StyleSheet ,TouchableOpacity,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import {useNavigation,useRoute } from '@react-navigation/native'
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location';



// create a component
const UserHomeScreen = () => {
  
    const navigation = useNavigation();


  // drawer
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

  // header Part
        <View style={styles.container}>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 40 ,top:40}}>
              <TouchableOpacity onPress={openDrawer}>
                  <Icon name="bars" size={30} color="#1697C7" top={5}/>
                  
              </TouchableOpacity>
     
 {/* logo */}
              <Image style={{width: 200,height: 150,position:'absolute',left:250,top:-40 }} source={require('../../assets/logo2.png')}/>
          </View>

{/* headingpart */}

      <View style={{marginTop:60}}>
        <Text style={{fontSize:29,fontWeight:'bold',textAlign:'center',color:'black'}}>
          Get your Automobiles Fixed at Lowest Rates</Text>
        <Text style={{textAlign:'center',}}>Select Mechanic that suits your budget</Text>
      
        <Image style={{width:'100%',height:'48%'}} source={require('../../assets/userhomeImage.jpg')} />
        <Text style={{fontSize:30,color:'#1697c7',textAlign:'center',marginTop:-20}}>Select Service</Text>
      </View>


{/* Service input */}
<View style={{display:'flex',flexDirection:'row'}}>

  <View style={styles.ServiceContainer}>
  {services.map((service, index) => (
    <TouchableOpacity
       key={service.id}
       style={[styles.serviceBox, selectedService === index && styles.selectedService]}
       onPress={() => handleServiceSelect(service.id, index)}
     >

          <Image source={service.icon}/>
          <Text>{service.name}</Text>
        </TouchableOpacity>
      ))}
      </View>
</View>
{/* Location Input */}
  <View style={{display:'flex',flexDirection:'row'}}>
    {/* <Icon name='map-marker' size={25} style={{marginLeft:20,marginTop:10}} /> */}
    <TouchableOpacity onPress={handleLocationInputPress}>
        <TextInput style={styles.input} placeholder="Select Location" placeholderTextColor='#1697c7'  editable={false}         
        value={(location) + (selectedMapLocation ? `${selectedMapLocation.latitude}, ${selectedMapLocation.longitude}` : '')} onChangeText={(text) => setLocation(text)}  /> 
    </TouchableOpacity>   
  </View>


    <View style={styles.buttonContainer}>
      <Text style={styles.button} onPress={()=>navigation.navigate('FindMechanicScreen')}>Find a Mechanic</Text>
    </View>
     
</View>
  );
};

// define your styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
    
    },
    map: {
      marginTop: 60,
      height:300,
    },
   
    servicesSlider: {
      flexDirection: 'row',
      padding: 10,
     
      
    },
    serviceItem: {
      alignItems: 'center',
      padding: 10,
    },
    serviceName: {
      marginTop:10,
      fontSize: 16,
    },
    scrollIndicators: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft:10,
      marginRight:10,
     
    },
    navigator:{
      backgroundColor:'#1697c7',
      borderRadius:50,
      padding:10
    },
    serviceinput:{
      width: 190,
      marginLeft:15,
      borderWidth: 1,
      borderColor: '#000',
      marginBottom: 30,
      marginTop:-70,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#1697C7'
    },
    categoryinput:{
      width: 190,
      marginLeft:15,
      borderWidth: 1,
      borderColor: '#000',
      marginBottom: 30,
      marginTop:-70,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#1697C7'
    },
    input: {
      width: 350,
      height: 40,
      marginLeft:40,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: '#000',
      marginBottom: 30,
      marginTop:30,
      paddingHorizontal: 120,
      fontSize: 16,
      color:'black'
    },
    button: {
      backgroundColor: '#1697c7',
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 10,
      marginTop:'-3%',
      marginLeft:10,
      textAlign:'center',
      width:400,
      borderRadius: 10,
      fontSize: 20,
      color: '#fff',
    },
   
    ServiceContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginTop:-130
    },
  
    serviceBox: {
      width: '30%',
      height: 120,
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
