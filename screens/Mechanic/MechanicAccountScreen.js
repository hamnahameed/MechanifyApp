import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,

} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import AppContext from '../../Provider/AppContext';
import { moderateScale } from 'react-native-size-matters';
import TopBar from '../../components/TopBar';



const MechanicAccountScreen = () => {
    const navigation = useNavigation();
    const myContext = useContext(AppContext)
    const [gender, setGender] = useState('male'); // Initial gender value

    return (
        <SafeAreaView style={{flex:1}}>
          
                <View style={styles.container}>
                
                   <TopBar navigation={navigation}/>
                   <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.background}>
                    {/* User Icon */}
                    <View style={styles.userIconContainer}>
                        <Icons name="user" size={70} color="black" />
                    </View>
                    <View>
                        <Text style={{fontSize: 20,color: 'white',padding: 5,textAlign: 'center'}}>Mechanic</Text>
                        <Text style={{fontSize: 15,color: 'white', padding: 5, textAlign: 'center'}}>mechanic123@gmail.com</Text>
                    </View>
                    </View>

                    <View style={styles.headingContainer}>
                        <View style={{flex:1}}>
                        <Text style={styles.heading}>My Account</Text>
                        </View>
                       
                        <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                            <Icon name="pencil"
                                size={20}
                                color="#1697C7" />
                        </TouchableOpacity>


                    </View>

                    {/* profile form */}
                    <View style={styles.profileInfo}>
                        <View style={styles.field}>
                            <Icon name="account" size={24} color="#000" style={styles.icon} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                                <Text style={{ color: '#1697c7' }}>Username</Text>
                                <Text style={{ fontSize: 18 }}>John doe</Text>
                            </View>
                        </View>
                        <View style={styles.field}>
                            <Icon name="email" size={24} color="#000" style={styles.icon} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                                <Text style={{ color: '#1697c7' }}>Email</Text>
                                <Text style={{ fontSize: 18 }}>johndoe@gmail.com</Text>
                            </View>
                        </View>
                        {/* <View style={styles.field}>
                <Icon name="lock" size={24} color="#000" style={styles.icon} />
                <Text>Password</Text>
            </View> */}
                        <View style={styles.field}>
                            <Icon name="phone" size={24} color="#000" style={styles.icon} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                                <Text style={{ color: '#1697c7' }}>Phone Number</Text>
                                <Text style={{ fontSize: 18 }}>031765390</Text>
                            </View>
                        </View>
                        <View style={styles.field}>
                            <Icon name="gender-male-female" size={24} color="#000" style={styles.icon} />
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ color: "#1697c7" }}>Gender</Text>
                                <View style={styles.radioButtons}>
                                    <View style={styles.radioButton}>
                                        <Text style={{ fontSize: 18 }}>Male</Text>
                                        <CheckBox checked={gender === 'male'} onPress={() => setGender('male')} />
                                    </View>
                                    <View style={styles.radioButton}>
                                        <Text style={{ fontSize: 18 }}>Female</Text>
                                        <CheckBox checked={gender === 'female'} onPress={() => setGender('female')} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.field}>
                            <Icon name="home" size={24} color="#000" style={styles.icon} />
                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
                                <Text style={{ color: '#1697c7' }}>Address</Text>
                                <Text style={{ fontSize: 18 }}>{myContext.address}</Text>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
          
        </SafeAreaView>


    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical:moderateScale(30)
    },
    topBar:{
        flexDirection: 'row',
        marginTop:moderateScale(30)
    },
    background: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#1697C7', 
        padding:moderateScale(10),
      
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
    userIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white', // Set your preferred color
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingContainer: {
        flexDirection: 'row',
        paddingHorizontal: moderateScale(20),
        marginTop: moderateScale(10)
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1697C7'
    },
   
    profileInfo: {
        marginTop: 20,
        marginLeft: 20
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginVertical: 20
    },
    icon: {
        marginRight: 10,
        borderRadius: 50,
        backgroundColor: '#C0C0C0',
        padding: 10
    },
    radioButtons: {
        flexDirection: 'row',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',

        marginRight: 20,
        marginTop: -15
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 15,
        marginLeft: 20,
        paddingHorizontal: 15
    }
});

export default MechanicAccountScreen;
