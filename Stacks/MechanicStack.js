
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens import
import MechanicDrawerContent from '../DrawerContent/MechanicDrawerContent';
import MechanicAccountScreen from '../screens/Mechanic/MechanicAccountScreen';
import MechanicProfile from '../screens/Mechanic/MechanicProfile';
import ServiceRequestsScreen from '../screens/Mechanic/ServiceRequestsScreen';
import MechanicHomeScreen from '../screens/Mechanic/MechanicHomeScreen';
import AcceptedRequestScreen from '../screens/Mechanic/AcceptedRequestScreen';
import BottomSheetExample from '../screens/Mechanic/BottomSheetExample';
import SettingScreen from '../screens/Main/SettingScreen';
import LogoutModal from '../screens/Main/LogoutModal';




const Drawer = createDrawerNavigator();

const MechanicStack = () => { 
    
    return (
    
      <Drawer.Navigator drawerContent={(props) => {
           return <MechanicDrawerContent {...props} initialRoute={'MechanicHomeScreen'}/>}} >
           <Drawer.Screen name='MechanicHomeScreen' component={MechanicHomeScreen} options={{headerShown:false}} />
           <Drawer.Screen name='MechanicAccountScreen' component={MechanicAccountScreen} options={{headerShown:false}} />
           <Drawer.Screen name='MechanicProfile' component={MechanicProfile} options={{headerShown:false}} />
           <Drawer.Screen name='ServiceRequestsScreen' component={ServiceRequestsScreen} options={{headerShown:false}} />
           <Drawer.Screen name='AcceptedRequestScreen' component={AcceptedRequestScreen} options={{headerShown:false}} />
           <Drawer.Screen name='BottomSheetExample' component={BottomSheetExample} options={{headerShown:false}} />
           <Drawer.Screen name='SettingScreen' component={SettingScreen} options={{headerShown:false}} />
           <Drawer.Screen name='Logout' component={LogoutModal} options={{ headerShown: false }} />

      </Drawer.Navigator>
   
    )
}

export default MechanicStack