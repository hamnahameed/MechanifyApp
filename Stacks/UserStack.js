import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import UserAccountScreen from '../screens/User/UserAccountScreen';
import UserDrawerContent from '../DrawerContent/UserDrawerContent';


const Drawer = createDrawerNavigator();

const UserStack = () => { 
    
    return (
    
      <Drawer.Navigator
         drawerContent={(props) => {
           return <UserDrawerContent {...props}/>
             }}>
           {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
           <Drawer.Screen name='UserAccountScreen' component={UserAccountScreen} options={{headerShown:false}} />
           
     
         </Drawer.Navigator>
   
    )
}

export default UserStack