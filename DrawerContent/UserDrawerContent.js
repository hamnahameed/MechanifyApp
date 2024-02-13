import React, {useState} from 'react';
import { View, Text, TouchableOpacity,Image,StyleSheet,ScrollView,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import FeatherIcon from 'react-native-vector-icons/Feather';
import LogoutModal from '../screens/Main/LogoutModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getUserFromStorage } from '../authUtils/authUtils';



const UserDrawerContent = ({ navigation}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({})
  React.useEffect(() => {
    const fetchToken = async () => {
      const getUser = await getUserFromStorage();
      setUser(getUser)

    };

    fetchToken();
  }, []);
  return (
    
    <View style={{ flex: 1 }}>
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginBottom:-50, paddingHorizontal: 10, marginTop: 10 }}>
    {/* Close Drawer Button */}
    <TouchableOpacity onPress={() => navigation.closeDrawer()}>
      <Icon name="times" size={30} color={'#1697C7'} style={styles.closeButton}/>
    </TouchableOpacity>
    {/* Logo */}
    <Image style={{ width: 200, height: 200 ,marginHorizontal:30,}} source={require('../assets/logo2.png')} />
  </View>


       {/* User Icon and Name */}
       <View style={styles.userContainer}>
        <View style={styles.userIconContainer}>
          <Icon name="user" size={40} color="black" />
        </View>
        <Text style={styles.userName}>{user.username}</Text>
      </View>

      {/* Drawer Items */}
      <ScrollView>
      <View style={{marginTop:50,marginLeft:10}}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('UserAccountScreen')}>
        <Icon name="user" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Account</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('MechanicMngt')}>
        <Icon name="wrench" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Appointment Management</Text>
      </TouchableOpacity> */}
    
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('LocationType')}>
        <Icon name="map-marker" size={23} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Location Management</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('FindMechanicScreen')}>
        <MaterialCommunityIcons name="tools" size={23} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Find mechanic</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('ActiveRequests')}>
        <MaterialCommunityIcons name="list-status" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Active Requests</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('RequestHistory')}>
        <FeatherIcon name="clock" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Request History</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="star" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Reviews & Ratings</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('SettingScreen')}>
        <Icon name="cog" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Settings</Text>
      </TouchableOpacity>
      <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 50,
    marginLeft:20,
    width:200,
  }}
/>
<LogoutModal/>
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
    paddingBottom:5
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
export default UserDrawerContent;
