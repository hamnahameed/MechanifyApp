import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { moderateScale } from 'react-native-size-matters';
import AppContext from '../../Provider/AppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';


const MechanicLocationScreen = ({ navigation }) => {
  const myContext = useContext(AppContext);


  const mapRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: myContext.latitude,
        longitude: myContext.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };
  const getLocationBack = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
     // console.log(location?.coords?.latitude,location?.coords?.longitude);
    myContext.setLatitude(location?.coords?.latitude);
    myContext.setLongitude(location?.coords?.longitude);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: myContext.latitude,
        longitude: myContext.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      }, 1000);
    }
    
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
  const handleSave = () => {
    getAddressFromCoordinates(myContext.latitude, myContext.longitude);
    console.log(myContext.address);
    navigation.navigate('MechanicHomeScreen')
  };

return (
    <View style={styles.container}>
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: myContext.latitude,
        longitude: myContext.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onMapReady={getCurrentLocation} 
      // showsUserLocation={true}
        // showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        onRegionChange={(newRegion) => {
          // Update the latitude and longitude based on the new region
          myContext.setLatitude(newRegion.latitude);
          myContext.setLongitude(newRegion.longitude);
        }}
    >
    </MapView>
    <Marker
        style={styles.markerFixed}
        title='You are here'
        description='This is a description'
        coordinate={{
          latitude: myContext.latitude,
          longitude: myContext.longitude,
        }}
        onDragEnd={(e) => {
          console.log("Marker dragged to:", e.nativeEvent.coordinate);
          const { latitude: markerLatitude, longitude: markerLongitude } = e.nativeEvent.coordinate;
          myContext.setLatitude(markerLatitude);
          myContext.setLongitude(markerLongitude);
          
        }}
      >
        <View>
          <MaterialCommunityIcons name="map-marker-outline" color={'#1697C7'} size={40} />
        </View>
      </Marker>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', margin: moderateScale(10), flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.icon}>
              <AntDesign name="arrowleft" color={'#1697C7'} size={25} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <Text style={styles.heading}>Map</Text>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input, description: { color: '#000' } }}
            placeholder='Enter Location'
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            fetchDetails={true}
            query={{
              key: "AIzaSyCAJ-vi4G_teVyt2t23fQF3yJ87Bf6AhEk",
              language: "en",
            }}
            onPress={(data, details = null) => {
              console.log(details?.geometry?.location);
              myContext.setLatitude(details?.geometry?.location?.lat);
              myContext.setLongitude(details?.geometry?.location?.lng);
              mapRef.current.animateToRegion({
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
              }, 1000);
            }}
            onFail={(error) => console.error(error)} />
        </View>
        <View style={{ alignItems: 'flex-end', marginHorizontal: moderateScale(20), flex: 1 }}>
          <TouchableOpacity onPress={getLocationBack} style={styles.icon}>
            <MaterialIcons name="my-location" color={'#1697C7'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1.5 }}>
          <TouchableOpacity onPress={()=>handleSave()}  style={styles.btn}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: 'center'
  },
  heading: {
    color: '#1697C7',
    // fontFamily: Poppins_SemiBold,
    fontSize: 15,
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    marginHorizontal: moderateScale(20),
    borderRadius: 5,
    paddingHorizontal: moderateScale(10),
    fontSize: 15,
    // fontFamily: Poppins_Regular,
    color: 'black',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn: {
    backgroundColor: '#1697C7',
    padding: moderateScale(15),
    marginHorizontal: moderateScale(20),
    borderRadius: 15,

  },
  btnText: {
    color: 'white',
    // fontFamily: Poppins_SemiBold,
    fontSize: 15,
    textAlign: "center"
  },
  markerFixed: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },
});

export default MechanicLocationScreen;
