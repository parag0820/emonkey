import axios from 'axios';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import BASE_URL from '../api/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HelpSupport = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    const userInfo = await AsyncStorage.getItem('userInfo');
    const userData = JSON.parse(userInfo);
    const userId = userData?.user_id;

    const payload = {
      user_id: userId,
      tittle: title,
      description,
    };

    try {
      const helpResponse = await axios.post(`${BASE_URL}helpSupport`, payload);
      const data = helpResponse?.data?.message;
      if (data === `Help and Support added successfully.`) {
        Alert.alert('Submitted', 'Your query has been submitted successfully.');
        setTitle('');
        setDescription('');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Help & Support</Text>
      <Text style={styles.subText}>
        If you are experiencing any issues, please let us know and we’ll reach
        back as soon as possible.
      </Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your issue title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Explain your problem</Text>
      <TextInput
        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        placeholder="Describe your issue here"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#8C1212',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default HelpSupport;
