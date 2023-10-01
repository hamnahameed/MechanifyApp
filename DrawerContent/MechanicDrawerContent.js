import React,{useState} from 'react';
import { View, Text, TouchableOpacity,Image,StyleSheet,ScrollView,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed


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
          <Icon name="user" size={40} color="black" />
        </View>
        <Text style={styles.userName}>John Doe</Text>
      </View>

      {/* Drawer Items */}
      <ScrollView>
      <View>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('MechanicAccountScreen')}>
        <Icon name="user" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="envelope" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Service request</Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="map-marker" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Location Management</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="clipboard" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Service History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="warehouse" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Inventory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="star" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Reviews & Ratings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="comment" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => navigation.navigate('')}>
        <Icon name="money" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Transactions</Text>
      </TouchableOpacity>

      <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 30,
    marginLeft:20,
    width:200
  }}
/>
{/* Logout button */}
<TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => {
    setModalVisible(true);
    navigation.closeDrawer(); 
  }}>
        <Icon name="sign-out" size={20} color={'#1697C7'}/>
        <Text style={{ marginLeft: 10 }}>Log out</Text>
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >

<View style={styles.centeredView}>
        <View style={styles.modalView}>
        {/* Logout Icon */}
        <Icon name="sign-out" size={60} color="#1697c7" />
          {/* Content */}
          <Text style={styles.modalText}>Are you sure you want to logout?</Text>
          

          {/* Yes and No Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}  onPress={() => {
    navigation.navigate("Login");
    setModalVisible(false);
    ; 
  }}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText2}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>
      
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#1697c7',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  button2: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth:1,
    borderColor:'#1697c7',
    width: 100,
    alignItems: 'center',
  },
  buttonText2: {
    color: '#1697c7',
    fontSize: 16,
  },
});
export default MechanicDrawerContent;
