import React from 'react';
import { View, Text, ImageBackground,Image, TouchableOpacity, StyleSheet } from 'react-native';


// Home screen //
const HomeScreen = ({ navigation }) => {
    const handleRegister = () => {
      navigation.navigate('Signup'); // Navigate to Register page
    };
  
    // login 
    const handleLogin = () => {
      navigation.navigate('Login'); // Navigate to Login page
    };
  
    return (
      // background
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/Background.jpeg')} style={styles.backgroundImage}>
          <View >
          <Image source={require("../../assets/logo2.png")}
            style={styles.logo}
          />
          <Text style={styles.slogan}>Everything you need is in one place</Text>
          </View>
  
  {/* button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };

  // styling
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  logo:{
    width:500,
    height:250,
    left:30
  },
    buttonContainer: {
      alignItems: 'center',
    },
    button1: {
      width:200,
      backgroundColor: 'white',
      paddingVertical: 8,
      paddingHorizontal: 30,
      paddingLeft:60,
      borderRadius: 5,
      marginVertical: 10,
      marginTop:150
    },
    button2: {
        width:200,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 30,
        paddingLeft:70,
        borderRadius: 5,
        marginVertical: 10,
        marginTop:25
        
      },
    buttonText: {
      color: '#06AAED',
      fontSize: 18,
      fontWeight: 'bold',
    },
    slogan:{
        fontSize:20,
        fontWeight:"bold",
        color:"white",
        position:"absolute",
        top:300,
        left:120,
        width:250  ,
        textAlign:"center"    
    }
  });
  
  export default HomeScreen;