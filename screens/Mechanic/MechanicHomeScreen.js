import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image ,Modal,TextInput} from 'react-native';
import BottomSheetExample from './BottomSheetExample';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements/dist/buttons/Button';

// Import your modal component here if you have one
const MechanicHomeScreen = ({ navigation }) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log('Submitted:', inputText);

    // After submission, close the modal
    closeModal();
  };

  // useEffect hook to open the modal when the component mounts
  useEffect(() => {
    setModalVisible(true);
  }, []);
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>

     {/* Popup Modal */}
     <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Enter Your Address First</Text>
            <TextInput
              style={styles.input}
              placeholder="Type Address"
              onChangeText={(text) => setInputText(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
              <Icon name='plus' size={15} style={{marginLeft:110}}/>
              <Text style={styles.buttonText} onPress={()=>navigation.navigate('MapViewScreen')}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* Top Bar */}
      <View style={styles.topBar}>
      <TouchableOpacity onPress={openDrawer}>
      <Icon name="bars"
                        size={30}
                        color="#1697C7" top={5}/>
      </TouchableOpacity>
          {/* logo */}
      <Image style={
                        {
                            width: 200,
                            height: 150,
                            position:'absolute',
                            left:250,
                            top:-35
                           
                        }
                    }
                    source={
                        require('../../assets/logo2.png')
                    }/>
      </View>

      {/* Background with Tag Line */}
      <View style={styles.background}>
        <Text style={styles.tagline}>At your Service</Text>
        <Text style={styles.tagline}>24 / 7</Text>
      </View>

<View style={{marginTop:40,backgroundColor:'whitesmoke'}}>
<TouchableOpacity style={styles.location} onPress={() => setModalVisible(true)}>
         <Icon name='map-marker' size={20} color='#1697c7'/>
         <Text style={{marginLeft:10}}>Your location</Text>
  </TouchableOpacity>
<Image source={
                        require('../../assets/heroImg2.png')} style={
                        {
                            width: 300,
                            height: 300, 
                            top:70,
                            left:60,
                          
                        }
                    }/>
                    <Text style={styles.button} onPress={() => {navigation.navigate('ServiceRequestsScreen');}}>View All Requests</Text>

</View>
{/* <BottomSheetExample/> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 10,
    top:30
  },
  icon: {
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  background: {
    height: '15%',
    top:50,
    backgroundColor: '#1697C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    color: '#fff',
    fontSize: 35,
    textAlign:'center',
    padding:10,
    fontFamily:'serif',
    fontWeight:'bold'
  },
  location:{
    backgroundColor:'whitesmoke',
    marginLeft:40,
    width:350,
    position:'absolute',
    top:5,
    paddingLeft:10,
    paddingVertical:10,
    borderWidth:1,
    borderRadius:10,
    display:'flex',
    flexDirection:'row'
    
  },
  button: {
        backgroundColor: '#1697c7',
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: '60%',
        marginLeft:65,
        textAlign:'center',
        width:300,
        borderRadius: 10,
        fontSize: 18,
        color: '#fff',
      },

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // marginTop:600
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        width: '100%',
        height:'40%',
        marginTop:500
      },
      modalText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign:'center'
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 8,
      },
      modalButton: {
        backgroundColor: '#1697c7',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        display:'flex',
        flexDirection:'row',
        marginTop:160
        
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft:10,
        textAlign:'center'
      },
  
});

export default MechanicHomeScreen;
