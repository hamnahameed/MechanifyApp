    import React, { useState } from 'react';
    import { View, Text, FlatList, TouchableOpacity, StyleSheet,ScrollView,Image } from 'react-native';
    import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
    import {useNavigation} from '@react-navigation/native'
    import StarRating from 'react-native-star-rating';



    const FindMechanicScreen = () => {
      const navigation = useNavigation();
      // Dummy service request data
      const dummyRequests = [
        {
          id: 1,
          name: 'John Smith',
          distanceTime: '5 mins',
          charges: '200 PKR',
          rating: 4,
        },
        {
          id: 2,
          name: 'Jane Doe',
          distanceTime: '10 mins',
          charges: '300 PKR',
          rating: 4,
        },
        // Add more dummy mechanic data
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
        
        navigation.navigate('MechanicAcceptedScreen');
      
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
      
      // back functionality
    
      const handleBack = () => {
        navigation.navigate('UserHomeScreen');
        
      };



      return (
        <View style={styles.container}>
                
                <View style={
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        top: 30
                    }
                }>
                  <TouchableOpacity onPress={handleBack} >
          <Icon name="arrow-left" size={20} color="#1697C7" top={20}/>
        </TouchableOpacity>

            {/* logo */}
            <Image style={
                            {
                                width: 200,
                                height: 150,
                                position: 'absolute',
                                left: 230,
                                top: -35

                            }
                        }
                        source={
                            require('../../assets/logo2.png')
                        }/>
                      
                    
    </View>
        <View style={styles.horizontalLine} ></View>
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ScrollView>
              <View style={styles.requestContainer}>
              <Text style={styles.mechanicName}>{item.name}</Text>
        <View style={styles.mechanicRow}>
          <View style={styles.mechanicRatings}>
              <StarRating
                disabled={true} // Set to true to display as read-only
                maxStars={5} // Number of stars
                rating={item.rating} // Rating value from your data
                starSize={20} // Size of the stars
                fullStarColor="gold" // Color of filled stars
                emptyStarColor="gray" // Color of empty stars
              />
          </View>
            <View style={{display:'flex', flexDirection:'column'}}>
              <Text style={{fontSize:16}}>Visiting Charges</Text>
              <Text style={styles.mechanicCharges}>{item.charges}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'column'}}>
              <Text style={{fontSize:16,textAlign:'center'}}>Arrival Time</Text>
              <Text style={styles.mechanicDistanceTime}>{item.distanceTime}</Text>
            </View>
          </View>
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
    horizontalLine: {
      borderBottomColor: '#1697c7', 
      borderBottomWidth: 5,  
      marginTop:80,
      width:'105%',
      marginLeft:'-2%'
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
      mechanicRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:20,
        marginLeft:'-50%'
      },
      mechanicRatings: {
        textAlign:'center'
      },
      mechanicRating: {
        fontSize: 20,
        textAlign:'center',
        color:'#1967c7',
        fontWeight:'bold'
      },
      mechanicDistanceTime: {
        fontSize: 20,
        textAlign:'center',
        color:'#1967c7',
        fontWeight:'bold'
      },
      mechanicName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'
      },
      mechanicCharges: {
        fontSize: 20,
        textAlign:'center',
        color:'#1967c7',
        fontWeight:'bold'
      },
      mechanicRating: {
        fontSize: 16,
      },
      status: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        
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

    export default FindMechanicScreen;
