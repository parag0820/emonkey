import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const notifications = [
  {
    id: '1',
    title: 'Order Confirmed',
    message: 'Your order #12345 has been confirmed.',
    time: '2 hours ago',
  },
  {
    id: '2',
    title: 'New Offer',
    message: 'Get 20% off on your next purchase!',
    time: '1 day ago',
  },
  {
    id: '3',
    title: 'Payment Successful',
    message: 'You have successfully paid ₹299.',
    time: '3 days ago',
  },
  {
    id: '4',
    title: 'Account Updated',
    message: 'Your profile information has been updated.',
    time: '1 week ago',
  },
];

const Notification = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isTablet = width > 768;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: isTablet ? width * 0.6 : width * 0.9,
          paddingVertical: isTablet ? 20 : 12,
        },
      ]}
    >
      <Text style={[styles.title, { fontSize: isTablet ? 20 : 16 }]}>
        {item.title}
      </Text>
      <Text style={[styles.message, { fontSize: isTablet ? 16 : 13 }]}>
        {item.message}
      </Text>
      <Text style={[styles.time, { fontSize: isTablet ? 14 : 12 }]}>
        {item.time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingHorizontal: isTablet ? 40 : 16 }]}>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={28} color="#00695C" />
        </TouchableOpacity>
        <Text style={[styles.header, { fontSize: isTablet ? 28 : 20 }]}>
          Notifications
        </Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingTop: 20,
  },
  header: {
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontWeight: '600',
    color: '#000',
  },
  message: {
    color: '#555',
    marginTop: 4,
    lineHeight: 20,
  },
  time: {
    color: '#888',
    marginTop: 6,
    textAlign: 'right',
  },
});

export default Notification;
