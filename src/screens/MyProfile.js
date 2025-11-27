import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import { useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfile = () => {
  const navigation = useNavigation();
  const [saved, setSaved] = useState(false);
  const [visibleChange, setVisibleChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingChange, setLoadingChange] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    profilePic: '',
  });

  const [addresses, setAddresses] = useState([]);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');

    const userData = JSON.parse(userInfo);
    const userId = userData?.user_id;
    console.log('userInfo', userId);

    try {
      const res = await axios.get(
        `https://emonkey.in/emonkey_admin/api/AdminController/editprofileapi/${userId}`,
      );

      console.log('res', res?.data);

      if (res.data.success && res.data.data.length > 0) {
        const u = res.data.data[0];

        // Set user details
        setUser({
          name: u.name,
          email: u.email,
          phone: u.phone_number,
          profilePic: u.profile_image,
        });

        // Set addresses
        setAddresses([
          { id: 1, type: 'Home', address: u.home_address },
          { id: 2, type: 'Office', address: u.office_address },
        ]);

        // Set family/friends
        setFriends([{ id: 1, name: u.relation_name, relation: u.relation }]);
      }
    } catch (error) {
      console.log('Profile Fetch Error:', error);
    }
  };

  // permission Runtime

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestGalleryPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        let granted;

        if (Platform.Version >= 33) {
          // ANDROID 13+ uses new media permissions
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          );
        } else {
          // Android 12 and below
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
        }

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }

      return true; // iOS auto-allowed
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // add select image handler
  const handleSelectImage = () => {
    Alert.alert('Select Image', 'Choose image source', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = async () => {
    const permission = await requestCameraPermission();
    if (!permission) {
      Alert.alert('Permission Denied', 'Camera permission is required.');
      return;
    }

    const options = { mediaType: 'photo', saveToPhotos: true };

    launchCamera(options, response => {
      if (response.assets) {
        setUser(prev => ({ ...prev, profilePic: response.assets[0].uri }));
      }
    });
  };

  const openGallery = async () => {
    const permission = await requestGalleryPermission();

    if (!permission) {
      Alert.alert(
        'Storage Permission Required',
        'Please allow storage permission to select images.',
      );
      return;
    }

    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets) {
        setUser(prev => ({ ...prev, profilePic: response.assets[0].uri }));
      }
    });
  };

  const handleSaveProfile = async () => {
    try {
      setEditMode(false);
      setSaved(true);

      // Get user from AsyncStorage
      const userInfo = await AsyncStorage.getItem('userInfo');
      const userData = JSON.parse(userInfo);
      const userId = userData?.user_id;

      console.log('Stored User ID:', userId);

      // ------------------------------
      // CREATE FORMDATA
      // ------------------------------
      const formData = new FormData();

      formData.append('id', userId); // Always use API user_id
      formData.append('name', user.name);
      formData.append('phone_number', user.phone);
      formData.append('email', user.email);
      formData.append('home_address', addresses[0]?.address || '');
      formData.append('office_address', addresses[1]?.address || '');
      formData.append('relation', friends[0]?.relation || '');
      formData.append('relation_name', friends[0]?.name || '');

      // IMAGE HANDLING
      if (user.profilePic?.startsWith('http')) {
        // Existing image URL (no upload)
        formData.append('profile_image', user.profilePic);
      } else {
        // New file selected by user
        formData.append('profile_image', {
          uri: user.profilePic,
          type: 'image/jpeg',
          name: 'profile.jpg',
        });
      }

      // ------------------------------
      // API CALL
      // ------------------------------
      const res = await axios.post(
        'https://emonkey.in/emonkey_admin/api/AdminController/changeprofile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Update Response:', res.data);
      Alert.alert('Profile Updated!');
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.log('Update Error:', error);
      setSaved(false);
    }
  };

  const handleUpdate = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const userInfo = await AsyncStorage.getItem('userInfo');
    const userData = JSON.parse(userInfo);
    const userId = userData?.user_id;

    const payload = {
      id: userId,
      old_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };

    const response = await axios.post(
      `https://emonkey.in/emonkey_admin/api/AdminController/change_password`,
      payload,
    );
    setConfirmPassword('');
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => {
      setLoadingChange(false);
      setVisibleChange(false);
      Alert.alert(response?.data?.message);
    }, 1500);
  };

  const handleAddressChange = (id, key, value) => {
    setAddresses(prev =>
      prev.map(addr => (addr.id === id ? { ...addr, [key]: value } : addr)),
    );
  };

  const handleFriendChange = (id, key, value) => {
    setFriends(prev =>
      prev.map(friend =>
        friend.id === id ? { ...friend, [key]: value } : friend,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleSelectImage}>
            <Image
              source={{ uri: user.profilePic }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <TouchableOpacity onPress={() => setVisibleChange(true)}>
            <Text style={styles.change}>Change Password ⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <TouchableOpacity
              onPress={() =>
                editMode ? handleSaveProfile() : setEditMode(true)
              }
            >
              <Ionicons
                name={editMode ? 'checkmark-done-outline' : 'pencil-outline'}
                size={22}
                color={editMode ? '#28A745' : '#333'}
              />
            </TouchableOpacity>
          </View>

          {/* Editable Fields */}
          <View style={styles.infoBox}>
            <Text style={styles.label}>Full Name</Text>
            {editMode ? (
              <TextInput
                value={user.name}
                style={styles.input}
                onChangeText={text => setUser({ ...user, name: text })}
                placeholder="Enter full name"
              />
            ) : (
              <Text style={styles.value}>{user.name}</Text>
            )}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Email</Text>
            {editMode ? (
              <TextInput
                value={user.email}
                style={styles.input}
                onChangeText={text => setUser({ ...user, email: text })}
                placeholder="Enter email"
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.value}>{user.email}</Text>
            )}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Phone</Text>
            {editMode ? (
              <TextInput
                value={user.phone}
                style={styles.input}
                onChangeText={text => setUser({ ...user, phone: text })}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{user.phone}</Text>
            )}
          </View>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Address Details</Text>
          </View>

          {addresses.map(addr => (
            <View key={addr.id} style={styles.infoBox}>
              <Text style={styles.label}>{addr.type} Address</Text>
              {editMode ? (
                <TextInput
                  value={addr.address}
                  style={styles.input}
                  onChangeText={text =>
                    handleAddressChange(addr.id, 'address', text)
                  }
                  placeholder={`Enter ${addr.type} address`}
                />
              ) : (
                <Text style={styles.value}>{addr.address}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Friends & Family Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friends & Family</Text>
          </View>

          {friends.map(friend => (
            <View key={friend.id} style={styles.infoBox}>
              <Text style={styles.label}>Relation</Text>
              {editMode ? (
                <TextInput
                  value={friend.relation}
                  style={styles.input}
                  onChangeText={text =>
                    handleFriendChange(friend.id, 'relation', text)
                  }
                  placeholder="Enter relation"
                />
              ) : (
                <Text style={styles.value}>{friend.relation}</Text>
              )}
              <Text style={styles.label}>Name</Text>
              {editMode ? (
                <TextInput
                  value={friend.name}
                  style={styles.input}
                  onChangeText={text =>
                    handleFriendChange(friend.id, 'name', text)
                  }
                  placeholder="Enter name"
                />
              ) : (
                <Text style={styles.value}>{friend.name}</Text>
              )}
            </View>
          ))}
        </View>

        <CustomButton
          title={editMode ? 'Save Changes' : 'Save'}
          loading={saved}
          onPress={handleSaveProfile}
        />

        {/* Change Password Modal */}
        <ChangePasswordModal
          visible={visibleChange}
          onClose={() => setVisibleChange(false)}
          onUpdate={handleUpdate}
          currentPassword={currentPassword}
          newPassword={newPassword}
          setCurrentPassword={setCurrentPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          loading={loadingChange}
        />
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoBox: {
    marginBottom: 12,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 15,
    color: '#222',
  },
});
