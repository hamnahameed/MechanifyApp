import React, { useState } from 'react';
import {
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
    SafeAreaView,

} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import axios from 'axios';
import axiosconfig from '../../axios/axios'
import { ActivityIndicator } from 'react-native-paper';


const SignupScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('user');
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const handleSignUp = async () => {
        try {
            setLoading(true);
            if (password !== cPassword) {
                Alert.alert("Confirm Password not match with password");
                return;
            }
            const obj = {
                username:userName,
                email,
                password,
                role:selectedRole
            }
            // console.log(obj);
            const response = await axiosconfig.post('/auth/signup', obj);
            Alert.alert(response?.data?.message);
            navigation.navigate('Login');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                Alert.alert(error.response?.data?.message || 'An Error Occurred');
            }
        } finally {
            setLoading(false);
        }

    };


    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground source={require('../../assets/bg.jpeg')}
                        style={styles.backgroundImage}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logo}>
                                <Image source={require('../../assets/logo2.png')}
                                    style={styles.logoImage} />
                            </View>
                        </View>
                        {/* signup form  */}
                        <View style={styles.formContainer}>
                            <Text style={styles.placeholder}>Username</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../../assets/userIcon.png')} style={styles.inputIcon} />
                                <TextInput style={styles.input} placeholder="username"
                                    value={userName}
                                    placeholderTextColor="black"
                                    onChangeText={
                                        (text) => setUserName(text)
                                    } />
                            </View>


                            <Text style={styles.placeholder}>Email Address</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../../assets/email.png')}
                                    style={styles.inputIcon} />
                                <TextInput style={styles.input}
                                    value={email}
                                    placeholder="email"
                                    placeholderTextColor="black"
                                    onChangeText={
                                        (text) => setEmail(text)
                                    } />
                            </View>

                            <Text style={styles.placeholder}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../../assets/passIcon.png')} style={styles.inputIcon} />
                                <TextInput style={styles.input}
                                    value={password}
                                    placeholder="password"
                                    placeholderTextColor="black"
                                    secureTextEntry
                                    onChangeText={
                                        (text) => setPassword(text)
                                    } />
                            </View>

                            <Text style={styles.placeholder}>Re-Enter Password</Text>
                            <View style={styles.inputContainer}>
                                <Image source={require('../../assets/passIcon.png')}
                                    style={styles.inputIcon} />
                                <TextInput style={styles.input}
                                    value={cPassword}
                                    placeholder="confirm password"
                                    placeholderTextColor="black"
                                    secureTextEntry
                                    onChangeText={
                                        (text) => setCPassword(text)
                                    } />

                            </View>

                            <Text style={styles.placeholder}>Login As</Text>
                            <View style={[styles.inputContainer, { height: 50 }]}>
                                <Picker style={styles.input}
                                    selectedValue={selectedRole}
                                    onValueChange={(itemValue, itemIndex) => handleRoleChange(itemValue)}>
                                    <Picker.Item label="User" value="user" />
                                    <Picker.Item label="Mechanic" value="mechanic" />
                                    <Picker.Item label="Shop Owner" value="shopOwner" />
                                </Picker>
                            </View>
                            {loading ? <ActivityIndicator size={'large'} color={'#1697C7'} /> :
                                <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                                    <Text style={styles.loginButtonText}>Sign up</Text>
                                </TouchableOpacity>
                            }


                            <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ textAlign: "center", color: "#1697C7", fontSize: 15 }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

// styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: moderateScale(30)
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
