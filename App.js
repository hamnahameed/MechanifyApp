import React from 'react';

// Drawers
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './drawer/CustomDrawerContent';
import UserDrawerContent from './drawer/UserDrawerContent';
import MechanicDrawerContent from './drawer/MechanicDrawerContent';
import ShopDrawerContent from './drawer/ShopDrawerContent'

// main screens
import LoadingScreen from './screens/Main/LoadingScreen';
import HomeScreen from './screens/Main/HomeScreen';
import LoginScreen from './screens/Main/LoginScreen';
import SignupScreen from './screens/Main/SignupScreen';

// Admin screens
import AdminAccountScreen from './screens/Admin/AdminAccountScreen';
import CustomerMngt from './screens/Admin/CustomerMngt';
import CustomerDetailsScreen from './screens/Admin/CustomerDetailsScreen';
import MechanicMngt from './screens/Admin/MechanicMngt';

// user screens
import UserAccountScreen from './screens/Customer/UserAccountScreen';

// shop screens
import ShopAccountScreen from './screens/Shop/ShopAccountScreen';

//mechanic screens
import MechanicAccountScreen from './screens/Mechanic/MechanicAccountScreen';
import ProfileScreen from './screens/Main/InputForm';
import LogoutModal from './screens/Main/LogoutModal';




const Drawer = createDrawerNavigator();


// const AppNavigator=(props)=>{
//   const username = props.route?.params?.username || 'default';

//   // Admin 
//   if(username==='admin'){  
//     return(
//       <NavigationContainer>
//  <Drawer.Navigator
//     drawerContent={(props) => {
//       return <CustomDrawerContent {...props}/>
//         }}>
//       {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
//       <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
//       <Drawer.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
//       <Drawer.Screen name='Signup' component={SignupScreen} options={{headerShown:false}}/>
//       <Drawer.Screen name='AdminAccountScreen' component={AdminAccountScreen} options={{headerShown:false}} />
//       <Drawer.Screen name='CustomerMngt' component={CustomerMngt} options={{headerShown:false}} />
//       <Drawer.Screen name='CustomerDetailsScreen' component={CustomerDetailsScreen} options={{headerShown:false}} />
//       <Drawer.Screen name='MechanicMngt' component={MechanicMngt}  options={{headerShown:false}}/>
//       <Drawer.Screen name='UserAccountScreen' component={UserAccountScreen} options={{headerShown:false}} />
//     </Drawer.Navigator>
// </NavigationContainer> 
//     )  
//   }

//   // customer/user
//   if (username==='user') {
//     return(
//       <NavigationContainer>
//  <Drawer.Navigator
//     drawerContent={(props) => {
//       return <UserDrawerContent {...props}/>
//         }}>
//       {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
//       <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
//       <Drawer.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
//       <Drawer.Screen name='Signup' component={SignupScreen} options={{headerShown:false}}/>
//       <Drawer.Screen name='UserAccountScreen' component={UserAccountScreen} options={{headerShown:false}} />

//     </Drawer.Navigator>
// </NavigationContainer> 
//     ) 

//     // Mechanic
//   } if (username==='mechanic') {
//     return(
//       <NavigationContainer>
//  <Drawer.Navigator
//     drawerContent={(props) => {
//       return <MechanicDrawerContent {...props}/>
//         }}>
//       {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
//       <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
//       <Drawer.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
//       <Drawer.Screen name='Signup' component={SignupScreen} options={{headerShown:false}}/>
//       <Drawer.Screen name='MechanicAccountScreen' component={MechanicAccountScreen} options={{headerShown:false}} />
//     </Drawer.Navigator>
// </NavigationContainer> 
//     ) 
//   } 
//   // shop
//   else {
//     return(
//       <NavigationContainer>
//  <Drawer.Navigator
//     drawerContent={(props) => {
//       return <ShopDrawerContent {...props}/>
//         }}>
//       {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
//       <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
//       <Drawer.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
//       <Drawer.Screen name='Signup' component={SignupScreen} options={{headerShown:false}}/>
//       <Drawer.Screen name='ShopAccountScreen' component={ShopAccountScreen} options={{headerShown:false}} />
//     </Drawer.Navigator>
// </NavigationContainer> 
//     ) 
//   }
// }

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => {
          return <CustomDrawerContent {...props} />
        }}>
        {/* <Drawer.Screen name='Loading' component={LoadingScreen} options={{headerShown:false}}/> */}
        <Drawer.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        <Drawer.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Drawer.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
        <Drawer.Screen name='AdminAccountScreen' component={AdminAccountScreen} options={{ headerShown: false }} />
        <Drawer.Screen name='CustomerMngt' component={CustomerMngt} options={{ headerShown: false }} />
        <Drawer.Screen name='CustomerDetailsScreen' component={CustomerDetailsScreen} options={{ headerShown: false }} />
        <Drawer.Screen name='MechanicMngt' component={MechanicMngt} options={{ headerShown: false }} />
        <Drawer.Screen name='UserAccountScreen' component={UserAccountScreen} options={{ headerShown: false }} />
        <Drawer.Screen name='MechanicAccountScreen' component={MechanicAccountScreen} options={{ headerShown: false }} />
        <Drawer.Screen name='ProfileScreen' component={ProfileScreen} options={{ headerShown: false }} />
        <Drawer.Screen name='LogoutModal' component={LogoutModal} options={{ headerShown: false }} />

      </Drawer.Navigator>
    </NavigationContainer>
  )
}
export default AppNavigator;
