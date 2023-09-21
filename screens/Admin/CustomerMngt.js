import React , { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image,ScrollView,TouchableOpacity,Modal,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native'

const CustomerMngt = () => {

  const navigation = useNavigation();

  // open drawer
  const openDrawer = () => {
    navigation.openDrawer();
  };

  // back functionality
  const handleBack = () => {
    navigation.navigate('AdminAccountScreen');
  };

// serach bar
const [searchText, setSearchText] = useState('');
const [filteredCustomerList, setFilteredCustomerList] = useState(customerList);

const handleSearch = () => {
  const filteredList = customerList.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase())
  );
  setFilteredCustomerList(filteredList);
};

  // table data
  const [customerList, setCustomerList] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', imageSource: require('../../assets/john.jpg') },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', imageSource: require('../../assets/jane.jpg') },
    { id: 3, name: 'Adrien', email: 'adrien@example.com', imageSource: require('../../assets/john.jpg') },
    { id: 4, name: 'Sam Duke', email: 'sam@example.com', imageSource: require('../../assets/jane.jpg') },
    // ... other customer data
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '' });


  // edit functionality
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setNewCustomer(customer);
    setIsAddModalVisible(true);
  };

  // delete functonality
  const handleDeleteCustomer = (customerId) => {
    setCustomerList(customerList.filter((customer) => customer.id !== customerId));
  };

 // Add customer
  const handleAddCustomer = () => {
    if (selectedCustomer) {
      // Update existing customer
      const updatedCustomerList = customerList.map((customer) =>
        customer.id === selectedCustomer.id ? newCustomer : customer
      );
      setCustomerList(updatedCustomerList);
    } else {
      // Add new customer
      const newId = customerList.length + 1;
      const updatedCustomerList = [...customerList, { ...newCustomer, id: newId }];
      setCustomerList(updatedCustomerList);
    }

    setNewCustomer({ name: '', email: '' });
    setSelectedCustomer(null);
    setIsAddModalVisible(false);
  };





  const renderCustomerItem = ({ item }) => (
     
//<TouchableOpacity onPress={handleCustomerClick}>
    <View style={styles.customerItem}>
       <Image source={item.imageSource} style={styles.customerImage} /> Add this line
      <Text style={styles.customerName}>{item.name}</Text>
      <Text style={styles.customerEmail}>{item.email}</Text>
      <TouchableOpacity onPress={() => handleEditCustomer(item)}>
        <Icon name="pencil" size={20} color="#1697C7" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteCustomer(item.id)}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
    //</TouchableOpacity>
  );
  
// screen design 
  return (
    <View style={styles.container}>
  
{/* header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={{ marginLeft: 15 }}>
      <Icon name="arrow-left" size={20} color="#1697C7" />
    </TouchableOpacity>

    <Image style={styles.logo} source={require('../../assets/logo2.png')} />

      <TouchableOpacity onPress={openDrawer}>
        <Icon name="bars" size={30} color="#1697C7" style={{paddingRight:10}} />
        </TouchableOpacity>
        
      </View>

   {/* Background */}
   <View style={
                styles.background
            }>
            </View>



  {/* heading */}
      <View style={styles.content}>
        <Text style={styles.title}>Customer Management</Text>

        
      {/* serach */}
      <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search by name or email"
      value={searchText}
      onChangeText={(text) => setSearchText(text)}
    />
    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
      <Icon name="search" size={20} color="#1697C7" />
    </TouchableOpacity>
  </View>


{/* table */}
 {/* Customer Table */}
 
 <View style={styles.table}>
 <ScrollView>
          <View style={styles.tableRow}>
           <Text style={styles.tableHeader}> Image</Text>
            <Text style={[styles.tableName,styles.tableHeader]}>Name</Text>
            <Text style={[styles.tableEmail,styles.tableHeader]}>Email</Text>
            <Text style={[styles.tableActions,styles.tableHeader]}>Actions</Text>
          </View>
          {customerList.map((customer) => (
           // <TouchableOpacity onPress={handleCustomerClick}>
            <View style={styles.tableRow} key={customer.id}>
            <Image source={customer.imageSource} style={ styles.tableImage}/>
              <Text style={styles.tableName}>{customer.name}</Text>
              <Text style={styles.tableEmail}>{customer.email}</Text>
              <View style={styles.tableActions}>
                <TouchableOpacity onPress={() => handleEditCustomer(customer)}>
                  <Icon name="pencil" size={20} color="#1697C7" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteCustomer(customer.id)}>
                  <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
              
              </View>
            </View>
          //  </TouchableOpacity>
          ))}
          </ScrollView>
        </View>



        {/* <FlatList
          data={customerList}
          renderItem={renderCustomerItem}
          keyExtractor={(item) => item.id.toString()}
        /> */}

        {/* add customer button */}
        {/* <TouchableOpacity onPress={() => setIsAddModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add Customer</Text>
        </TouchableOpacity> */}
      </View>
    

{/* modal */}
    <Modal visible={isAddModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add/Edit Customer</Text>
        <TextInput
          placeholder="Name"
          value={newCustomer.name}
          onChangeText={(text) => setNewCustomer({ ...newCustomer, name: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={newCustomer.email}
          onChangeText={(text) => setNewCustomer({ ...newCustomer, email: text })}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddCustomer} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>{selectedCustomer ? 'Update' : 'Add'} Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsAddModalVisible(false)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  </View>
);
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    marginTop:-20,
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  background: {
    position: 'absolute',
    top: 80,
    left: 0,
    width: '100%',
    height: '15%',
    backgroundColor: '#1697C7', // Set your preferred color
},
searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  marginTop:30
},
searchInput: {
  flex: 1,
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
},
searchButton: {
  marginLeft: 10,
},
 table: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop:20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
tableImage:{
  width: 30,
  height:40,
  borderRadius:70
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  tableName:{
    width:'20%'
  },
  tableEmail:{
    width:'40%'
  },
  tableActions: {
    flexDirection: 'row',
    width: '20%',
    paddingLeft:10,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 20,
    bottom:30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  customerName: {
    fontSize: 16,
  },
  customerEmail: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#1697C7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop:20
  },
  addButtonLabel: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#1697C7',
    borderWidth: 1,
  },
  cancelButtonLabel: {
    color: '#1697C7',
    textAlign: 'center',
  },
});

export default CustomerMngt;
