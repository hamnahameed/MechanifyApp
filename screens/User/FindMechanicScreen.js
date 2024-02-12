import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Location from 'expo-location';
import TopBar from '../../components/TopBar';
import AppContext from '../../Provider/AppContext';
import { moderateScale } from 'react-native-size-matters';
import { getTokenFromStorage } from '../../authUtils/authUtils';
import axios from 'axios';
import axiosconfig from '../../axios/axios'
import LoadingScreen from '../Main/LoadingScreen';

const FindMechanicScreen = ({ navigation }) => {
  const myContext = useContext(AppContext)
  // current Location
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
// fetchMechanics(); // Fetch mechanic data
  }, []);
  
  const [mechanics, setMechanics] = useState([
    { id: 1, name: 'Mechanic 1', latitude: 37.78825, longitude: -122.4324, time: 30, chargs: 100 },
    { id: 2, name: 'Mechanic 2', latitude: 37.7749, longitude: -122.4194, time: 30, chargs: 100 },
    { id: 3, name: 'Mechanic 3', latitude: 37.7749, longitude: -122.4194, time: 30, chargs: 100 },
    { id: 4, name: 'Mechanic 4', latitude: 37.7749, longitude: -122.4194, time: 30, chargs: 100 },
    // Add more mechanic data as needed
  ]);

  // back functionality
  const handleBack = () => { navigation.navigate('UserHomeScreen') };
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
  const handleLocationInputPress = () => {
    // Navigate to the 'LocationType' screen when the TextInput is pressed
    navigation.navigate('LocationType');
  };
  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);

            const obj={
              coordinates:{
                latitude:myContext.latitude,
                longitude:myContext.longitude
            }
            }
            const token = await getTokenFromStorage();
            const response = await axiosconfig.post('/auth/getMechanics',obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response?.data, "res");
            setMechanics(response?.data)
           
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Alert.alert(error.response?.data?.message || "An Error Occured")
            }
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);

  return (
    <>
    {loading? <LoadingScreen/>:
     <SafeAreaView style={{ flex: 1 }}>
     <View style={styles.container}>
       <TopBar navigation={navigation} />
       <TouchableOpacity onPress={handleLocationInputPress} style={styles.location}>
         <Icon name='map-marker' size={20} color='#1697c7' />
         <Text style={{ marginLeft: 10, fontSize: 15 }}>{myContext.address}</Text>
       </TouchableOpacity>
       {/* {initialRegion && (
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
        </View> */}

       <Text style={{ marginLeft: 30, 
         marginTop: 10, 
         fontSize: 25, 
         color: '#1697c7', fontWeight: 'bold' }}>All Mechanic</Text>


       {/* Mechanic list */}
       <FlatList

         data={mechanics}
         keyExtractor={(item,ind) => ind.toString()}
         renderItem={({ item }) => (
           <View style={styles.card}>
             <Text style={styles.mechanicName}>{item.username}</Text>
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
             <Text style={styles.button} onPress={() => navigation.navigate('MechanicAcceptedScreen')} >Request Service</Text>
           </View>
         )}
       />

     </View>
   </SafeAreaView>

    
    }
    </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:moderateScale(20)
  },
  location: {
    backgroundColor: 'whitesmoke',
    // borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    padding: moderateScale(10),
    marginTop: moderateScale(10)
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
    marginRight: 'auto',
    textAlign: 'center',
    width: 200,
    borderRadius: 10,
    fontSize: 15,
    color: '#fff',
    marginTop: 20

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
