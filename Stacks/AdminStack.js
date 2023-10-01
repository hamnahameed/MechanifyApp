//import liraries
import React, { Component } from 'react';


import AdminAccountScreen from '../screens/Admin/AdminAccountScreen';
import CustomerMngt from '../screens/Admin/CustomerMngt';
import MechanicMngt from '../screens/Admin/MechanicMngt';
import CustomerDetailsScreen from '../screens/Admin/CustomerDetailsScreen';
import LogoutModal from '../screens/Main/LogoutModal';
import CustomDrawerContent from '../DrawerContent/CustomDrawerContent';

import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();



// create a component
const AdminStack = () => {
    return (
        <Drawer.Navigator
        drawerContent={(props) => {
          return <CustomDrawerContent {...props}/>
            }}>
          {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
          <Drawer.Screen name='AdminAccountScreen' component={AdminAccountScreen} options={{headerShown:false}} />
          <Drawer.Screen name='CustomerMngt' component={CustomerMngt} options={{headerShown:false}} />
          <Drawer.Screen name='CustomerDetailsScreen' component={CustomerDetailsScreen} options={{headerShown:false}} />
          <Drawer.Screen name='MechanicMngt' component={MechanicMngt}  options={{headerShown:false}}/>
        
          <Drawer.Screen name='LogoutModal' component={LogoutModal} options={{ headerShown: false }} />
    
        </Drawer.Navigator>
    );
};


export default AdminStack;
