import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { moderateScale } from "react-native-size-matters";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { OPTIONS } from "../screens/Mechanic/ServicesOptions";
import { getTokenFromStorage, getUserFromStorage } from "../authUtils/authUtils";
import axios from "axios";
import axiosconfig from '../axios/axios'
import AppContext from "../Provider/AppContext";

const RequestSheet = ({ mechanic, navigation }) => {
    const myContext = useContext(AppContext)
    const [loading, setloading] = useState(false)
    const { username,services, _id } = mechanic
    const [selectedService, setSelectedService] = useState([])
    function onMultiChange() {
        return (item) => setSelectedService(xorBy(selectedService, [item], 'id'))
    }
    const handleSubmit = async () => {
        try {
            setloading(true);
            const user = await getUserFromStorage()
            const obj = {
               requestor:user._id,
               services:selectedService,
               mechanic:_id
            }
            console.log(obj,"obj to send");

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
            <View style={styles.card}>
                <Text style={styles.mechanicName}>{username}</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoLabel}>Charges:</Text>
                        <Text style={styles.infoValue}>300</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoLabel}>Time:</Text>
                        <Text style={styles.infoValue}>10mins</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoLabel}>Reviews:</Text>
                        <Text style={styles.infoValue}>4.5</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.infoLabel}>Distance:</Text>
                        <Text style={styles.infoValue}>45</Text>
                    </View>
                </View>
                <View style={{}}>
                    <Text style={{ color: "#1697c7" }}>Services</Text>

                    <SelectBox
                        labelStyle={{ display: 'none' }}
                        arrowIconColor="#FFF"
                        searchIconColor="#FFF"
                        toggleIconColor="#FFF"
                        multiOptionContainerStyle={{ backgroundColor: '#000' }}
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
                {loading? <ActivityIndicator/>:
                 <Text style={styles.button} onPress={handleSubmit} >Sent Request</Text>
                }
               

            </View>
        </>
    )
}
const styles = StyleSheet.create({
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
        backgroundColor: '#1697c7',
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    mechanicName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    distance: {
        fontSize: 16,
        color: 'gray',
    },
    button: {
        backgroundColor: '#000',
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