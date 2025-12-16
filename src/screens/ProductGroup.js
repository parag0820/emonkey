import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import FilterModal from '../components/FilterModal';
import { useRoute } from '@react-navigation/native';
import BASE_URL from '../api/BaseUrl';
import Loader from '../components/Loader';

const ProductGroup = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { categoryId } = route?.params;
  console.log('products', products);

  // ✅ Fetch Products from API
  const getProducts = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}productlistbyid/${categoryId}`);
      const apiData = res?.data?.data || [];

      // Remove HTML tags from description
      const cleanData = apiData?.map(item => ({
        ...item,
        description: item?.description.replace(/<[^>]*>?/gm, ''),
      }));

      setProducts(cleanData);
      setFilteredData(cleanData);
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // 🔍 Search products
  const handleSearch = text => {
    setSearchText(text);

    const query = text.toLowerCase();

    setFilteredData(
      products.filter(item => {
        const nameMatch = item?.product_name.toLowerCase().includes(query);
        const categoryMatch = item?.category_name.toLowerCase().includes(query);
        const priceMatch = String(item?.price).toLowerCase().includes(query);

        return nameMatch || categoryMatch || priceMatch;
      }),
    );
  };

  // 🧩 Apply Filters from Modal
  const applyFilters = filters => {
    let data = [...products];

    if (filters.productName) {
      data = data.filter(item =>
        item?.product_name
          .toLowerCase()
          .includes(filters?.productName.toLowerCase()),
      );
    }

    setFilteredData(data);
  };

  // ⭐ Render card
  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item?.main_image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item?.product_name}</Text>
        <Text style={styles.description}>{item?.description}</Text>
      </View>
    </TouchableOpacity>
  );
  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {/* 🔍 Search + Filter Row */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#555" />
        <TextInput
          placeholder="Search product..."
          placeholderTextColor="#777"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={22} color="#2a9d8f" />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>
            No products found
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

export default ProductGroup;

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
  description: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
});
