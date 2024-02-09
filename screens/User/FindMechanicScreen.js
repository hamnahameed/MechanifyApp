import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList,TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'

import * as Location from 'expo-location';

const FindMechanicScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
   
    fetchMechanics(); // Fetch mechanic data
  }, []);

  // Dummy mechanic data for demonstration
  const fetchMechanics = () => {
    const dummyMechanics = [
      { id: 1, name: 'Mechanic Name', distance: '2.3 km' },
      { id: 2, name: 'Mechanic 2', distance: '3.5 km' },
      { id: 3, name: 'Mechanic 3', distance: '4.1 km' },
      // Add more mechanic data as needed
    ];
    setMechanics(dummyMechanics);
  };

  const handleBack = () => {
    navigation.navigate('UserHomeScreen');
  };

  return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
              <AntDesign name="arrowleft" color={'#1697c7'} size={25} />
    </TouchableOpacity>
        <TextInput style={styles.textInput} value={currentLocation ? `${currentLocation.latitude}, ${currentLocation.longitude}` : ''} editable={false} />
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
