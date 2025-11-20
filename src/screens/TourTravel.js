import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const TourTravel = ({ navigation }) => {
  const [packages] = useState([
    {
      id: '1',
      title: 'Manali Honeymoon Package',
      location: 'Manali, Himachal Pradesh',
      price: '₹25,000 / Couple',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzNcYWYm3-Sz-uApI74gMODbPrdFjUvziL4g&s',
      description: '5 Nights / 6 Days | Hotel | Volvo | Sightseeing',
    },
    {
      id: '2',
      title: 'Goa Beach Holiday',
      location: 'Goa, India',
      price: '₹18,000 / Person',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-un5c95ywI8Pd5soYgPCFy6TPLF_mul4X_A&s',
      description: '3 Nights / 4 Days | Beach Resort | Activities Included',
    },
    {
      id: '3',
      title: 'Kashmir Paradise Tour',
      location: 'Srinagar, Jammu & Kashmir',
      price: '₹35,000 / Couple',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4SkSj9E9m-YB0R8THkA6jXAb-x23lQAa9Sw&s',
      description: '7 Nights | Houseboat Stay | Cab | Meals',
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PackageDetail', { package: item })}
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
        data={packages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default TourTravel;

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
