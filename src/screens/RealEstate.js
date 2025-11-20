// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';

// const RealEstate = ({ navigation }) => {
//   const [properties] = useState([
//     {
//       id: '1',
//       title: 'Modern Apartment in City Center',
//       location: 'Mumbai, Maharashtra',
//       price: '₹85,00,000',
//       image:
//         'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60',
//       description: '2 BHK | 1200 sq.ft | Furnished | Ready to move',
//     },
//     {
//       id: '2',
//       title: 'Luxury Villa with Sea View',
//       location: 'Goa, India',
//       price: '₹2.5 Cr',
//       image:
//         'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60',
//       description: '4 BHK | 3500 sq.ft | Private Pool | Gated Community',
//     },
//     {
//       id: '3',
//       title: 'Affordable 1BHK Flat',
//       location: 'Pune, Maharashtra',
//       price: '₹45,00,000',
//       image:
//         'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=60',
//       description: '1 BHK | 700 sq.ft | Semi-furnished | Near Metro',
//     },
//   ]);

//   const renderProperty = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('PropertyDetail', { property: item })}
//     >
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.location}>{item.location}</Text>
//         <Text style={styles.price}>{item.price}</Text>
//         <Text style={styles.description}>{item.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.header}>🏠 Real Estate Listings</Text> */}
//       <FlatList
//         data={properties}
//         keyExtractor={item => item.id}
//         renderItem={renderProperty}
//         contentContainerStyle={{ paddingBottom: 100 }}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default RealEstate;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     marginTop: 10,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#222',
//     marginVertical: 15,
//     textAlign: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   image: {
//     width: '100%',
//     height: 180,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
//   infoContainer: {
//     padding: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#333',
//   },
//   location: {
//     fontSize: 14,
//     color: '#666',
//     marginVertical: 2,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#2a9d8f',
//     marginVertical: 3,
//   },
//   description: {
//     fontSize: 13,
//     color: '#777',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilterModal from '../components/FilterModal'; // ✅ Custom modal import

const RealEstate = ({ navigation }) => {
  const [properties] = useState([
    {
      id: '1',
      title: 'Modern Apartment in City Center',
      location: 'Mumbai, Maharashtra',
      price: 8500000,
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60',
      description: '2 BHK | 1200 sq.ft | Furnished | Ready to move',
    },
    {
      id: '2',
      title: 'Luxury Villa  ',
      location: 'Goa, India',
      price: 25000000,
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60',
      description: '4 BHK | 3500 sq.ft | Private Pool | Gated Community',
    },
    {
      id: '3',
      title: 'Affordable 1BHK Flat',
      location: 'Pune, Maharashtra',
      price: 4500000,
      image:
        'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=800&q=60',
      description: '1 BHK | 700 sq.ft | Semi-furnished | Near Metro',
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(properties);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // 🔍 Apply filters from custom modal
  const applyFilters = filters => {
    let data = [...properties];

    if (filters.city) {
      data = data.filter(item =>
        item.location.toLowerCase().includes(filters.city.toLowerCase()),
      );
    }

    if (filters.productName) {
      data = data.filter(item =>
        item.title.toLowerCase().includes(filters.productName.toLowerCase()),
      );
    }

    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      data = data.filter(item => item.price >= min && item.price <= max);
    }

    setFilteredData(data);
  };

  const renderProperty = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PropertyDetail', { property: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Search bar + Filter button */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#555" />
        <TextInput
          placeholder="Search property..."
          placeholderTextColor={'#000'}
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            setFilteredData(
              properties.filter(item =>
                item.title.toLowerCase().includes(text.toLowerCase()),
              ),
            );
          }}
        />
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={22} color="#2a9d8f" />
        </TouchableOpacity>
      </View>

      {/* 🏠 Property List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderProperty}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
            No properties found
          </Text>
        }
      />

      {/* 🧩 Custom Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={applyFilters}
      />
    </View>
  );
};

export default RealEstate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 15,
    color: '#333',
    paddingVertical: 8,
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
    color: '#2a9d8f',
    marginVertical: 3,
  },
  description: {
    fontSize: 13,
    color: '#777',
  },
});
