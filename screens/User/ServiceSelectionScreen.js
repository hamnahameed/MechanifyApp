import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You'll need to install the FontAwesome library

const services = [
  { id: 1, name: 'Car Repair', icon: require('../../assets/services/service1.png') },
  { id: 2, name: 'Bike Repair', icon: require('../../assets/services/service2.png') },
  { id: 3, name: 'Brake Inspection', icon: require('../../assets/services/service3.png') },
  { id: 4, name: 'Tire services', icon:require('../../assets/services/service4.png') },
  { id: 5, name: 'Battery Services',  icon:require('../../assets/services/service5.png') },
  { id: 6, name: 'Oil Change',  icon:require('../../assets/services/service6.png') },
  { id: 7, name: 'Engine Services',  icon:require('../../assets/services/service7.png') },
  { id: 8, name: 'Other',  icon:require('../../assets/services/service8.png') },
  
  // Add more services
];

const ServiceSelectionScreen = ({ navigation }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  const toggleServiceSelection = (service) => {
    const serviceIndex = selectedServices.indexOf(service);
    if (serviceIndex === -1) {
      setSelectedServices([...selectedServices, service]);
    } else {
      const updatedServices = [...selectedServices];
      updatedServices.splice(serviceIndex, 1);
      setSelectedServices(updatedServices);
    }
  };
   // back functionality
   const handleBack = () => {
     navigation.navigate('UserHomeScreen');

   };
  return (
    <View style={styles.container}>

     {/* Header with back button and logo */}
     <View>
      <TouchableOpacity onPress={handleBack} style={{ marginLeft: 15,marginTop:15 }}>
      <Icon name="arrow-left" size={20} color="black" />
    </TouchableOpacity>

    
    
      <Text style={styles.heading}>All Services</Text>
    </View>
     

     <View style={styles.servicesList}>
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleServiceSelection(item.name)}
              style={[
                styles.serviceBox,
                {
                  backgroundColor: selectedServices.includes(item.name) ? '#4F7942' : 'white',
                },
              ]}
            >
              <Image source={item.icon} size={40} color="black" />
              <Text style={styles.serviceName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
     
        
 
      <TouchableOpacity
        onPress={() => {
          // Pass the selected services back to the home screen or use context/API to manage state across screens
          navigation.navigate('UserHomeScreen', { selectedServices });
        }}
        style={styles.applyButton}
      >
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#1697c7',
    marginTop:30
  },
  heading: {
    fontSize: 30,
    marginTop: 30,
    marginLeft:20,
    color: 'white',
    fontWeight: 'bold',
    // textAlign:'center'
  },
  toggleButton: {
    padding: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  servicesList:{
    backgroundColor:'#fff',
    borderWidth:1,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderColor:'lightgray',
    width:'100%',
    height:'90%',
    marginTop:10,
    
  },
  serviceBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  serviceName: {
    fontSize: 16,
    marginTop: 10,
  },
  applyButton: {
    marginBottom: 40,
    padding: 10,
    backgroundColor: '#1697c7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default ServiceSelectionScreen;
