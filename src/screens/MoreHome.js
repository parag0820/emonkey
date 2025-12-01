import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const categories = [
  {
    id: '1',
    title: 'Real Estate',
    description: 'Find properties for sale, rent, or lease near you.',
    icon: 'home-outline',
  },
  {
    id: '2',
    title: 'Auto Mobiles',
    description: 'Explore new and used cars, bikes, and vehicle accessories.',
    icon: 'car-sport-outline',
  },
  {
    id: '3',
    title: 'Machinery',
    description: 'Buy or sell industrial and agricultural machinery easily.',
    icon: 'cog-outline',
  },
  {
    id: '4',
    title: 'Electronics',
    description:
      'Shop for mobiles, laptops, and home appliances at best prices.',
    icon: 'tv-outline',
  },
  {
    id: '5',
    title: 'Tour & Travel',
    description: 'Plan holidays, book tickets, and explore destinations.',
    icon: 'airplane-outline',
  },
  {
    id: '6',
    title: 'Fashion',
    description: 'Discover the latest trends in clothing and accessories.',
    icon: 'shirt-outline',
  },
  {
    id: '7',
    title: 'Education',
    description:
      'Find schools, coaching centers, and online learning services.',
    icon: 'school-outline',
  },
];

const MoreHome = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.title)}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={28} color="#00695C" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Icon name="chevron-forward-outline" size={22} color="#aaa" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={28} color="#00695C" />
        </TouchableOpacity>
        <Text style={styles.header}>Explore More Categories</Text>
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MoreHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00695C',
    // marginBottom: 10,
    textAlign: 'center',
    marginLeft: 10,
    paddveringVertical: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 6,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#E0F2F1',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
});
