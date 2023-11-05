import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome5 } from '@expo/vector-icons'; // Import icons from your chosen library
import Icon from 'react-native-vector-icons/FontAwesome'; // You can change the icon library if needed



// Import your screens
import MechanicHomeScreen from './MechanicHomeScreen';
import ServiceRequestsScreen from './ServiceRequestsScreen';
import MechanicAccountScreen from './MechanicAccountScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#1697c7', // Change the color as needed
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Requests"
        component={ServiceRequestsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SpareParts"
        component={ServiceRequestsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="tools" size={size} color={color} />
            
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={MechanicAccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
