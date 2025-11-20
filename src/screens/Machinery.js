import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Machinery = ({ navigation }) => {
  const [machines] = useState([
    {
      id: '1',
      title: 'Caterpillar Hydraulic Excavator',
      location: 'Ahmedabad, Gujarat',
      price: '₹48,00,000',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-UQGYhSWWM9zIwS5o40dpNxIuIvRoi1F6jw&s',
      description: '2021 Model | Diesel | 150 HP | Excellent Condition',
    },
    {
      id: '2',
      title: 'John Deere Tractor 5050D',
      location: 'Nagpur, Maharashtra',
      price: '₹6,80,000',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3HcdwrAHzQ-p93OBPCspTIWCXgXCUHEK3GQ&s',
      description: '2022 Model | 50 HP | 1200 hours used | Single Owner',
    },
    {
      id: '3',
      title: 'Atlas Copco Air Compressor',
      location: 'Chennai, Tamil Nadu',
      price: '₹3,20,000',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7rq11blTCNsEC2LDVcfW32q3cK8YdSya_Bw&s',
      description: 'Industrial Use | 2020 Model | 10 Bar | Fully Automatic',
    },
    {
      id: '4',
      title: 'JCB 3DX Backhoe Loader',
      location: 'Indore, Madhya Pradesh',
      price: '₹22,50,000',
      image:
        'https://images.unsplash.com/photo-1622219536464-5c9b9d92b327?auto=format&fit=crop&w=800&q=60',
      description: '2021 Model | 4WD | Diesel | 2500 Hours Used',
    },
    {
      id: '5',
      title: 'Concrete Mixer Machine',
      location: 'Delhi, India',
      price: '₹1,40,000',
      image:
        'https://images.unsplash.com/photo-1623933930819-4edc7dc87ad5?auto=format&fit=crop&w=800&q=60',
      description: 'Manual Operation | 2020 Model | Excellent Working',
    },
  ]);

  const renderMachine = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MachineDetail', { machine: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={machines}
        keyExtractor={item => item.id}
        renderItem={renderMachine}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default Machinery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#228B22',
    marginVertical: 3,
  },
  description: {
    fontSize: 13,
    color: '#777',
  },
});
