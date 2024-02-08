    // import React, { useState } from 'react';
    // import { View, Text, FlatList, TouchableOpacity, StyleSheet,ScrollView,Image } from 'react-native';
    // import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
    // import {useNavigation} from '@react-navigation/native'
    // import StarRating from 'react-native-star-rating';



    // const FindMechanicScreen = () => {
    //   const navigation = useNavigation();
    //   // Dummy service request data
    //   const dummyRequests = [
    //     {
    //       id: 1,
    //       name: 'John Smith',
    //       distanceTime: '5 mins',
    //       charges: '200 PKR',
    //       rating: 4,
    //     },
    //     {
    //       id: 2,
    //       name: 'Jane Doe',
    //       distanceTime: '10 mins',
    //       charges: '300 PKR',
    //       rating: 4,
    //     },
    //     // Add more dummy mechanic data
    //   ];

    //   const [requests, setRequests] = useState(dummyRequests);

    //   const handleAccept = (requestId) => {
    //     // Implement logic to accept the request (in-memory update for this example).
    //     const updatedRequests = requests.map((request) => {
    //       if (request.id === requestId) {
    //         return { ...request, status: 'Accepted' };
    //       }
    //       return request;
    //     });
    //     setRequests(updatedRequests);
        
    //     navigation.navigate('MechanicAcceptedScreen');
      
    //   };

    //   const handleDecline = (requestId) => {
    //     // Implement logic to decline the request (in-memory update for this example).
    //     const updatedRequests = requests.map((request) => {
    //       if (request.id === requestId) {
    //         return { ...request, status: 'Declined' };
    //       }
    //       return request;
    //     });
    //     setRequests(updatedRequests);
    //   };
      
    //   // back functionality
    
    //   const handleBack = () => {
    //     navigation.navigate('UserHomeScreen');
        
    //   };



    //   return (
    //     <View style={styles.container}>
                
    //             <View style={
    //                 {
    //                     flexDirection: 'row',
    //                     alignItems: 'center',
    //                     paddingHorizontal: 20,
    //                     top: 30
    //                 }
    //             }>
    //               <TouchableOpacity onPress={handleBack} >
    //       <Icon name="arrow-left" size={20} color="#1697C7" top={20}/>
    //     </TouchableOpacity>

    //         {/* logo */}
    //         <Image style={
    //                         {
    //                             width: 200,
    //                             height: 150,
    //                             position: 'absolute',
    //                             left: 230,
    //                             top: -35

    //                         }
    //                     }
    //                     source={
    //                         require('../../assets/logo2.png')
    //                     }/>
                      
                    
    // </View>
    //     <View style={styles.horizontalLine} ></View>
    //     <Text style={styles.heading}>Select Mechanic</Text>
    //       <FlatList
    //         data={requests}
    //         keyExtractor={(item) => item.id.toString()}
    //         renderItem={({ item }) => (
    //             <ScrollView>
    //           <View style={styles.requestContainer}>
    //           <Text style={styles.mechanicName}>{item.name}</Text>
    //     <View style={styles.mechanicRow}>
    //       <View style={styles.mechanicRatings}>
    //           <StarRating
    //             disabled={true} // Set to true to display as read-only
    //             maxStars={5} // Number of stars
    //             rating={item.rating} // Rating value from your data
    //             starSize={20} // Size of the stars
    //             fullStarColor="gold" // Color of filled stars
    //             emptyStarColor="gray" // Color of empty stars
    //           />
    //       </View>
    //         <View style={{display:'flex', flexDirection:'column'}}>
    //           <Text style={{fontSize:16}}>Visiting Charges</Text>
    //           <Text style={styles.mechanicCharges}>{item.charges}</Text>
    //         </View>
    //         <View style={{display:'flex', flexDirection:'column'}}>
    //           <Text style={{fontSize:16,textAlign:'center'}}>Arrival Time</Text>
    //           <Text style={styles.mechanicDistanceTime}>{item.distanceTime}</Text>
    //         </View>
    //       </View>
    //             {item.status ? (
    //               <Text style={styles.status}>Status: {item.status}</Text>
    //             ) : (
    //               <View style={styles.buttonContainer}>
    //                 <TouchableOpacity
    //                   style={[styles.button, { backgroundColor: '#4F7942' ,}]}
    //                   onPress={() => handleAccept(item.id)}
    //                 >
    //                   <Text style={styles.buttonText}>Accept</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity
    //                   style={[styles.button, { backgroundColor: '#C0C0C0' ,marginLeft:10}]}
    //                   onPress={() => handleDecline(item.id)}
    //                 >
    //                   <Text style={[styles.buttonText ,{color:'red'}] }>Decline</Text>
    //                 </TouchableOpacity>
    //               </View>
                
    //             )}
                
    //           </View>
            
    //           </ScrollView>
          
    //         )}
    //       />
          
    //     </View>
      
    //   );
    // };

    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     padding: 16,
    //     backgroundColor: '#fff',
    //   },
    //   background: {
    //     position: 'absolute',
    //     top: 100,
    //     left: 0,
    //     width: '120%',
    //     height: '15%',
    //     backgroundColor: '#1697C7', // Set your preferred color
    // },
    // logoContainer: {
    //   alignItems: 'right',
    //   marginVertical: 20
    // },
    // horizontalLine: {
    //   borderBottomColor: '#1697c7', 
    //   borderBottomWidth: 5,  
    //   marginTop:80,
    //   width:'105%',
    //   marginLeft:'-2%'
    // },
    //   heading: {
    //     fontSize: 30,
    //     fontWeight: 'bold',
    //     marginBottom: 16,
    //     marginTop: 70,
    //     letterSpacing:2,
    //     marginLeft:20
    //   },
    //   requestContainer: {
    //     backgroundColor: '#f5f5f5',
    //     padding: 16,
    //     marginBottom: 16,
    //     borderRadius: 8,
    //     marginTop: 60,
    //   },
    //   serviceType: {
    //     fontSize: 18,
    //     marginBottom: 8,
    //   },
    //   location: {
    //     fontSize: 16,
    //     marginBottom: 12,
    //   },
    //   mechanicRow: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     marginTop:20,
    //     marginLeft:'-50%'
    //   },
    //   mechanicRatings: {
    //     textAlign:'center'
    //   },
    //   mechanicRating: {
    //     fontSize: 20,
    //     textAlign:'center',
    //     color:'#1967c7',
    //     fontWeight:'bold'
    //   },
    //   mechanicDistanceTime: {
    //     fontSize: 20,
    //     textAlign:'center',
    //     color:'#1967c7',
    //     fontWeight:'bold'
    //   },
    //   mechanicName: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     textAlign:'center'
    //   },
    //   mechanicCharges: {
    //     fontSize: 20,
    //     textAlign:'center',
    //     color:'#1967c7',
    //     fontWeight:'bold'
    //   },
    //   mechanicRating: {
    //     fontSize: 16,
    //   },
    //   status: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     color: 'green',
    //   },
    //   buttonContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     marginTop: 20,
        
    //   },
    //   button: {
    //     flex: 1,
    //     padding: 8,
    //     borderRadius: 4,
    //     alignItems: 'center',
    //   },
    //   buttonText: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
        
    //   },
    // });

    // export default FindMechanicScreen;

    import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity ,Modal} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';




