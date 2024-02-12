import React, { useState,useContext } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../Provider/AppContext';




const LogoutModal = () => {
  const myContext = useContext(AppContext)
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  // Function to handle logout
  const handleLogout = async () => {
    console.log("logout");
    
    await AsyncStorage.removeItem('token');
    setModalVisible(false);
    myContext.setAuthRefresh(!myContext.auth)
  };

  return (
    <View>
      {/* Logout button */}
      
<TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
        onPress={() => {setModalVisible(true); 
          navigation.dispatch(DrawerActions.closeDrawer());  }}>
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
              
            >
              <Text style={styles.buttonText}  onPress={handleLogout}>Yes</Text>
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
  );
};

const styles = StyleSheet.create({
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
    marginLeft:20
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

export default LogoutModal;
