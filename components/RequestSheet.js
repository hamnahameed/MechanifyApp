import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { moderateScale } from "react-native-size-matters";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { OPTIONS } from "../screens/Mechanic/ServicesOptions";
import { getTokenFromStorage, getUserFromStorage } from "../authUtils/authUtils";
import axios from "axios";
import axiosconfig from '../axios/axios'
import AppContext from "../Provider/AppContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'

const RequestSheet = ({ mechanic, navigation }) => {
    const myContext = useContext(AppContext)
    const [loading, setloading] = useState(false)
    const { username, services, _id } = mechanic
    const [selectedService, setSelectedService] = useState([])
    const [description, setDescription] = useState("")
    function onMultiChange() {
        return (item) => setSelectedService(xorBy(selectedService, [item], 'id'))
    }
    const handleSubmit = async () => {
        try {
            setloading(true);
            const user = await getUserFromStorage()
            const obj = {
                requestor: user._id,
                services: selectedService,
                mechanic: _id,
                latitude: myContext.latitude,
                longitude: myContext.longitude,
                description: description,
            }
            console.log(obj, "obj to send");

            const token = await getTokenFromStorage();
            const response = await axiosconfig.post('/requestMechanic', obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert(response?.data?.message)
            myContext.setRequestRefresh(!myContext.requestRefresh)
            navigation.navigate("UserHomeScreen")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Alert.alert(error.response?.data?.message || "An Error Occured")
                console.log(error.response?.data);

            }
        } finally {
            setloading(false);
        }
    };

    return (
        <>
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <View style={styles.card}>
                <Text style={styles.mechanicName}>{username}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Icon style={{ marginRight: moderateScale(5) }} name='map-marker' size={20} color='#1697c7' />
                    <Text>{mechanic.address}</Text>
                </View>

               
                   

                    <View style={{ justifyContent: 'center',marginTop:moderateScale(10) }}>
                        <Text style={{ color: '#1697c7' }}>{'Description'}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('MechanicLocationScreen')}>
                            <TextInput multiline={true} style={{ fontSize: 15,borderBottomColor:"grey",borderBottomWidth:1 }} value={description} onChangeText={(e) => setDescription(e)} />
                        </TouchableOpacity>

                    </View>
              

                <View style={{marginTop:moderateScale(20)}}>
                    <Text style={{ color: "#1697c7" }}>Select Services</Text>

                    <SelectBox
                        labelStyle={{ display: 'none' }}
                        arrowIconColor="#1697c7"
                        searchIconColor="#1697c7"
                        toggleIconColor="#1697c7"
                        multiOptionContainerStyle={{ backgroundColor: 'grey' }}
                        options={services}
                        selectedValues={selectedService}
                        onMultiSelect={onMultiChange()}
                        onTapClose={onMultiChange()}
                        isMulti
                        listOptionProps={{ nestedScrollEnabled: true }}
                        fixedHeight={true}
                        hideInputFilter={true}
                    />
                </View>
                {loading ? <ActivityIndicator color={'#1697c7'} size={'large'} /> :
                    <Text style={styles.button} onPress={handleSubmit} >Sent Request</Text>
                }


            </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        marginTop: moderateScale(20)
    },
    location: {
        backgroundColor: 'whitesmoke',
        // borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        marginHorizontal: moderateScale(10),
        padding: moderateScale(10),
        marginTop: moderateScale(10)
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 20,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 8,
        zIndex: 1,
    },
    textInput: {
        flex: 1,
        marginLeft: 0,
        borderWidth: 1,
        borderColor: '#1697c7',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    card: {

        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    mechanicName: {
        color: '#1697c7',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    distance: {
        fontSize: 16,
        color: 'gray',
    },
    button: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        width: 200,
        borderRadius: 10,
        fontSize: 15,
        color: '#fff',
        marginTop: 20

    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    infoColumn: {
        flexDirection: 'row',
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    infoValue: {
        marginRight: 10,
    },
});
export default RequestSheet