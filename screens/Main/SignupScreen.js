import React, { useState } from 'react';
import {
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons'; // You can use any icon library you prefer


const SignupScreen = ({ navigation }) => {
    const handleSignUp = () => {
        navigation.navigate('Login'); // Navigate to SignUp screen
    };

    const [selectedRole, setSelectedRole] = useState('user'); // Default role is 'user'

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    
  };

  const handleSubmit = () => {
    // Here, you can use the `selectedRole` state to determine which role the user selected.
    // You can send this value to your backend for user registration.

    console.log('Selected Role:', selectedRole);
    // Perform the signup logic based on the selected role.
  };
    return (

        // background
        <View style={
            styles.container
        }>
            <ImageBackground source={
                require('../../assets/bg.jpeg')
            }
                style={
                    styles.backgroundImage
                }>
                <View style={
                    styles.logoContainer
                }>

                    {/* logo */}
                    <View style={
                        styles.logo
                    }>
                        <Image source={
                            require('../../assets/logo2.png')
                        }
                            style={
                                styles.logoImage
                            } />
                    </View>
                </View>

                {/* signup form  */}
                <View style={
                    styles.formContainer
                }>

                    <Text style={
                        styles.placeholder
                    }>Username</Text>
                    <View style={
                        styles.inputContainer
                    }>
                        <Image source={
                            require('../../assets/userIcon.png')
                        }
                            style={
                                styles.inputIcon
                            } />

                        <TextInput style={
                            styles.input
                        }
                            placeholder="username"
                            placeholderTextColor="black"
                            onChangeText={
                                (text) => setUsername(text)
                            } />
                    </View>


                    <Text style={
                        styles.placeholder
                    }>Email Address</Text>
                    <View style={
                        styles.inputContainer
                    }>
                        <Image source={
                            require('../../assets/email.png')
                        }
                            style={
                                styles.inputIcon
                            } />
                        <TextInput style={
                            styles.input
                        }
                            placeholder="email"
                            placeholderTextColor="black"
                            onChangeText={
                                (text) => setEmail(text)
                            } />
                    </View>

                    <Text style={
                        styles.placeholder
                    }>Password</Text>
                    <View style={
                        styles.inputContainer
                    }>
                        <Image source={
                            require('../../assets/passIcon.png')
                        }
                            style={
                                styles.inputIcon
                            } />
                        <TextInput style={
                            styles.input
                        }
                            placeholder="password"
                            placeholderTextColor="black"
                            secureTextEntry
                            onChangeText={
                                (text) => setPassword(text)
                            } />
                    </View>
                    <Text style={
                        styles.placeholder
                    }>Re-Enter Password</Text>
                    <View style={
                        styles.inputContainer
                    }>
                        <Image source={
                            require('../../assets/passIcon.png')
                        }
                            style={
                                styles.inputIcon
                            } />
                        <TextInput style={
                            styles.input
                        }
                            placeholder="confirm password"
                            placeholderTextColor="black"
                            secureTextEntry
                            onChangeText={
                                (text) => setPassword(text)
                            } />

                    </View>
 <Text
 style={
                        styles.placeholder
                    }>Login As</Text>

                    <View style={[styles.inputContainer,{height:50}] }>
      <Picker style={
                            styles.input
                           
                        }
                        selectedValue={selectedRole}
        onValueChange={(itemValue, itemIndex) => handleRoleChange(itemValue)}
      

      >
      
     
        <Picker.Item label="User" value="user"  />
        <Picker.Item label="Mechanic" value="mechanic" />
        <Picker.Item label="Shop Owner" value="shopOwner" />
      </Picker>
      </View>



      
                    <TouchableOpacity style={
                        styles.loginButton
                    }
                        onPress={handleSignUp}>
                        <Text style={
                            styles.loginButtonText
                        }>Sign up</Text>
                    </TouchableOpacity>

                    <Text style={
                        {
                            textAlign: "center",
                            fontSize: 15,
                            fontWeight: "bold"
                        }
                    }>Already have an account?
                    </Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={
                            {
                                textAlign: "center",
                                color: "#1697C7",
                                fontSize: 15,
                            }
                        }>Sign In</Text>
                    </TouchableOpacity>

                 
                </View>
            </ImageBackground>
        </View>
    );
};

// styling
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logo: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: "#1697C7",
        borderRadius: 70,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 350,
        height: 300,
        left: 18,
        top: 20,
        resizeMode: 'contain'
    },
    formContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 50,
        height: 'auto'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#bfc1c2',
        borderRadius: 15,
        marginBottom: 5,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    input: {
        flex: 1,
        color: "black"
    },
    placeholder: {
        fontSize: 15,
        fontWeight: "bold",
        paddingLeft: 5,
        top: 10

    },
    forgotPassword: {
        alignSelf: 'flex-end'
    },
    forgotPasswordText: {
        color: 'black'
    },
    loginButton: {
        backgroundColor: '#1697C7',
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    loginButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    socialLoginContainer: {
        marginTop: 0,
        flexDirection: 'row',
        marginLeft: 55
    },
    socialLoginButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
});

export default SignupScreen;
