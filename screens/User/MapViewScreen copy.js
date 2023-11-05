//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import MapView ,{ Marker }from 'react-native-maps';
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Location from 'expo-location';




// create a component
const MapViewScreenCopy = () => {

  
     // back functionality
      const navigation = useNavigation();
      const handleBack = () => {
        navigation.navigate('UserHomeScreen');
      };

  // current Location
  
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
 });

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
  
 
    };
    getLocation();
  }, []);
 
  const onRegionChange = region => {
    setPosition({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    })
  }
    async function LocationSelected() {
      // Reverse geocode to get location name
      let reverseGeocodeResponse = await Location.reverseGeocodeAsync({
        latitude: position.latitude,
        longitude: position.longitude,
      });
      
      if (reverseGeocodeResponse.length > 0) {
        const locationName = reverseGeocodeResponse[0].name;
        navigation.navigate('UserHomeScreen', { selectedMapLocation: locationName });
      }
    }
 
    return (
        <View style={styles.container}>


          <TouchableOpacity onPress={handleBack} style={{ position:'absolute',top:50,left:30 }}>
            <Icon name="arrow-left" size={20} color="#1697c7" />
          </TouchableOpacity>
{/* Map section */}
            
               
    <MapView 
        style={styles.map}
        initialRegion={position}
        region={position}
        onRegionChangeComplete={onRegionChange}>
       
       <Marker 
            coordinate={{
              latitude: position.latitude, 
              longitude: position.longitude
            }} 
            tracksViewChanges={true}>
            </Marker>
     
        </MapView>
  
    
              <Text style={styles.button} onPress={LocationSelected}>Done</Text>


        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
    width:500,
    height:900,
     marginTop:90
      },
    button: {
        backgroundColor: '#1697c7',
        paddingVertical: 15,
        alignItems: 'center',
        marginLeft:65,
        position:'absolute',
        top:800,
        textAlign:'center',
        width:300,
        borderRadius: 10,
        fontSize: 25,
        color: '#fff',
      },
});

//make this component available to the app
export default MapViewScreenCopy;
