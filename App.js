import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Stacks
import AuthStack from './Stacks/AuthStack';
import AdminStack from './Stacks/AdminStack';
import UserStack from './Stacks/UserStack';
import MechanicStack from './Stacks/MechanicStack';
import ShopStack from './Stacks/ShopStack';
import AppContext from './Provider/AppContext';
import { getTokenFromStorage, getUserFromStorage } from './authUtils/authUtils';



const Stack = createStackNavigator();
const App = (props) => {
  const [latitude, setLatitude] = useState(37.78825);
  const [longitude, setLongitude] = useState(-122.4324);
  const [address, setAddress] = useState("");
  const [userRole, setUserRole] = useState("")
  const [userToken, setUserToken] = React.useState(null);
  const [authRefresh, setAuthRefresh] = React.useState(false);
  const [userRefresh, setUserRefresh] = useState(false)
  const userSetting = {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    address,
    setAddress,
    authRefresh,
    setAuthRefresh,
    userRefresh,
    setUserRefresh
  }
  React.useEffect(() => {
    const fetchToken = async () => {
      const getToken = await getTokenFromStorage();
      const getUser = await getUserFromStorage();
      setUserToken(getToken);
      setUserRole(getUser.role);
    };

    fetchToken();
  }, [authRefresh]);

  console.log(userToken, 'token');
  console.log(userRole, 'role');
  return (
    <AppContext.Provider value={userSetting}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userToken ?
            <Stack.Screen name='Auth' component={AuthStack} options={{ headerShown: false }} /> :

            <>
              {userRole == 'user' ?
                <Stack.Screen name='User' component={UserStack} options={{ headerShown: false }} /> :
                userRole == 'admin' ?
                  <Stack.Screen name='Admin' component={AdminStack} options={{ headerShown: false }} /> :
                  userRole == 'mechanic' ?
                    <Stack.Screen name='Mechanic' component={MechanicStack} options={{ headerShown: false }} /> :
                    <Stack.Screen name='Shop' component={ShopStack} options={{ headerShown: false }} />
              }




            </>

          }


        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>

  )

}

export default App