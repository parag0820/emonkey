import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../api/BaseUrl';

const MyBookingList = () => {
  const { width } = useWindowDimensions();
  const [bookingList, setBookingList] = useState([]);

  const myBooking = async () => {
    try {
      const userData = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userData);
      const userId = userInfo?.user_id;

      const response = await axios.get(`${BASE_URL}mybooking/${userId}`);
      console.log('response', response);

      setBookingList(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myBooking();
  }, []);

  const formatDate = date => {
    if (!date) return 'N/A';
    const [y, m, d] = date.split('-');
    return `${d}/${m}/${y}`;
  };

  const getStatusStyle = status => {
    if (status === 1) return styles.active;
    if (status === 0) return styles.inactive;
    return styles.pending;
  };

  const getStatusText = status => {
    if (status === 1) return 'Active';
    if (status === 0) return 'Deactive';
    return 'Pending';
  };

  const renderItem = ({ item }) => {
    const imageUrl =
      item?.main_image && item?.main_image !== ''
        ? item.main_image
        : 'https://via.placeholder.com/100';

    return (
      <View style={[styles.card, { width: width - 32 }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.date}>{formatDate(item?.created_date)}</Text>
          <Text style={[styles.status, getStatusStyle(item?.status)]}>
            {getStatusText(item?.status)}
          </Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Image source={{ uri: imageUrl }} style={styles.image} />

          <View style={styles.info}>
            <Text style={styles.title}>
              {item?.product_name ?? 'Product Name'}
            </Text>

            <Text style={styles.qty}>Qty: {item?.qty ?? 0}</Text>

            <Text style={styles.category}>
              Category:{' '}
              <Text style={styles.value}>{item?.categories ?? 'N/A'}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Bookings</Text>

      <FlatList
        data={bookingList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.empty}>No bookings found</Text>}
      />
    </View>
  );
};

export default MyBookingList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingTop: 12,
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 14,
    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  date: {
    fontSize: 13,
    color: '#777',
  },

  status: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  active: {
    backgroundColor: '#E6F6EC',
    color: '#1E8E3E',
  },

  inactive: {
    backgroundColor: '#FCE8E6',
    color: '#D93025',
  },

  pending: {
    backgroundColor: '#FFF4E5',
    color: '#F29900',
  },

  body: {
    flexDirection: 'row',
    marginTop: 12,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },

  qty: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },

  category: {
    fontSize: 13,
    color: '#666',
  },

  value: {
    fontWeight: '600',
    color: '#000',
  },

  empty: {
    marginTop: 80,
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});
