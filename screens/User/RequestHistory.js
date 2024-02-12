import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert,Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Location from 'expo-location';
import TopBar from '../../components/TopBar';
import AppContext from '../../Provider/AppContext';
import { moderateScale } from 'react-native-size-matters';
import { getTokenFromStorage, getUserFromStorage } from '../../authUtils/authUtils';
import axios from 'axios';
import axiosconfig from '../../axios/axios'
import LoadingScreen from '../Main/LoadingScreen';



const RequestHistory = ({navigation})=>{
    const myContext = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [requests, setRequests] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
    
            const token = await getTokenFromStorage();
            const user = await getUserFromStorage();
            const response = await axiosconfig.get(`/allRequests/${user._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(response?.data?.data, "res");
            const filteredRequests = response?.data?.data.filter(
              (request) => request.currentStatus !== "pending" || request.currentStatus !== "inprogress"
            );
            console.log(filteredRequests);
            setRequests(filteredRequests)
            // if (filteredRequests.length !== 0) {
            //   const res = await axiosconfig.get(`/getRequest/${filteredRequests[0]._id}`, {
            //     headers: {
            //       Authorization: `Bearer ${token}`,
            //     },
            //   });
             
            // }
            // else{
            //   setMechanic(null)
            //   setRequest(null)
            // }
           
    
    
          } catch (error) {
            if (axios.isAxiosError(error)) {
              Alert.alert(error.response?.data?.message || "An Error Occured")
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [myContext.requestRefresh]);
  return(
    <>
      {loading ? <LoadingScreen /> :
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <TopBar navigation={navigation} />
            <TouchableOpacity onPress={()=> navigation.navigate('LocationType')} style={styles.location}>
              <Icon name='map-marker' size={20} color='#1697c7' />
              <Text style={{ marginLeft: 10, fontSize: 15 }}>{myContext.address}</Text>
            </TouchableOpacity>
          

            <Text style={{
              marginLeft: 30,
              marginTop: 10,
              fontSize: 25,
              color: '#1697c7', fontWeight: 'bold'
            }}>Request History</Text>


            {/* Mechanic list */}
            <FlatList

              data={requests}
              keyExtractor={(item, ind) => ind.toString()}
              renderItem={({ item }) => (
                <>
                  <View style={styles.card}>
                    {/* <Text style={styles.mechanicName}>name</Text> */}
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
                        <Text style={styles.infoValue}>kuch bhi</Text>
                      </View>
                    </View>
                    <Text style={styles.button} onPress={() => {
                      setSelectedMechanic(item)
                      refRBSheet.current.open()}} >Request Service</Text>
                  </View>


                </>

              )}
            />

          </View>

        

        </SafeAreaView>


      }
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: moderateScale(20)
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
  

export default RequestHistory