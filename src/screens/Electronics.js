import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Electronics = ({ navigation }) => {
  const [products] = useState([
    {
      id: '1',
      title: 'Apple iPhone 14 Pro Max',
      location: 'Mumbai, Maharashtra',
      price: '₹1,25,000',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwTmOExqICuaUGNcECYZAshaIaf1kj9NL4g&s',
      description: '256GB | Deep Purple | 1 Year Warranty',
    },
    {
      id: '2',
      title: 'Samsung 65" QLED Smart TV',
      location: 'Pune, Maharashtra',
      price: '₹89,999',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqt4AZOhmmWGsQDa71qpygn9bunv16wuB5Vw&s',
      description: '4K UHD | Alexa Built-in | HDR10+ | 2023 Model',
    },
    {
      id: '3',
      title: 'Sony WH-1000XM5 Headphones',
      location: 'Delhi, India',
      price: '₹29,999',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRboPl-W3KypY_kmK3SH54MBy1euLFKU9ASqw&s',
      description: 'Noise Cancelling | 30 hrs Battery | Mic | Black',
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
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
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Electronics;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 15 },
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
  infoContainer: { padding: 10 },
  title: { fontSize: 16, fontWeight: '700', color: '#333' },
  location: { fontSize: 14, color: '#666', marginVertical: 2 },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E67E22',
    marginVertical: 3,
  },
  description: { fontSize: 13, color: '#777' },
});
