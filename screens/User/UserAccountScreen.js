import React,{useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import {useNavigation} from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';
import InputForm from '../Main/InputForm';

const UserAccountScreen = () => {
    
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };

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
                            top:-40
                           
                        }
                    }
                    source={
                        require('../../assets/logo2.png')
                    }/>
    </View>
   
         
                        

            {/* User Icon */}
            <View style={
                styles.userIconContainer
            }>
                <Icon name="user"
                    size={70}
                    color="black" />
        </View>



            {/* name,mail */}
        <View>
        <Text style={{fontSize:15,color:'white',padding:5,textAlign:'center'}}>User</Text>
        <Text style={{fontSize:10,color:'white' ,padding:5,textAlign:'center'}}>user123@gmail.com</Text>
        </View>



            {/* Heading */}
            <View style={
                styles.headingContainer
            }>
            <Text style={
                    styles.heading
                }>My Account</Text>
                <TouchableOpacity style={
                    styles.editButton
                }>
                    <Icon name="pencil"
                        size={20}
                        color="#1697C7"/>
                </TouchableOpacity>

                
            </View>


{/* profile component */}
<InputForm/>


</View>
   
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center', // Align items to the right
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
    input: {
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 15,
        marginLeft:20,
        paddingHorizontal: 15
    }
});

export default UserAccountScreen;
