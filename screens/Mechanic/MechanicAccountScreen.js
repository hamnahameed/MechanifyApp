import React ,{useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    Radio,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import {useNavigation} from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const MechanicAccountScreen = () => {
    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.openDrawer();
    };
    const [gender, setGender] = useState('male'); // Initial gender value

return (
        <View style={styles.container}>
          
            <View style={styles.background}></View>


            
            <View style={
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 40,
                    top: 30
                }
            }>
              <TouchableOpacity onPress={openDrawer}>
      <Icon name="bars"
                        size={30}
                        color="#1697C7" top={5} />
      </TouchableOpacity>


                {/* logo */}
                <Image style={
                        {
                            width: 200,
                            height: 150,
                            position: 'absolute',
                            left: 250,
                            top: -40

                        }
                    }
                    source={require('../../assets/logo2.png')}/>
            </View>


            {/* User Icon */}
            <View style={styles.userIconContainer}>
                <Icon name="user"
                    size={70}
                    color="black"/>

            </View>

            <View>
                <Text style={
                    {
                        fontSize: 15,
                        color: 'white',
                        padding: 5,
                        textAlign: 'center'
                    }
                }>Mechanic</Text>
                <Text style={
                    {
                        fontSize: 10,
                        color: 'white',
                        padding: 5,
                        textAlign: 'center'
                    }
                }>mechanic123@gmail.com</Text>
            </View>

           
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>My Account</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Icon name="pencil"
                        size={20}
                        color="#1697C7"/>
                </TouchableOpacity>


            </View>

        <View style={styles.profileInfo}>
            <View style={styles.field}>
                <Icon name="account" size={24} color="#000" style={styles.icon} />
                <Text>Username</Text>
            </View>
            <View style={styles.field}>
                <Icon name="email" size={24} color="#000" style={styles.icon} />
                <Text>Email</Text>
            </View>
            <View style={styles.field}>
                <Icon name="lock" size={24} color="#000" style={styles.icon} />
                <Text>Password</Text>
            </View>
            <View style={styles.field}>
                <Icon name="phone" size={24} color="#000" style={styles.icon} />
                <Text>Phone Number</Text>
            </View>
        <View style={styles.field}>
          <Icon name="gender-male-female" size={24} color="#000" style={styles.icon} />
          <Text>Gender</Text>
          <View style={styles.radioButtons}>
            <View style={styles.radioButton}>
              <Text>Male</Text>
              <Radio selected={gender === 'male'} onPress={() => setGender('male')} />
            </View>
            <View style={styles.radioButton}>
              <Text>Female</Text>
              <Radio selected={gender === 'female'} onPress={() => setGender('female')} />
            </View>
          </View>
        </View>
        <View style={styles.field}>
          <Icon name="home" size={24} color="#000" style={styles.icon} />
          <Text>Address</Text>
        </View>
      </View>
        </View>

        
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white', // Set your preferred color
        justifyContent: 'center',
        alignItems: 'center',
        left: 160,
        top: 3
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
      },
      field: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      icon: {
        marginRight: 10,
      },
      radioButtons: {
        flexDirection: 'row',
      },
      radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
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
