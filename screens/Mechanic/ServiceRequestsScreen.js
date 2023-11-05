import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,ScrollView,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import {useNavigation} from '@react-navigation/native'



const ServiceRequestsScreen = () => {
  const navigation = useNavigation();
  // Dummy service request data
  const dummyRequests = [
    { id: 1, serviceType: 'Oil Change', location: '123 Main St' },
    { id: 2, serviceType: 'Tire Rotation', location: '456 Elm St' },
    { id: 3, serviceType: 'Brake Repair', location: '789 Oak St' },
  ];

  const [requests, setRequests] = useState(dummyRequests);

  const handleAccept = (requestId) => {
    // Implement logic to accept the request (in-memory update for this example).
    const updatedRequests = requests.map((request) => {
      if (request.id === requestId) {
        return { ...request, status: 'Accepted' };
      }
      return request;
    });
    setRequests(updatedRequests);
    
    navigation.navigate('AcceptedRequestScreen');
  
  };

  const handleDecline = (requestId) => {
    // Implement logic to decline the request (in-memory update for this example).
    const updatedRequests = requests.map((request) => {
      if (request.id === requestId) {
        return { ...request, status: 'Declined' };
      }
      return request;
    });
    setRequests(updatedRequests);
  };
  
  const openDrawer = () => {
    navigation.openDrawer();
};



  return (
    <View style={styles.container}>
          
          


            
            <View style={
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 40,
                    top: 30
                }
            }>
              <TouchableOpacity onPress={openDrawer}>
      <Icon name="bars"
                        size={30}
                        color="#1697C7" top={5} left={-10} />
      </TouchableOpacity>

        {/* logo */}
        <Image style={
                        {
                            width: 200,
                            height: 150,
                            position: 'absolute',
                            left: 230,
                            top: -40

                        }
                    }
                    source={
                        require('../../assets/logo2.png')
                    }/>

</View>
  <View style={
                styles.background
            }>
            </View>
      <Text style={styles.heading}>Service Requests</Text>
      
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView>
          <View style={styles.requestContainer}>
            <Text style={styles.serviceType}> {item.serviceType}</Text>
            <Text style={styles.location}>Location: {item.location}</Text>
            {item.status ? (
              <Text style={styles.status}>Status: {item.status}</Text>
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#4F7942' ,}]}
                  onPress={() => handleAccept(item.id)}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#C0C0C0' ,marginLeft:10}]}
                  onPress={() => handleDecline(item.id)}
                >
                  <Text style={[styles.buttonText ,{color:'red'}] }>Decline</Text>
                </TouchableOpacity>
              </View>
             
            )}
            
          </View>
          
          </ScrollView>

        )}
      />
      
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    top: 100,
    left: 0,
    width: '120%',
    height: '15%',
    backgroundColor: '#1697C7', // Set your preferred color
},
logoContainer: {
  alignItems: 'right',
  marginVertical: 20
},
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 70,
    letterSpacing:2,
    marginLeft:20
  },
  requestContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    marginTop: 60,
  },
  serviceType: {
    fontSize: 18,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    marginBottom: 12,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});

export default ServiceRequestsScreen;
