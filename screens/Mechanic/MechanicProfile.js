import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const MechanicProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [email, setEmail] = useState('john@example.com');
  const [experience, setExperience] = useState('10 years');
  const [expertise, setExpertise] = useState('Engine Repair, Brake Service');

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/john.jpg')}
        style={styles.profileImage}
      />
      <TouchableOpacity onPress={handleEditProfile}>
        <Text style={styles.editButton}>{isEditing ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>
      <Text style={styles.fullName}>{isEditing ? 'Edit Profile' : name}</Text>
      <TextInput
        style={styles.inputField}
        value={name}
        onChangeText={setName}
        editable={isEditing}
      />
      <Text style={styles.contactInfo}>{isEditing ? 'Edit Phone' : `Phone: ${phone}`}</Text>
      <TextInput
        style={styles.inputField}
        value={phone}
        onChangeText={setPhone}
        editable={isEditing}
      />
      <Text style={styles.contactInfo}>{isEditing ? 'Edit Email' : `Email: ${email}`}</Text>
      <TextInput
        style={styles.inputField}
        value={email}
        onChangeText={setEmail}
        editable={isEditing}
      />
      <Text style={styles.experience}>{isEditing ? 'Edit Experience' : `Experience: ${experience}`}</Text>
      <TextInput
        style={styles.inputField}
        value={experience}
        onChangeText={setExperience}
        editable={isEditing}
      />
      <Text style={styles.expertise}>{isEditing ? 'Edit Expertise' : `Expertise: ${expertise}`}</Text>
      <TextInput
        style={styles.inputField}
        value={expertise}
        onChangeText={setExpertise}
        editable={isEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  editButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 10,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputField: {
    fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '80%',
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  experience: {
    fontSize: 16,
    marginBottom: 5,
  },
  expertise: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default MechanicProfile;
