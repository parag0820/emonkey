import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating.');
      return;
    }
    Alert.alert('Thank You!', 'Your feedback has been submitted.');
    setRating(0);
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate Us</Text>
      <Text style={styles.subText}>
        We value your feedback! Please rate your experience.
      </Text>

      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(item => (
          <TouchableOpacity key={item} onPress={() => setRating(item)}>
            <Icon
              name={item <= rating ? 'star' : 'star-outline'}
              size={40}
              color={item <= rating ? '#FFD700' : '#B0B0B0'}
              style={{ marginHorizontal: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Leave a comment</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 120,
    padding: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 25,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default RateUs;
