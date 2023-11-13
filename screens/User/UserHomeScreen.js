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


  // scroll functionality
    const scrollViewRef = useRef();
    const handleScroll = (direction) => {
      if (direction === 'right') {
        scrollViewRef.current.scrollTo({ x: 200, animated: true });
      } else {
        // Handle scrolling to the right if needed
      }
    };

  const route = useRoute();

  
// sevice input
    const handleServiceInputPress = () => {
      // Navigate to the 'LocationType' screen when the TextInput is pressed
      navigation.navigate('ServiceSelectionScreen');
    };
// service inputText
    const { selectedServices } = route.params || { selectedServices: [] };



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


  // const services = [
  //   { name: 'car Repair', icon: require('../../assets/car.png') },
  //   { name: 'Bike Repair', icon: require('../../assets/bike.png') },
  //   { name: 'Tire services', icon: require('../../assets/tire.png') },
  //   { name: 'Oil change', icon: require('../../assets/truck.png') },
  //   { name: 'Battery Services', icon: require('../../assets/battery.png') },
    
  // ];
 
    return (

  // header Part
        <View style={styles.container}>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 40 ,top:40}}>
              <TouchableOpacity onPress={openDrawer}>
                  <Icon name="bars" size={30} color="#1697C7" top={5}/>
              </TouchableOpacity>
     
 {/* logo */}
              <Image style={{width: 200,height: 150,position:'absolute',left:250,top:-40 }}
                    source={require('../../assets/logo2.png')}/>
          </View>

{/* Map part */}
  {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
      )}


{/* Services part */}
      {/* Scroll indicator icons */}
      {/* <View style={styles.scrollIndicators}>

        <ScrollView horizontal style={styles.servicesSlider}
        ref={scrollViewRef}>
        {services.map((service, index) => (
          <View style={styles.serviceItem} key={index}>
            <Image source={service.icon} style={styles.serviceIcon} />
            <Text style={styles.serviceName}>{service.name}</Text>
          </View>
        ))} */}
        {/* Add more service items here */}
      {/* </ScrollView>
        <TouchableOpacity onPress={() => handleScroll('right')}>
          <Icon name="chevron-right" size={10} color="black"  top={20} style={styles.navigator}/>
        </TouchableOpacity>
        </View> */}


{/* Service input */}
  <View style={{display:'flex',flexDirection:'row'}}>
    <Icon name='clipboard' size={20} style={{marginLeft:20,marginTop:55}}/>
    <TouchableOpacity onPress={handleServiceInputPress}>
      <TextInput style={styles.input} placeholder="Select Service"  value={selectedServices ? selectedServices.join(', ') : ''} editable={false}/>    
    </TouchableOpacity> 
  </View>

{/* Location Input */}
  <View style={{display:'flex',flexDirection:'row'}}>
    <Icon name='map-marker' size={25} style={{marginLeft:20,marginTop:55}} />
    <TouchableOpacity onPress={handleLocationInputPress}>
        <TextInput style={styles.input} placeholder="Select Location"  editable={false}         
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
    input: {
      width: 350,
      height: 40,
      marginLeft:20,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#000',
      marginBottom: 10,
      marginTop:50,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#1697C7'
    },
    button: {
      backgroundColor: '#1697c7',
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 10,
      marginTop:'50%',
      marginLeft:10,
      textAlign:'center',
      width:400,
      borderRadius: 10,
      fontSize: 20,
      color: '#fff',
    },
  });

export default UserHomeScreen;
