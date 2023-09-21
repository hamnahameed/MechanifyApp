import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native'
import { useState } from 'react';

const CustomerDetailsScreen = () => {
     // back functionality
     const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('CustomerMngt');
  };

  const fetchUserDetails = (userId) => {
    // Search for the user with the provided userId
    const user = useState.find((user) => user.id === userId);
    return user;
  };

  const route = useRoute();
  const CustomerDetailsScreen = ({ route }) => {
    const { userId, customer } = route.params;
  
    // Fetch user details based on the userId (replace this with actual logic)
    const user = fetchUserDetails(userId);

  }

  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={handleBack} style={{ marginLeft: 15 }}>
      <Icon name="arrow-left" size={20} color="#1697C7" />
    </TouchableOpacity>
      <Text>information</Text>
         {/* Display other customer and user information */}
         <Text>User ID: {userId}</Text>
      <Text>User Name: {user.name}</Text>
      <Text>User Email: {user.email}</Text>
      {/* Display other customer information */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // other styles
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  customerEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default CustomerDetailsScreen;
