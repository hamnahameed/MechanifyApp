import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LogoutModal from '../screens/Main/LogoutModal';
import { getTokenFromStorage, getUserFromStorage } from '../authUtils/authUtils';
import { moderateScale } from 'react-native-size-matters';
import axios from 'axios';
import axiosconfig from '../axios/axios'
import AppContext from '../Provider/AppContext';
import Geocoder from 'react-native-geocoding';


const MechanicDrawerContent = ({ navigation }) => {
  const myContext = useContext(AppContext)
  const [isloading, setloading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  const [user, setUser] = useState({})
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const newAddress = response.results[0].formatted_address;
      myContext.setAddress(newAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  useEffect(()=>{
     if(isEnabled){
      handleSubmit()
     }
     else{
      handleUnSubmit()
     }
  },[isEnabled])
  const handleSubmit = async () => {
    try {
      setloading(true);
      const user = await getUserFromStorage();
      getAddressFromCoordinates(myContext.latitude,myContext.longitude)
      const obj = {
        latitude: myContext.latitude,
        longitude: myContext.longitude,
        address:myContext.address,
        username:user.username,
      }
      console.log(obj, "obj to send");

      const token = await getTokenFromStorage();
      const response = await axiosconfig.put('/auth/updateuser', obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Alert.alert(response?.data?.message)
      myContext.setUserRefresh(!myContext.userRefresh)
     } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data?.message || "An Error Occured")
        console.log(error);
      }
    } finally {
      setloading(false);
    }
  };
  const handleUnSubmit = async () => {
    try {
      setloading(true);
      const user = await getUserFromStorage();
      const obj = {
        latitude: null,
        longitude: null,
        address:null,
        username:user.username,
      }
      console.log(obj, "obj to send");
     
      const token = await getTokenFromStorage();
      const response = await axiosconfig.put('/auth/updateuser', obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Alert.alert(response?.data?.message)
      myContext.setUserRefresh(!myContext.userRefresh)
     } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(error.response?.data?.message || "An Error Occured")
        console.log(error,'errr');
      }
    } finally {
      setloading(false);
    }
  };



  React.useEffect(() => {
    const fetchToken = async () => {
      const getUser = await getUserFromStorage();
      setUser(getUser)

    };

    fetchToken();
  }, []);
  
  return (

    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: -50, paddingHorizontal: 10, marginTop: 10 }}>
        {/* Close Drawer Button */}
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Icon name="times" size={30} color={'#1697C7'} style={styles.closeButton} />
        </TouchableOpacity>
        {/* Logo */}
        <Image style={{ width: 200, height: 200, marginHorizontal: 30, }} source={require('../assets/logo2.png')} />
      </View>


      {/* User Icon and Name */}
      <View style={styles.userContainer}>
        <View style={styles.userIconContainer}>
          <Icon name="user" size={40} color="black" onPress={() => navigation.navigate('MechanicAccountScreen')} />
        </View>
        <Text style={styles.userName}>{user.username}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginHorizontal: moderateScale(10) }}>
        <View style={{ justifyContent: 'center' }}>
          <Text>{isEnabled ? "You are Online" : "You are Offline"}</Text>
        </View>
        <View style={{}}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

      </View>

      {/* Drawer Items */}
      <ScrollView>
        <View style={{ marginVertical: 30, marginHorizontal: 5 }}>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
            onPress={() => navigation.navigate('MechanicAccountScreen')}>
            <Icon name="user" size={20} color={'#1697C7'} />
            <Text style={{ marginLeft: 20 }}>My profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
            onPress={() => { navigation.navigate('ServiceRequestsScreen'); }}>
            <Icon name="wrench" size={20} color={'#1697C7'} />
            <Text style={{ marginLeft: 20 }}>Service request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
            onPress={() => { navigation.navigate('SettingScreen'); }}>
            <MaterialIcon name="settings" size={20} color={'#1697C7'} />
            <Text style={{ marginLeft: 20 }}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
            onPress={() => navigation.navigate('MechanicServiceHistory')}>
            <FeatherIcon name="clock" size={20} color={'#1697C7'} />
            <Text style={{ marginLeft: 20 }}>Service History</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="clipboard" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Inventory</Text>
      </TouchableOpacity> */}
          {/* <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="star" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Reviews & Ratings</Text>
      </TouchableOpacity> */}
          {/* <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="comment" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Chat</Text>
      </TouchableOpacity> */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
            onPress={() => navigation.navigate('')}>
            <Icon name="money" size={20} color={'#1697C7'} />
            <Text style={{ marginLeft: 20 }}>Transactions</Text>
          </TouchableOpacity>

          <View
            style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginVertical: 30, marginLeft: 20, width: 200 }} />
          <LogoutModal />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    marginLeft: 10,
    marginBottom: 15,
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  },
  userIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1697C7', // Set your preferred color
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  userName: {
    marginLeft: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  drawerItemText: {
    marginLeft: 10,
    fontSize: 18,
  },

});
export default MechanicDrawerContent;
