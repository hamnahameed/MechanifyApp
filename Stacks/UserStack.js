import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';


// import screens
import UserAccountScreen from '../screens/User/UserAccountScreen';
import UserDrawerContent from '../DrawerContent/UserDrawerContent';
import UserHomeScreen from '../screens/User/UserHomeScreen';
import LocationType from '../screens/User/LocationType';
import MapViewScreen from '../screens/User/MapViewScreen';
import ServiceSelectionScreen from '../screens/User/ServiceSelectionScreen';
import FindMechanicScreen from '../screens/User/FindMechanicScreen';
import MechanicAcceptedScreen from '../screens/User/MechanicAcceptedScreen';
import SettingScreen from '../screens/Main/SettingScreen';
import LogoutModal from '../screens/Main/LogoutModal';


const Drawer = createDrawerNavigator();

const UserStack = () => { 
    
    return (
    
      <Drawer.Navigator drawerContent={(props) =>{
          return <UserDrawerContent {...props}/>}}>
          <Drawer.Screen name='UserHomeScreen' component={UserHomeScreen} options={{headerShown:false}} />
          <Drawer.Screen name='UserAccountScreen' component={UserAccountScreen} options={{headerShown:false}} />
          <Drawer.Screen name='LocationType' component={LocationType} options={{headerShown:false}} />
          <Drawer.Screen name='MapViewScreen' component={MapViewScreen} options={{headerShown:false}} />
          <Drawer.Screen name='ServiceSelectionScreen' component={ServiceSelectionScreen} options={{headerShown:false}} />
          <Drawer.Screen name='FindMechanicScreen' component={FindMechanicScreen} options={{headerShown:false}} />
          <Drawer.Screen name='MechanicAcceptedScreen' component={MechanicAcceptedScreen} options={{headerShown:false}} />
          <Drawer.Screen name='SettingScreen' component={SettingScreen} options={{headerShown:false}} />
          <Drawer.Screen name='Logout' component={LogoutModal} options={{ headerShown: false }} />

     
         </Drawer.Navigator>
   
    )
}

export default UserStack