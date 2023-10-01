import React from 'react'


import { createDrawerNavigator } from '@react-navigation/drawer';


import ShopAccountScreen from '../screens/Shop/ShopAccountScreen';
import ShopDrawerContent from '../DrawerContent/ShopDrawerContent';


const Drawer = createDrawerNavigator();

const ShopStack = () => { 
    
    return (
    
      <Drawer.Navigator
       
         drawerContent={(props) => {
           return <ShopDrawerContent {...props}/>
             }}>
           {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
           <Drawer.Screen name='ShopAccountScreen' component={ShopAccountScreen} options={{headerShown:false}} />
           
     
         </Drawer.Navigator>
   
    )
}

export default ShopStack