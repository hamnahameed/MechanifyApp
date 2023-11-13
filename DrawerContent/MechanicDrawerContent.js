import React,{useState} from 'react';
import { View, Text, TouchableOpacity,Image,StyleSheet,ScrollView,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LogoutModal from '../screens/Main/LogoutModal';


const MechanicDrawerContent = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  
  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can clear user data, reset authentication, etc.
    // Then, close the modal and navigate to the login screen
    setModalVisible(false);
    // Implement your navigation logic here
  };
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
          <Icon name="user" size={40} color="black" onPress={()=>navigation.navigate('MechanicAccountScreen')}/>
        </View>
        <Text style={styles.userName}>John Doe</Text>
      </View>

      {/* Drawer Items */}
      <ScrollView>
      <View style={{marginVertical:30,marginHorizontal:5}}>
      
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('MechanicAccountScreen')}>
        <Icon name="user" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 20 }}>My profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => {navigation.navigate('ServiceRequestsScreen');}}>
        <Icon name="wrench" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 20 }}>Service request</Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => {navigation.navigate('SettingScreen'); }}>
        <MaterialIcon name="settings" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 20 }}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <FeatherIcon name="clock" size={20} color={'#1697C7'}/>
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
        <Icon name="money" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 20 }}>Transactions</Text>
      </TouchableOpacity>

      <View
  style={{borderBottomColor: 'black',borderBottomWidth: 1,marginVertical: 30,marginLeft:20,width:200}}/>
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
export default MechanicDrawerContent;
