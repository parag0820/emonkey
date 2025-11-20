import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Fashion = ({ navigation }) => {
  const [items] = useState([
    {
      id: '1',
      title: 'Zara Women Floral Dress',
      location: 'Mumbai, Maharashtra',
      price: '₹2,499',
      image:
        'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=60',
      description: 'Summer Collection | Medium | Light Fabric',
    },
    {
      id: '2',
      title: 'Men’s Formal Suit',
      location: 'Delhi, India',
      price: '₹6,999',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThBmpRl7rOHIiTwJI_eBDrrIfVmrfb2vY_GA&s',
      description: 'Slim Fit | Navy Blue | 3-Piece Set',
    },
    {
      id: '3',
      title: 'Nike Air Force 1',
      location: 'Pune, Maharashtra',
      price: '₹8,499',
      image:
        'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=60',
      description: 'White | Unisex | 2023 Edition',
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FashionDetail', { item })}
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
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Fashion;

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
