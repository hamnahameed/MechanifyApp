  import React,{useState,useEffect} from 'react';
  import { View, StyleSheet ,Text,TouchableOpacity,Image} from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import MapView, { Marker } from 'react-native-maps';
  import {useNavigation} from '@react-navigation/native'
  import { Linking } from 'react-native';
  import * as Location from 'expo-location';



  const MechanicAcceptedScreen= () => {
    // Dummy data for user's location
    const userLocation = {
      latitude: 37.78825,
      longitude: -122.4324,
    };

    // Dummy contact information
    const contactInfo = {
      name: 'mechanic name',
      phone: '123-456-7890',
    };

      // Handle opening WhatsApp
      const openWhatsApp = () => {
          const phoneNumber = contactInfo.phone;
          const whatsappMessage = 'Hello, I am your mechanic.';
      
          Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${whatsappMessage}`);
        };
      
        // Handle making a phone call
        const makePhoneCall = () => {
          const phoneNumber = contactInfo.phone;
          Linking.openURL(`tel:${phoneNumber}`);
        };

      // back functionality
      const navigation = useNavigation();
      const handleBack = () => {
          navigation.navigate('FindMechanicScreen');
   
    };

  //   open drawer
    const openDrawer = () => {
      navigation.openDrawer();
    };

    
    // current Location
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
        

        
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      };
  
    
      getLocation();
    }, []);
  
  
    return (
      <View style={styles.container}>
        {/* Header with back button and logo */}
        <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={{ marginLeft: 15 }}>
        <Icon name="arrow-left" size={20} color="#1697C7" />
      </TouchableOpacity>

      <Image style={styles.logo} source={require('../../assets/logo2.png')} />

        <TouchableOpacity onPress={openDrawer}>
          <Icon name="bars" size={30} color="#1697C7" style={{paddingRight:10}} />
          </TouchableOpacity>
          
        </View>
        <View style={styles.horizontalLine} ></View>
        

        {/* Map section */}
      
        {initialRegion && (
          <MapView style={styles.map} initialRegion={initialRegion} >
            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                tracksViewChanges={true}
                title="Your Location"
              />
            )}
        
          </MapView>
          )}
      
      
    {/* Contact information */}
    <View style={styles.contactInfo}>
        

        
      
        <View style={styles.nameContainer}>
          <Image  source={require('../../assets/john.jpg')} style={styles.contactImage}/>
          <Text style={{fontSize:20,marginLeft:20,color:'#C0C0C0',fontWeight:'bold',width:100}}>{contactInfo.name}</Text>
          
        <View style={styles.phoneContainer}>
            <TouchableOpacity onPress={makePhoneCall} style={styles.phoneButton}>
              <Icon name="phone" size={30} color="#007AFF" style={styles.phoneIcon} />
              {/* <Text style={styles.phoneText}>Call</Text> */}
            </TouchableOpacity>

            <TouchableOpacity onPress={openWhatsApp} style={styles.phoneButton}>
              <Icon name="whatsapp" size={30} color="#027148" style={styles.whatsappIcon} />
              {/* <Text style={styles.phoneText}>WhatsApp</Text> */}
            </TouchableOpacity>
        </View>
            </View>
          </View>
          
      </View>
    
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      marginBottom:-50  
    },
    logo: {
      width: 200,
      height: 150,
      marginLeft:30,
      marginTop:10,
    },
    horizontalLine: {
      borderBottomColor: '#1697c7', 
      borderBottomWidth: 5,  
    },
    map: {
      flex: 1,
    },
    contactImage:{
      width: 50,
      height:50,
      borderRadius: 50,
    },
    contactInfo: {
    padding: 16,
    borderTopStartRadius:30,
    borderTopEndRadius:30,
    backgroundColor: '#1697c7',
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',  
    },
    phoneContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft:50
    },
    phoneButton: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      borderRadius: 100,
      backgroundColor:'#C0c0c0',
      width: 50,
      height:50
    },
    phoneText: {
      fontSize: 16,
    },
    whatsappIcon: {
      marginBottom: 5,
    },

  });

  export default MechanicAcceptedScreen;
