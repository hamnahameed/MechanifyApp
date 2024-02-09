import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Stacks
import AuthStack from './Stacks/AuthStack';
import AdminStack from './Stacks/AdminStack';
import UserStack from './Stacks/UserStack';
import MechanicStack from './Stacks/MechanicStack';
import ShopStack from './Stacks/ShopStack';
import AppContext from './Provider/AppContext';



const Stack = createStackNavigator();


const App = (props) => {
  const [latitude, setLatitude] = useState(37.78825);
  const [longitude, setLongitude] = useState(-122.4324);
  const [address, setAddress] = useState("");
  const userSetting = {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    address,
    setAddress

  }

  return (
    <AppContext.Provider value={userSetting}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Auth' component={AuthStack} options={{ headerShown: false }} />
          <Stack.Screen name='Admin' component={AdminStack} options={{ headerShown: false }} />
          <Stack.Screen name='User' component={UserStack} options={{ headerShown: false }} />
          <Stack.Screen name='Mechanic' component={MechanicStack} options={{ headerShown: false }} />
          <Stack.Screen name='Shop' component={ShopStack} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>

  )

}

export default App