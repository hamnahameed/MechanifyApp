import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image ,Modal} from 'react-native';
import BottomSheetExample from './BottomSheetExample';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Import your modal component here if you have one
const MechanicHomeScreen = ({ navigation }) => {
  
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Automatically open the modal when the screen loads
    setModalVisible(true);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
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

<View style={{backgroundColor:'white',height:'45%', marginTop:50}}>
<Image source={
                        require('../../assets/heroImg2.png')} style={
                        {
                            width: 300,
                            height: 300, 
                            top:70,
                            left:60,
                          
                        }
                    }/>

</View>
<BottomSheetExample/>

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
  
  
});

export default MechanicHomeScreen;
