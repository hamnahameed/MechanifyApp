import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FloatingLabelInput = ({ label, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { top: isFocused || value ? -10 : 12 }]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input]}
       // placeholder={`Enter ${label}`} // Set a dynamic placeholder
      />
    </View>
  );
};

const InputForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [homeAddress, setHomeAddress] = useState('');

  return (
    <View style={styles.container}>
      {/* First Name and Last Name in one row */}
      <View style={styles.row}>
        <FloatingLabelInput label="First Name" value={firstName} onChangeText={setFirstName} />
        <FloatingLabelInput label="Last Name" value={lastName} onChangeText={setLastName} />
      </View>

      {/* Email and Password in one row */}
      <View style={styles.row}>
        <FloatingLabelInput label="Email" value={email} onChangeText={setEmail} />
        <FloatingLabelInput label="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
      </View>

      {/* City and Area in one row */}
      <View style={styles.row}>
        <FloatingLabelInput label="City" value={city} onChangeText={setCity} />
        <FloatingLabelInput label="Area" value={area} onChangeText={setArea} />
      </View>

      {/* Home Address */}
      <FloatingLabelInput label="Home Address" value={homeAddress} onChangeText={setHomeAddress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    
  },
  inputContainer: {
    flex: 1,
    paddingVertical:15
  },
  label: {
    position: 'absolute',
    left: 10,
    paddingLeft:10
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#1697C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius:20,
  },
});

export default InputForm;
