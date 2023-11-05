import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LogoutModal = () => {
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
    <View>
      {/* Logout Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Logout</Text>
      </TouchableOpacity>

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Content */}
          <Text style={styles.modalText}>Are you sure you want to logout?</Text>
          {/* Logout Icon */}
          <Icon name="sign-out" size={40} color="red" />

          {/* Yes and No Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LogoutModal;
