import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'

import * as Location from 'expo-location';

const FindMechanicScreen = () => {
 
    // current Location
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
   
    fetchMechanics(); // Fetch mechanic data
  }, []);
//  *******************
const [mechanics, setMechanics] = useState([
   { id: 1, name: 'Mechanic 1', latitude: 37.78825, longitude: -122.4324 ,time:30,chargs:100},
   { id: 2, name: 'Mechanic 2', latitude: 37.7749, longitude: -122.4194,time:30,chargs:100 },
   // Add more mechanic data as needed
 ]);



     // back functionality
     const navigation = useNavigation();
     const handleBack = () => {navigation.navigate('UserHomeScreen')};

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

  return (
    <View style={styles.container}>
   
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

    <View style={{position:'absolute',top:200,left:100}}>
      <TouchableOpacity onPress={handleMarkerPress}>
         <Icon name='map-marker' size={70} color='#1697c7'  />
         <Text>Mechanic name</Text>
      </TouchableOpacity>
    </View>

      <Text style={{ marginLeft: 30,marginTop:10, fontSize: 25, color: '#1697c7', fontWeight: 'bold' }}>All Mechanic</Text>
      
      
      {/* Mechanic list */}
      <FlatList

        data={mechanics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
           <Text style={styles.mechanicName}>{item.name}</Text>
              <View style={styles.infoContainer}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Charges:</Text>
                  <Text style={styles.infoValue}>300</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Time:</Text>
                  <Text style={styles.infoValue}>10mins</Text>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Reviews:</Text>
                  <Text style={styles.infoValue}>4.5</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoLabel}>Distance:</Text>
                  <Text style={styles.infoValue}>{item.distance}</Text>
                </View>
              </View>
            <Text style={styles.button} onPress={()=>navigation.navigate('MechanicAcceptedScreen')} >Request Service</Text>
          </View>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginRight:'auto',
    textAlign: 'center',
    width: 200,
    borderRadius: 10,
    fontSize: 15,
    color: '#fff',
    marginTop:20
  
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
