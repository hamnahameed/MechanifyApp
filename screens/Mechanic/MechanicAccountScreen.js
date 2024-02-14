import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator,

} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconss from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import AppContext from '../../Provider/AppContext';
import { moderateScale } from 'react-native-size-matters';
import TopBar from '../../components/TopBar';
import { getTokenFromStorage } from '../../authUtils/authUtils';
import axios from 'axios';
import axiosconfig from '../../axios/axios'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { OPTIONS } from './ServicesOptions';





const MechanicAccountScreen = ({ route }) => {
    console.log(route.params);
    const navigation = useNavigation();
    const myContext = useContext(AppContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState(myContext.address)
    const [latitude, setLatitude] = useState(myContext.latitude)
    const [longitude, setLongitude] = useState(myContext.longitude);
    const [loading, setLoading] = useState(false)
    const [isloading, setloading] = useState(false)
    const [selectedService, setSelectedService] = useState([])

    useEffect(() => {
        if (route.params) {
            setAddress(route?.params?.address)
            setLatitude(route?.params?.latitude)
            setLongitude(route?.params?.longitude)

        }
    }, [route.params])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const token = await getTokenFromStorage();
                const response = await axiosconfig.get('/auth/getUser', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response?.data?.data, "res");
                setName(response?.data?.data?.username)
                setEmail(response?.data?.data?.email)
                setAddress(response?.data?.data?.address)
                setPhone(response?.data?.data?.phoneNum)
                setSelectedService(response?.data?.data?.services)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    Alert.alert(error.response?.data?.message || "An Error Occured")
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [myContext.userRefresh]);

    const handleSubmit = async () => {
        try {
            setloading(true);
            const obj = {
                username: name,
                address: address,
                latitude: latitude,
                longitude: longitude,
                phoneNum: phone,
                services:selectedService
            }
            console.log(obj,"obj to send");

            const token = await getTokenFromStorage();
            const response = await axiosconfig.put('/auth/updateuser', obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert(response?.data?.message)
            myContext.setUserRefresh(!myContext.userRefresh)
            navigation.navigate('MechanicHomeScreen');

        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Alert.alert(error.response?.data?.message || "An Error Occured")
                console.log(error);
            }
        } finally {
            setloading(false);
        }
    };

    function onMultiChange() {
        return (item) => setSelectedService(xorBy(selectedService, [item], 'id'))
      }



    return (
        <>

            {loading ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator color={"#1697c7"} size={'large'}/>
                </View> :
                <SafeAreaView style={{ flex: 1 }}>

                    <View style={styles.container}>

                        <TopBar navigation={navigation} />
                        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                            <View style={styles.background}>
                                {/* User Icon */}
                                <View style={styles.userIconContainer}>
                                    <Icons name="user" size={70} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20, color: 'white', padding: 5, textAlign: 'center' }}>{name}</Text>
                                    <Text style={{ fontSize: 15, color: 'white', padding: 5, textAlign: 'center' }}>{email}</Text>
                                </View>
                            </View>

                            <View style={styles.headingContainer}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.heading}>My Account</Text>
                                </View>

                                {/* <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                            <Icon name="pencil"
                                size={20}
                                color="#1697C7" />
                        </TouchableOpacity> */}


                            </View>

                            {/* profile form */}
                            <View style={styles.profileInfo}>
                                <View style={styles.field}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Icon name={'account'} size={30} color="#000" style={styles.icon} />
                                    </View>

                                    <View style={{ flex: 3, justifyContent: 'center' }}>
                                        <Text style={{ color: '#1697c7' }}>{'Username'}</Text>
                                        <TextInput style={{ fontSize: 18 }} value={name} onChangeText={(e) => setName(e)} />
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Icon name={'email'} size={30} color="#000" style={styles.icon} />
                                    </View>

                                    <View style={{ flex: 3, justifyContent: 'center' }}>
                                        <Text style={{ color: '#1697c7' }}>{'Email'}</Text>
                                        <TextInput editable={false} style={{ fontSize: 18 }} value={email} />
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Icon name={'phone'} size={30} color="#000" style={styles.icon} />
                                    </View>

                                    <View style={{ flex: 3, justifyContent: 'center' }}>
                                        <Text style={{ color: '#1697c7' }}>{'Phone Number'}</Text>
                                        <TextInput style={{ fontSize: 18 }} value={phone} onChangeText={(e) => setPhone(e)} />
                                    </View>
                                </View>
                              
                        
                                
                                <View style={styles.field}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Icon name={'map-marker-outline'} size={30} color="#000" style={styles.icon} />
                                    </View>

                                    <View style={{ flex: 3, justifyContent: 'center' }}>
                                        <Text style={{ color: '#1697c7' }}>{'Location'}</Text>
                                        {/* <TouchableOpacity onPress={() => navigation.navigate('MechanicLocationScreen')}> */}
                                            <TextInput editable={false} multiline={true} style={{ fontSize: 18 }} value={address} />
                                        {/* </TouchableOpacity> */}

                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Iconss name={'miscellaneous-services'} size={30} color="#000" style={styles.icon} />
                                    </View>

                                    <View style={{ flex: 3, justifyContent: 'center' }}>
                                        <Text style={{ color: "#1697c7" }}>Services</Text>
                                        
                                        <SelectBox
                                            labelStyle={{display:'none'}}
                                            arrowIconColor="#1697c7"
                                            searchIconColor="#1697c7"
                                            toggleIconColor="#1697c7"
                                            multiOptionContainerStyle={{backgroundColor:'#1697c7'}}
                                            options={OPTIONS}
                                            selectedValues={selectedService}
                                            onMultiSelect={onMultiChange()}
                                            onTapClose={onMultiChange()}
                                            isMulti
                                            listOptionProps={{ nestedScrollEnabled: true }}
                                            fixedHeight={true}
                                
                                        />
                                    </View>
                                </View>
                            </View>
                            {isloading ? <ActivityIndicator size={'large'} color={'#1697c7'} /> :
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={{
                                        backgroundColor: '#1697c7',
                                        padding: moderateScale(15),
                                        marginHorizontal: moderateScale(30),
                                        marginVertical: moderateScale(40),
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}>
                                    <Text style={styles.button}>SAVE</Text>
                                </TouchableOpacity>
                            }



                        </ScrollView>
                    </View>

                </SafeAreaView>
            }

        </>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: moderateScale(30)
    },
    topBar: {
        flexDirection: 'row',
        marginTop: moderateScale(30)
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1697C7',
        padding: moderateScale(10),

    },
    button: {
        fontSize: 18,
        color: '#fff',
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
        marginTop: moderateScale(20),

    },
    field: {
        flexDirection: 'row',
        marginVertical: moderateScale(8)
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: '#C0C0C0',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
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
