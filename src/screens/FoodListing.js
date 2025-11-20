import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';

const categories = [
  { id: '1', title: 'All', image: 'https://img.icons8.com/color/48/food.png' },
  {
    id: '2',
    title: 'Margherita',
    image: 'https://img.icons8.com/color/48/pizza.png',
  },
  { id: '3', title: 'Veg', image: 'https://img.icons8.com/color/48/salad.png' },
  {
    id: '4',
    title: 'Cheese',
    image: 'https://img.icons8.com/color/48/cheese.png',
  },
  {
    id: '5',
    title: 'Paneer',
    image: 'https://img.icons8.com/color/48/tofu.png',
  },
];

const filters = ['Sort', 'Newest', 'Offers', 'Ratings', 'Order Again'];

const dishes = [
  {
    id: '1',
    name: "RP'S VEG ZONE",
    desc: 'Vegetable salad',
    price: '₹400 for one',
    rating: '4.0',
    time: '20–25 min',
    distance: '3 km',
    discount: '60% OFF up to ₹120',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoyLYTffdcep-4nwYB-c4vl4mzITf39it4w&s',
  },
  {
    id: '2',
    name: 'Green Leaf Café',
    desc: 'Paneer Butter Masala',
    price: '₹350 for one',
    rating: '4.3',
    time: '25–30 min',
    distance: '2.5 km',
    discount: '50% OFF up to ₹100',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
  },
];

const FoodListing = () => {
  const [selectedTab, setSelectedTab] = useState('Dishes');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { width } = useWindowDimensions();

  const renderDish = ({ item }) => (
    <View style={[styles.card, { width: width * 0.9 }]}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.foodTitle}>{item.name}</Text>
        <Text style={styles.foodDesc}>{item.desc}</Text>
        <Text style={styles.foodPrice}>{item.price}</Text>
        <View style={styles.row}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating} ★</Text>
          </View>
          <Text style={styles.meta}>{item.time}</Text>
          <Text style={styles.meta}> • {item.distance}</Text>
        </View>
        <Text style={styles.discount}>{item.discount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} color="#666" />
        <TextInput
          placeholder="Search for dishes, restaurants..."
          style={styles.input}
        />
        <Icon name="mic-outline" size={20} color="#666" />
      </View>

      {/* 🧭 Tabs */}
      {/* <View style={styles.tabRow}>
        {['Dishes', 'Restaurant'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      {/* 🧩 Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
      >
        {filters.map(f => (
          <TouchableOpacity key={f} style={styles.filterBtn}>
            <Text style={styles.filterText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🍕 Category Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat.title)}
            style={[
              styles.categoryItem,
              selectedCategory === cat.title && styles.categoryActive,
            ]}
          >
            <Image source={{ uri: cat.image }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🍴 Food List */}
      <FlatList
        data={dishes}
        keyExtractor={item => item.id}
        renderItem={renderDish}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default FoodListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    marginTop: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#E91E63',
    borderBottomWidth: 2,
    borderBottomColor: '#E91E63',
    paddingBottom: 3,
  },
  filterRow: {
    marginTop: 12,
    marginHorizontal: 10,
    width: '100%',
    height: 50,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  filterText: {
    fontSize: 13,
    color: '#333',
  },
  categoryScroll: {
    // marginTop: 15,
    marginLeft: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  categoryText: {
    fontSize: 13,
    marginTop: 4,
    color: '#333',
  },
  categoryActive: {
    borderBottomWidth: 2,
    borderColor: '#E91E63',
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  foodImage: {
    width: '100%',
    height: 150,
  },
  cardInfo: {
    padding: 12,
  },
  foodTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  foodDesc: {
    color: '#555',
    marginTop: 2,
  },
  foodPrice: {
    marginTop: 4,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
  },
  meta: {
    fontSize: 12,
    color: '#777',
  },
  discount: {
    color: '#0066CC',
    marginTop: 6,
    fontSize: 13,
    fontWeight: '500',
  },
});
