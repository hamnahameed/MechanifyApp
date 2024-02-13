import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Alert, Dimensions,ActivityIndicator } from 'react-native';
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
import Modal from "react-native-modal";



const ServiceRequests = ({ navigation }) => {
  const myContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [isloading, setloading] = useState(false)
  const [requestId, setRequestId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = await getTokenFromStorage();
        const user = await getUserFromStorage();
        const response = await axiosconfig.get(`/allRequestsOfMechanics/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response?.data?.data, "res");
        const filteredRequests = response?.data?.data.filter(
          (request) => request.currentStatus === "pending" || request.currentStatus === "inprogress"
        );
        console.log(filteredRequests, "filtered");
        setRequests(filteredRequests)
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
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    // Format date as dd-mm-yyyy
    const formattedDate = dateTime.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Format time as 12-hour clock with AM/PM
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  
 
  const handleCancel = async () => {
    try {

      setloading(true);
      const obj = {
        currentStatus: 'cancelledbyuser'
      }
      console.log(obj, "obj to send");

      const token = await getTokenFromStorage();
      const response = await axiosconfig.put(`/updateRequest/${requestId}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert(response?.data?.message)
      myContext.setRequestRefresh(!myContext.requestRefresh)
      setModalVisible(!isModalVisible)
      navigation.navigate('UserHomeScreen');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data?.message || "An Error Occured")
        console.log(error);
      }
    } finally {
      setloading(false);
    }
  }
  
  return (
    <>
      {loading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator color={"#1697c7"} size={'large'}/>
                </View> :
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <TopBar navigation={navigation} />
           <Text style={{
              marginLeft: 30,
              marginTop: 10,
              fontSize: 25,
              color: '#1697c7', fontWeight: 'bold'
            }}>Active Requests</Text>


            {requests.length == 0 ? <View style={{alignItems:'center',flex:1,justifyContent:'center'}}><Text>No Data Avalaible</Text></View>:
             <FlatList
             data={requests}
             keyExtractor={(item, ind) => ind.toString()}
             renderItem={({ item }) => (
              <View style={{
                borderRadius: 10,
                margin: moderateScale(10),
                padding: moderateScale(10),
                backgroundColor: '#FFF'
              }}>
                <View>
                  <Text style={styles.dateTime}>Date & Time: {formatDateTime(item.createdAt).date}  {formatDateTime(item.createdAt).time}</Text>
                </View>
                {Array.isArray(item.services) && item.services.length > 0 &&
                  <View ><Text style={styles.dateTime}>Services: {item.services.map(obj => obj['item']).join(', ')}</Text></View>}
                 <View>
                  <Text style={styles.dateTime}>Status: <Text style={{color: item.currentStatus == "pending"? "red":"green"}}>{item.currentStatus}</Text></Text>
                </View>
                <View>
                  <Text style={styles.dateTime}>Description <Text>{item.description}</Text></Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: moderateScale(5), justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("AcceptedRequestScreen", { id: item._id })}
                    style={{
                      backgroundColor: '#1697c7',
                      padding: moderateScale(10),
                      marginHorizontal: moderateScale(30),
                      borderRadius: 10,
                      justifyContent: 'center',
                      marginTop: moderateScale(10),
                      flexDirection: 'row',
                    }}>
                    <Text style={{ color: "#FFF", textAlign: 'center', fontSize: 15 }}>{"View Request"}</Text>
                  </TouchableOpacity>
                 
                </View>
              </View>


             )}
           />
            }
           

          </View>

          <Modal isVisible={isModalVisible}
              onRequestClose={() => {
                setModalVisible(!isModalVisible);
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                  backgroundColor: 'white',
                  padding: moderateScale(20),
                  overflow: 'hidden',
                  borderRadius: 5
                }}
              >
                <Text>Are you sure you want to cancel the request? It can't be undone.</Text>
                <View style={{ flexDirection: 'row', marginTop: moderateScale(10) }}>
                  <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} style={{
                    flex: 1,
                    backgroundColor: '#1697c7',
                    padding: moderateScale(5),
                    borderRadius: 5,
                    marginHorizontal: moderateScale(5)
                  }}>
                    <Text style={{ textAlign: 'center', color: '#FFF' }}>cancel</Text>
                  </TouchableOpacity>
                  {isloading? <ActivityIndicator color='#1697c7'/>:
                   <TouchableOpacity
                    onPress={handleCancel}
                    style={{ flex: 1, backgroundColor: '#1697c7', padding: moderateScale(5), borderRadius: 5, marginHorizontal: moderateScale(5) }}>
                   <Text style={{ textAlign: 'center', color: '#FFF' }}>yes</Text>
                   </TouchableOpacity>
                  }
                 
                </View>
              </View>
            </Modal>

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
  dateTime: {
    fontSize: 15,
    color: '#000'
  },
  dateTimeView: {
    flex: 2,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4)
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


export default ServiceRequests