const FindMechanicScreen = () => {
 
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

     {/* Popup */}
     <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
          <View style={styles.modal}>
          <TouchableOpacity onPress={closeModal} style={{marginLeft:240}}>
              <Icon name='times' size={20} color='#c0c0c0'/>
          </TouchableOpacity>
           
            <Text style={styles.modaltext}>Mechanic name</Text>
            <Text style={styles.modaltext}>reviews:4.5</Text>
            <Text style={styles.modaltext}>Charges:300</Text>
            <Text style={styles.modaltext}>Time:10mins</Text>
            <Text style={styles.modalbutton} onPress={()=>navigation.navigate('MechanicAcceptedScreen')} >Request Service</Text>
          
          </View>
        </View>
      </Modal>

      
   <View style={{display:'flex',flexDirection:'row',position:'absolute',top:50,left:30}}>
         <TouchableOpacity onPress={handleBack} >
            <Icon name="arrow-left" size={25} color="#1697c7" />
         </TouchableOpacity>
         <Text style={{marginLeft:100,fontSize:20,color:'#1697c7',fontWeight:'bold'}}>Find Mechanic</Text>
      </View>
      <View style={styles.location}>
         <Icon name='map-marker' size={20} color='#1697c7'/>
         <Text style={{marginLeft:10}}>Your location</Text>
      </View>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
 },
 map:{
   flex:1
 },
 location:{
   backgroundColor:'whitesmoke',
   marginLeft:40,
   width:350,
   position:'absolute',
   top:100,
   paddingLeft:10,
   paddingVertical:20,
   borderWidth:1,
   borderRadius:10,
   display:'flex',
   flexDirection:'row'
   
 },
 modal:{
  backgroundColor: 'white', 
  padding: 20,
  borderRadius: 10,
  height :'40%',
  width:'70%'
 },
 modalbutton:{
  backgroundColor: '#1697c7',
  padding: 10,
  borderRadius: 10,
  marginTop:80,
  marginBottom:10,
  // marginLeft:5,
  // marginRight:10,
  width:'100%',
  height:50,
  justifyContent:'center',
  alignItems:'center',
  borderWidth:1,
  borderColor:'#1697c7',
  color:'white',
  fontSize:18,
  textAlign:'center'
 },
 modaltext:{
  padding:8,
  textAlign:'center',
  fontSize:15
 }
 });

export default FindMechanicScreen;