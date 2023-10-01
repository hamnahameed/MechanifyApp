import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Stacks
import AuthStack from './Stacks/AuthStack';
import AdminStack from './Stacks/AdminStack';
import UserStack from './Stacks/UserStack';
import MechanicStack from './Stacks/MechanicStack';
import ShopStack from './Stacks/ShopStack';



const Stack = createStackNavigator();


const App=(props)=>{
  const username = props.route?.params?.username || 'default';

  return(
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name='Auth' component={AuthStack} options={{ headerShown: false }} />
    <Stack.Screen name='Admin' component={AdminStack} options={{ headerShown: false }} />
    <Stack.Screen name='User' component={UserStack} options={{ headerShown: false }} />
    <Stack.Screen name='Mechanic' component={MechanicStack} options={{ headerShown: false }} />
    <Stack.Screen name='Shop' component={ShopStack} options={{ headerShown: false }} />
  </Stack.Navigator>
  </NavigationContainer>
  )

}
  
export default App