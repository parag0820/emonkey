import axios from 'axios';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BASE_URL from '../api/BaseUrl';
import { useEffect, useState } from 'react';

// FORMAT DATE → TIME AGO
const formatTimeAgo = dateString => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return 'Yesterday';
  if (days <= 7) return `${days} days ago`;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Notification = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [allNotifications, setAllNotifications] = useState([]);
  const isTablet = width > 768;

  const getNotifications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}notificationlist`);

      const sorted = response?.data?.data?.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date),
      );

      setAllNotifications(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

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
        {item.tittle}
      </Text>

      <Text style={[styles.message, { fontSize: isTablet ? 16 : 13 }]}>
        {item.description}
      </Text>

      <Text style={[styles.time, { fontSize: isTablet ? 14 : 12 }]}>
        {formatTimeAgo(item.created_date)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingHorizontal: isTablet ? 40 : 16 }]}>
      <View style={{ flexDirection: 'row' }}>
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
        data={allNotifications}
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
  },
  time: {
    color: '#888',
    marginTop: 6,
    textAlign: 'right',
  },
});

export default Notification;
