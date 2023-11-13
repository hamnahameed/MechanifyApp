import React,{useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import {useNavigation} from '@react-navigation/native'
import InputForm from '../Main/InputForm';
import { CheckBox } from 'react-native-elements';


const UserAccountScreen = () => {
    
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const [gender, setGender] = useState('male'); // Initial gender value


  const [selectedCity, setSelectedCity] = useState(''); // State to track the selected city

  // Define a function to handle city selection
  const handleCityChange = (value) => {
    setSelectedCity(value);
  };
    return (
        <View style={
            styles.container
        }>


            {/* Background */}
            <View style={
                styles.background
            }>
            </View>

          
{/* open drawer */}
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 40 ,top:30}}>
        <TouchableOpacity onPress={openDrawer}>
            <Icons name="bars" size={30} color="#1697C7" top={5}/>
        </TouchableOpacity>
        
    {/* logo */}
        <Image style={{width: 200,height: 150,position:'absolute',left:250,top:-40}}
                        source={require('../../assets/logo2.png')}/>
    </View>
   
         
                        

            {/* User Icon */}
            <View style={styles.userIconContainer}>
                <Icons name="user" size={70} color="black" />
            </View>



    {/* name,mail */}
        <View>
            <Text style={{fontSize:15,color:'white',padding:5,textAlign:'center'}}>User</Text>
            <Text style={{fontSize:10,color:'white' ,padding:5,textAlign:'center'}}>user123@gmail.com</Text>
        </View>



    {/* Heading */}
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>My Account</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Icon name="pencil" size={20} color="#1697C7"/>
                </TouchableOpacity>  
            </View>


{/* profile form */}
    <View style={styles.profileInfo}>
            <View style={styles.field}>
                <Icon name="account" size={24} color="#000" style={styles.icon} />
                <View style={{display:'flex',flexDirection:'column',marginLeft:20}}>
                    <Text style={{color:'#1697c7'}}>Username</Text>
                    <Text style={{fontSize:18}}>John doe</Text>
                </View>
            </View>
            <View style={styles.field}>
                <Icon name="email" size={24} color="#000" style={styles.icon} />
                <View style={{display:'flex',flexDirection:'column',marginLeft:20}}>
                    <Text style={{color:'#1697c7'}}>Email</Text>
                    <Text style={{fontSize:18}}>johndoe@gmail.com</Text>
                </View>
            </View>
            <View style={styles.field}>
                <Icon name="phone" size={24} color="#000" style={styles.icon} />
                <View style={{display:'flex',flexDirection:'column',marginLeft:20}}>
                    <Text style={{color:'#1697c7'}}>Phone Number</Text>
                    <Text style={{fontSize:18}}>031765390</Text>
                </View>
            </View>
            <View style={styles.field}>
                <Icon name="gender-male-female" size={24} color="#000" style={styles.icon} />
                <View style={{marginLeft:20}}>
                <Text style={{color:"#1697c7"}}>Gender</Text>
                <View style={styles.radioButtons}>
                    <View style={styles.radioButton}>
                        <Text style={{fontSize:18}}>Male</Text>
                        <CheckBox checked={gender === 'male'} onPress={() => setGender('male')} />
                    </View>
                    <View style={styles.radioButton}>
                        <Text style={{fontSize:18}}>Female</Text>
                        <CheckBox checked={gender === 'female'} onPress={() => setGender('female')} />
                    </View>
                </View>
                </View>
            </View>
            <View style={styles.field}>
                <Icon name="home" size={24} color="#000" style={styles.icon} />
                <View style={{display:'flex',flexDirection:'column',marginLeft:20}}>
                    <Text style={{color:'#1697c7'}}>Address</Text>
                    <Text style={{fontSize:18}}>House no 23,Street no 5,NewYork</Text>
                </View>
            </View>
        </View>
    </View>

   
    );
    
};

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 15,
        },
        background: {
            position: 'absolute',
            top: 80,
            left: 0,
            width: '100%',
            height: '15%',
            backgroundColor: '#1697C7', // Set your preferred color
        },
        logoContainer: {
            alignItems: 'right',
            marginVertical: 20
        },
        userIconContainer: {
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth:1,
            borderColor:'white',
            backgroundColor: 'white', // Set your preferred color
            justifyContent: 'center',
            alignItems: 'center',
            left:160,
            top:3
        },
        headingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 50
        },
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1697C7'
        },
        editButton: {
            marginLeft: 10
        },
        profileInfo: {
            marginTop: 20,
            marginLeft:20
        },
        field: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            marginVertical:20
        },
        icon: {
            marginRight: 10,
            borderRadius: 50,
            backgroundColor:'#C0C0C0',
            padding:10
        },
        radioButtons: {
            flexDirection: 'row',
        },
        radioButton: {
            flexDirection: 'row',
            alignItems: 'center',
        
            marginRight: 20,
            marginTop:-15
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

export default UserAccountScreen;
