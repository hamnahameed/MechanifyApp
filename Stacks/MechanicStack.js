
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';


import MechanicDrawerContent from '../DrawerContent/MechanicDrawerContent';
import MechanicAccountScreen from '../screens/Mechanic/MechanicAccountScreen';



const Drawer = createDrawerNavigator();

const MechanicStack = () => { 
    
    return (
    
      <Drawer.Navigator
         drawerContent={(props) => {
           return <MechanicDrawerContent {...props}/>
             }}>
           {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
           <Drawer.Screen name='MechanicAccountScreen' component={MechanicAccountScreen} options={{headerShown:false}} />
           
     
         </Drawer.Navigator>
   
    )
}

export default MechanicStack