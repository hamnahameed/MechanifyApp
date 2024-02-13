import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const TopBar = ({navigation}) => {
    
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    
     <View style={{flexDirection:'row'}}>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <TouchableOpacity onPress={openDrawer}>
         <Icon name="bars"
           size={40}
           color="#1697C7"/>
       </TouchableOpacity>
     </View>
     <View style={{ flex: 3 }}></View>
     <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
       <Image style={{
         width: 150,
         height: 50,
         resizeMode: 'contain'
       }}
         source={
           require('../assets/logo.png')} />
     </View>
   </View>
  )
}

export default TopBar

const styles = StyleSheet.create({})