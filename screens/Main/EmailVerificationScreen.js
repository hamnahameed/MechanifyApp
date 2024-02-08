//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,Image,TextInput,TouchableOpacity } from 'react-native';

// create a component
const EmailVerificationScreen = ({navigation,route}) => {

    const handleLogin=()=>{

    }

    // const {userdata}=route.params;
    // console.log(userdata[0]?.verificationCode);
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>

            {/* logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Image source={require('../../assets/logo2.png')}style={styles.logoImage }/>
                    </View>
                </View>
            

{/*  form */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Email Verification</Text>
                    <View style={styles.inputContainer }>
                    
                        <TextInput style={styles.input}
                            placeholder="Enter code"
                            placeholderTextColor="black"
                            keyboardType="numeric"
                            maxLength={6}
                            
                            />
                    </View>
                    
                    
                    <TouchableOpacity style={styles.verifyButton} onPress={handleLogin}>
                        <Text style={styles.verifyButtonText}>Verify</Text>
                    </TouchableOpacity>
                        <Text style={{textAlign: "center",fontSize: 15,fontWeight: "bold"}}>Resend Code?</Text>
                 
                </View>

            </ImageBackground>
        </View>
    );
};


// styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:80
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
        marginTop:-160
    },
    logo: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: "#1697C7",
        borderRadius: 80,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 350,
        height: 300,
        left: 20,
        top: 20,
        resizeMode: 'contain'
    },
    formContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        marginTop:70
       
    },
    title:{
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "serif",
        textAlign:'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#bfc1c2',
        borderRadius: 15,
        marginBottom: 5,
        marginTop: 40,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        color: "black"
    },
    verifyButton: {
        backgroundColor: '#1697C7',
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10
    },
    verifyButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default EmailVerificationScreen;
