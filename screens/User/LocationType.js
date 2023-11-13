//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity ,TextInput} from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; // You may need to install this package


// create a component
const LocationType = ({ navigation }) => {

    const handleSelectOnMap = () => {
      navigation.navigate('MapViewScreen');};

      const [location, setLocation]=useState('')
     
  const handleCheck = () => {
    // Pass the location back to the Home screen
    navigation.navigate('UserHomeScreen', { selectedLocation: location });
  };

  
    return (
        <View style={styles.container}>

        <View style={styles.addLocation}>
          <TextInput style={styles.input} placeholder="Enter Location"  value={location} onChangeText={(text) => setLocation(text)}/>
          <TouchableOpacity onPress={handleCheck}>
            <Icon name='check' size={25} color='#1697c7' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.mapSelection} onPress={handleSelectOnMap} >
          <Icon name="map-marker" size={30} color="#1697C7" />
          <Text style={styles.mapText}>Choose on Map</Text>
        </TouchableOpacity>
      </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        padding: 30,
      },
      input: {
        flex:1
      },
      addLocation:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#1697C7',
        width: 350,
        height: 40,
        marginBottom: 10,
        padding: 5,
      },
      mapSelection: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      mapText: {
        fontSize: 18,
        letterSpacing:2,
        color: '#1697C7',
        marginLeft: 10,
      },
});


export default LocationType;
