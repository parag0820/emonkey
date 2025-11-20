import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const AutoMobiles = ({ navigation }) => {
  const [vehicles] = useState([
    {
      id: '1',
      title: 'Hyundai Creta SX (O)',
      location: 'Mumbai, Maharashtra',
      price: '₹13,50,000',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl7z1BmG8xw6MEu45ybeXtZkolC-2035CHQQ&s',
      description: '2022 Model | Petrol | 15,000 km | Single Owner',
    },
    {
      id: '2',
      title: 'Royal Enfield Classic 350',
      location: 'Pune, Maharashtra',
      price: '₹1,85,000',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8HRn4NvRJwtFzlNAso4kuqjPxxOrpq2CGPQ&s',
      description: '2021 Model | 350cc | 8,000 km | Matte Black',
    },
    {
      id: '3',
      title: 'Toyota Innova Crysta ZX',
      location: 'Delhi, India',
      price: '₹21,00,000',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKKty4KXCFqpSdWIcsEdxOgsqR1CNk_Iu_og&s',
      description: '2023 Model | Diesel | 5,000 km | Company Warranty',
    },
    {
      id: '4',
      title: 'Honda City VX CVT',
      location: 'Bengaluru, Karnataka',
      price: '₹12,90,000',
      image:
        'https://images.unsplash.com/photo-1614200179399-0efb2b9e7c6e?auto=format&fit=crop&w=800&q=60',
      description: '2022 Model | Petrol | Automatic | Excellent Condition',
    },
  ]);

  const renderVehicle = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('VehicleDetail', { vehicle: item })}
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
        data={vehicles}
        keyExtractor={item => item.id}
        renderItem={renderVehicle}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AutoMobiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 15,
    textAlign: 'center',
  },
  card: {
    marginTop: 20,
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
    color: '#E67E22',
    marginVertical: 3,
  },
  description: {
    fontSize: 13,
    color: '#777',
  },
});
