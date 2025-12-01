import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import SideDrawerModal from '../modals/SideDrawerModal';
import CustomHeader from '../components/CustomHeader';
import BASE_URL from '../api/BaseUrl';
import Loader from '../components/Loader';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = ({ navigation, setIsLoggedIn }) => {
  const { width, height } = useWindowDimensions();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}productgrouplist`);
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCategories();
      return () => {
        // When navigating away (unfocused), close the drawer

        setDrawerVisible(false);
      };
    }, []),
  );

  const trending = [
    {
      name: 'Appliance Repair',
      image: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZye1zzi-zl_LpvUpnKcLGX_swWt8aVmC1GQ&s',
      },
    },
  ];
  // Your offers array
  const offers = [
    {
      id: 1,
      title: '30% Off',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm4WtPXzSlZKnJZ98_UvPdUodTIbvVPBps7g&s',
    },
    {
      id: 2,
      title: '15% Off ',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTegocygWs8DAc9brieAgzi2noxTE2M3M4T3g&s',
    },
    {
      id: 3,
      title: 'Buy 1 Get 1 Free',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ExyaqdV3LyxL0GDtf4B0jxGYB5k00lG03g&s',
    },
    {
      id: 4,
      title: '20% Off ',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROSrsfvEWYyLyGHbV7l-l8DMg-7U-I1rBRjQ&s',
    },
  ];

  const moreItem = categories.find(item => item.Group_Name === 'More');

  const others = categories.filter(item => item.Group_Name !== 'More');

  const displayCategories = moreItem
    ? [...others.slice(0, 7), moreItem] // 7 items + More
    : others.slice(0, 8); // if API doesn't send More

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader
        onAvatarPress={() => setDrawerVisible(true)}
        onNotificationPress={() => navigation.navigate('Notification')}
      />

      {/* Search */}
      <View
        style={[styles.searchContainer, { marginHorizontal: width * 0.05 }]}
      >
        <TextInput
          placeholder="Search for business ,services ,products..."
          placeholderTextColor={'gray'}
          style={[styles.searchInput, { fontSize: width * 0.032 }]}
        />
        <Icon name="search" size={width * 0.07} color="red" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.categoryRow}>
          <>
            {displayCategories.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[styles.categoryItem, { width: width * 0.22 }]}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.Group_Name.trim() === 'More') {
                    navigation.navigate('MoreHome');
                  } else {
                    navigation.navigate('ProductGroup', {
                      categoryId: item.id,
                    });
                  }
                }}
              >
                <Image
                  source={{
                    uri: item?.images || 'https://via.placeholder.com/80',
                  }}
                  style={{ width: 40, height: 40, borderRadius: 10 }}
                  resizeMode="contain"
                />

                <Text
                  style={[styles.categoryText, { fontSize: width * 0.03 }]}
                  numberOfLines={2}
                >
                  {item.Group_Name}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        </View>

        {/* Trending Services */}
        <Text style={[styles.sectionTitle, { fontSize: width * 0.045 }]}>
          Trending Services near you
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trending.map((service, index) => (
            <ImageBackground
              key={index}
              source={service.image}
              style={[
                styles.serviceCard,
                { width: width * 0.4, height: height * 0.18 },
              ]}
              imageStyle={{ borderRadius: 10 }}
            >
              <Text style={[styles.serviceText, { fontSize: width * 0.04 }]}>
                {service.name}
              </Text>
            </ImageBackground>
          ))}
        </ScrollView>

        {/* Special Deals */}
        <Text style={[styles.sectionTitle, { fontSize: width * 0.045 }]}>
          Special Deals & Offers
        </Text>
        <View style={styles.dealRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {offers.map(item => (
              <TouchableOpacity key={item.id}>
                {/* ✅ Move key here */}
                <ImageBackground
                  source={{ uri: item.image }}
                  style={[
                    styles.dealCard,
                    { width: width * 0.28, height: height * 0.18 },
                  ]}
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View style={styles.overlay}>
                    <Text
                      style={[styles.dealText, { fontSize: width * 0.035 }]}
                    >
                      {item.title}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <SideDrawerModal
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
  },
  avatar: { borderRadius: 50 },
  logo: { fontSize: 20, fontWeight: 'bold' },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: { flex: 1, padding: 10 },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  categoryItem: {
    alignItems: 'center',
    marginVertical: 10,
  },
  categoryText: { textAlign: 'center', color: '#000', fontWeight: '400' },
  sectionTitle: { margin: 15, fontWeight: 'bold', alignItems: 'center' },
  serviceCard: {
    backgroundColor: '#ddd',
    marginHorizontal: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 12,
  },
  serviceText: { fontWeight: 'bold', fontSize: 12, color: '#fff' },
  dealRow: { flexDirection: 'row', justifyContent: 'space-evenly' },
  dealCard: {
    backgroundColor: '#eee',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  dealText: { fontWeight: '600', fontSize: 14, color: '#fff' },

  // special styles for overlay
  scrollContainer: {
    paddingHorizontal: 10,
  },
  dealCard: {
    marginRight: 10,
    justifyContent: 'flex-end',
    borderRadius: 12,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  dealText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
