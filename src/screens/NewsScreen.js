import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../components/CustomHeader';
import SideDrawerModal from '../modals/SideDrawerModal';
import { useFocusEffect } from '@react-navigation/native';

const NewsScreen = ({ navigation, setIsLoggedIn }) => {
  const { width, height } = useWindowDimensions();
  const [drawerVisible, setDrawerVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        // When navigating away (unfocused), close the drawer
        setDrawerVisible(false);
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
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
          style={[styles.searchInput, { fontSize: width * 0.035 }]}
        />
        <Icon name="search" size={width * 0.07} color="red" />
      </View>

      {/* CONTENT */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: height * 0.16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>News</Text>

        {/* Example News List */}
        <View style={styles.newsItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.newsHeading}>
              Why existing H-1B visa holders may be sitting on a goldmine
            </Text>
            <Text style={styles.newsDesc}>
              The fee hike sent H-1B holders into panic mode — until a quick
              clarification exempted existing visa holders.
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0caayB3TvDoC5xulZikt2xVSmCb68TYarGg&s',
            }}
            style={styles.newsImage}
          />
        </View>

        <View style={styles.newsItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.newsHeading}>
              ‘Bank accounts wiped out’: Karisma Kapoor’s kids make big claim
            </Text>
            <Text style={styles.newsDesc}>
              Priya Sachdev Kapur approached the Delhi High Court seeking to
              file details of her late husband’s assets.
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOO-mPX2F94OyWdYhxclN3HuPRK3K-sckhrw&s',
            }}
            style={styles.newsImage}
          />
        </View>

        {/* Technology Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Technology</Text>
          <Icon name="chevron-forward-outline" size={18} color="#000" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalCard}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1z5n4hwQHf_jgfIk4wbldKMipObhjwps5A&s',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>
              GST not reduced on your bill? File complaint
            </Text>
          </View>
          <View style={styles.horizontalCard}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfcR4umMyfFPiEfM7wq6hDzip0-QodzF0Y3Q&s',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>
              Top tech startups to watch in 2025
            </Text>
          </View>
        </ScrollView>
      </ScrollView>

      {/* FIXED JUSTDIAL SECTION */}
      <View style={styles.fixedBottom}>
        {/* <Text style={styles.bottomText}>List Your Business on Justdial</Text> */}
        {/* <Text style={styles.subText}>
          Reach millions of customers looking for your services
        </Text> */}
        <TouchableOpacity style={styles.listButton}>
          <Text style={styles.buttonText}>List Your Business Now</Text>
        </TouchableOpacity>
      </View>
      <SideDrawerModal
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  // placeholder: {
  //   color: '#666',
  //   fontSize: 14,
  // },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  newsItem: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    paddingBottom: 8,
  },
  newsHeading: {
    fontSize: 15,
    fontWeight: '600',
  },
  newsDesc: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
  newsImage: {
    width: 90,
    height: 70,
    borderRadius: 6,
    marginLeft: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  horizontalCard: {
    width: 130,
    margin: 10,
  },
  cardImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  cardText: {
    fontSize: 12,
    marginTop: 5,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fdebea',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  bottomText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subText: {
    fontSize: 13,
    color: '#555',
    marginVertical: 5,
  },
  listButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
