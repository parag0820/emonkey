import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import BASE_URL from '../api/BaseUrl';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');

export default function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [qty, setQty] = useState(1);
  const [productDetails, setProductDetails] = useState(null);

  const ItemDetails = route?.params?.product;

  // Convert HTML to plain text
  const stripHTML = html => html?.replace(/<[^>]+>/g, '') ?? '';

  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}productlistviewone/${ItemDetails?.id}`,
      );

      const data = response?.data?.data?.[0];
      console.log('Final API Product Details: ', data);

      setProductDetails(data);
    } catch (error) {
      console.log('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  if (!productDetails) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  // Map API → UI product
  const product = {
    name: productDetails.product_name,
    image: productDetails.main_image ?? productDetails.image,
    price: productDetails.price,
    discountPrice: productDetails.selling_price,
    description: stripHTML(productDetails.description),
    rating: 4.5,
    reviews: 112,
    specs: [
      { label: 'Feature Group', value: productDetails.Feature_group },
      { label: 'Feature Category', value: productDetails.Feature_category },
      {
        label: 'Feature Sub Category',
        value: productDetails.Feature_Sub_Category_Name,
      },
      { label: 'Value', value: productDetails.value },
      { label: 'Measure Group', value: productDetails.Measure_Group },
      { label: 'Measure Category', value: productDetails.Measure_Category },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeContainer}>
        <Ionicons name="heart-outline" size={24} color="#000" />
      </TouchableOpacity>

      {/* ---------------- BODY ---------------- */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.content}>
          {/* Product Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={20} color="#FFA500" />
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviews} reviews)
            </Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceRow}>
            <Text style={styles.discountPrice}>₹{product.discountPrice}</Text>
            <Text style={styles.originalPrice}>₹{product.price}</Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => qty > 1 && setQty(qty - 1)}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyNumber}>{qty}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(qty + 1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Specifications */}
          <Text style={styles.sectionTitle}>Specifications</Text>
          {product.specs.map((spec, index) => (
            <View key={index} style={styles.specRow}>
              <Text style={styles.specLabel}>{spec.label}</Text>
              <Text style={styles.specValue}>{spec.value}</Text>
            </View>
          ))}

          {/* Reviews */}
          <Text style={styles.sectionTitle}>Top Reviews</Text>

          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Ionicons name="person-circle" size={40} color="#888" />
              <View>
                <Text style={styles.reviewName}>John Doe</Text>
                <Text style={styles.reviewDate}>2 days ago</Text>
              </View>
            </View>

            <View style={styles.reviewStars}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={18}
                  color={i < 4 ? '#FFA500' : '#DDD'}
                />
              ))}
            </View>

            <Text style={styles.reviewText}>
              Amazing product! Good performance and excellent quality.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartBtn}>
          <Text style={styles.cartBtnText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyBtn}>
          <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  likeContainer: {
    padding: 10,
    alignSelf: 'flex-end',
  },

  productImage: {
    width: width,
    height: width * 0.9,
    resizeMode: 'cover',
  },

  content: {
    padding: 15,
  },

  title: {
    fontSize: width * 0.055,
    fontWeight: '700',
    marginBottom: 6,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  ratingText: {
    marginLeft: 6,
    fontSize: width * 0.04,
    color: '#666',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  discountPrice: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#E65100',
  },

  originalPrice: {
    marginLeft: 10,
    fontSize: width * 0.045,
    textDecorationLine: 'line-through',
    color: '#888',
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  qtyBtn: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyBtnText: {
    fontSize: 20,
    fontWeight: '800',
  },

  qtyNumber: {
    marginHorizontal: 15,
    fontSize: width * 0.05,
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },

  description: {
    fontSize: width * 0.038,
    color: '#555',
    lineHeight: 20,
  },

  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  specLabel: {
    fontSize: width * 0.04,
    color: '#777',
  },

  specValue: {
    fontSize: width * 0.04,
    fontWeight: '600',
  },

  reviewCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviewName: {
    fontSize: width * 0.045,
    fontWeight: '700',
  },

  reviewDate: {
    color: '#777',
    fontSize: width * 0.035,
  },

  reviewStars: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  reviewText: {
    fontSize: width * 0.04,
    color: '#444',
    marginTop: 3,
  },

  bottomBar: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  cartBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#FFB74D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  cartBtnText: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#fff',
  },

  buyBtn: {
    flex: 1,
    backgroundColor: '#E65100',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buyBtnText: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#fff',
  },
});
