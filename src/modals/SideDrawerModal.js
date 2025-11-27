import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Edit from 'react-native-vector-icons/Foundation';

const SideDrawerModal = ({ setIsLoggedIn, visible, onClose }) => {
  const slideAnim = useRef(
    new Animated.Value(-Dimensions.get('window').width),
  ).current;
  const { width } = Dimensions.get('window');

  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('isLoggedIn');
            onClose(); // close drawer first
            setIsLoggedIn(false); // trigger root navigation to Auth/Login

            // if you want extra safety:
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }], // must match your Auth/Login stack name
            });
          } catch (error) {
            console.log('Logout error:', error);
          }
        },
      },
    ]);
  };

  if (!visible) return null; // don't render when closed

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        {/* Drawer itself */}
        <Animated.View
          style={[
            styles.drawer,
            { width: width * 0.85, transform: [{ translateX: slideAnim }] },
          ]}
        >
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Icon name="close" size={30} color="#000" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
              <View style={styles.avatar} />
              <Image
                style={{
                  width: 70,
                  height: 70,
                  // borderRadius: 35,
                  // marginRight: 15,
                }}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExZl9Pz1zMxXF9d_aXJiLc4y_zyzjw9D-8MLXB-WG8CQveUuq8F-xO-1-p7CqkzwaRbQ&usqp=CAU',
                }}
              />
              <View>
                <Text style={styles.name}>Login</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.number}>User</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MyProfile');
                    }}
                  >
                    <Edit name="pencil" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Quick Buttons */}
            <View style={styles.quickRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Favourites');
                }}
                style={styles.card}
              >
                <Icon name="heart-outline" size={22} color="#000" />
                <Text style={styles.cardText}>Favourites</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Transactions');
                }}
                style={styles.card}
              >
                <Icon name="hand-left-outline" size={22} color="#000" />
                <Text style={styles.cardText}>Transactions</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.quickRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RateUs');
                }}
                style={styles.card}
              >
                <Icon name="star-outline" size={22} color="#000" />
                <Text style={styles.cardText}>Reviews</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('HelpSupport');
                }}
                style={styles.card}
              >
                <Icon name="chatbubble-outline" size={22} color="#000" />
                <Text style={styles.cardText}>Help</Text>
              </TouchableOpacity>
            </View>

            {/* Settings Section */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Settings');
              }}
              style={styles.row}
            >
              <Icon name="settings-outline" size={24} color="#000" />
              <Text style={styles.rowText}>Settings</Text>
            </TouchableOpacity>

            <Text style={styles.sectionLabel}>More Information</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PrivacyPolicy');
              }}
              style={styles.row}
            >
              <Icon name="document-text-outline" size={24} color="#000" />
              <Text style={styles.rowText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Listing');
              }}
              style={styles.row}
            >
              <Icon name="document-outline" size={24} color="#000" />
              <Text style={styles.rowText}>Listing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Terms');
              }}
              style={styles.row}
            >
              <Icon name="document-outline" size={24} color="#000" />
              <Text style={styles.rowText}>Terms of Use</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AboutUs');
              }}
              style={styles.row}
            >
              <Icon name="information-circle-outline" size={24} color="#000" />
              <Text style={styles.rowText}>About Us</Text>
            </TouchableOpacity>

            {/* <View style={styles.row}></View> */}
            <Text style={styles.sectionLabel}>Other</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Subscription');
              }}
              style={styles.row}
            >
              <Icon name="diamond-outline" size={24} color="#000" />
              <Text style={styles.rowText}>Subscription Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Careers');
              }}
              style={styles.row}
            >
              <Icon name="briefcase-outline" size={22} color="#000" />
              <Text style={styles.rowText}>Careers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutRow}>
              <Icon name="power-outline" size={26} color="#000" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SideDrawerModal;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', // dark transparent background
    zIndex: 100,
    elevation: 5,
    flexDirection: 'row',
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  closeBtn: {
    alignSelf: 'flex-start',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    // width: 70,
    // height: 70,
    borderRadius: 35,
    // backgroundColor: '#f9a825',
    // marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  number: {
    color: '#555',
    marginVertical: 3,
    marginRight: 8,
  },
  viewActivity: {
    textDecorationLine: 'underline',
    color: '#000',
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '47%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingLeft: 5,
  },
  cardText: {
    paddingLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 0.8,
    borderColor: '#ddd',
  },
  rowText: {
    fontSize: 14,
    marginLeft: 12,
  },
  sectionLabel: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 13,
    color: '#777',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingBottom: 40,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
