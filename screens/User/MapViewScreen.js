//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import MapView ,{ Marker }from 'react-native-maps';
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Location from 'expo-location';




// create a component
const MapViewScreen = () => {

  
     // back functionality
      const navigation = useNavigation();
      const handleBack = () => {navigation.navigate('UserHomeScreen')};

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
 
 

  function LocationSelected() {
    navigation.navigate('UserHomeScreen', { selectedMapLocation: currentLocation });
  }
    return (
        <View style={styles.container}>


          <TouchableOpacity onPress={handleBack} style={{ position:'absolute',top:50,left:30 }}>
            <Icon name="arrow-left" size={20} color="#1697c7" />
          </TouchableOpacity>
{/* Map section */}
            
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


export default MapViewScreen;
