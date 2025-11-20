import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Education = ({ navigation }) => {
  const [courses] = useState([
    {
      id: '1',
      title: 'Full Stack Web Development',
      location: 'Online / Mumbai',
      price: '₹45,000',
      image:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=60',
      description: '6 Months | MERN Stack | Job Assistance',
    },
    {
      id: '2',
      title: 'Digital Marketing Certification',
      location: 'Pune, Maharashtra',
      price: '₹25,000',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60',
      description: '3 Months | SEO | Social Media | PPC',
    },
    {
      id: '3',
      title: 'Graphic Design Course',
      location: 'Delhi, India',
      price: '₹20,000',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60',
      description: 'Photoshop | Illustrator | Portfolio Project',
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CourseDetail', { course: item })}
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
        data={courses}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Education;

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
