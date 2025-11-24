import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MyReviewsScreen() {
  const { width } = useWindowDimensions();

  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const fontSize = width * 0.04;
  const iconSize = width * 0.065;

  const limitText = (text, limit = 15) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  const handleGetReviews = async () => {
    try {
      setLoading(true); // 👈 start loader

      const responseRating = await axios.get(
        `https://emonkey.in/emonkey_admin/api/AdminController/ratinglist`,
      );

      const formatted = responseRating?.data?.data?.map(item => {
        const date = new Date(item.create_date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        return {
          ...item,
          create_date: formattedDate,
          tittle:
            item.tittle?.length > 15
              ? item.tittle.substring(0, 15) + '...'
              : item.tittle,
        };
      });

      setReviews(formatted);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 👈 stop loader
    }
  };

  const handleAddReview = async () => {
    if (!newReview || rating === 0)
      return Alert.alert('Message', 'Review & Rating Reqired!');
    const userInfo = await AsyncStorage.getItem('userInfo');
    const userData = JSON.parse(userInfo);
    const userId = userData?.user_id;
    const payload = {
      user_id: userId,
      tittle: newReview,
      rating: rating,
    };
    console.log('payload', payload);

    try {
      const review = await axios.post(
        `https://emonkey.in/emonkey_admin/api/AdminController/createrating`,
        payload,
      );
      console.log('rating Response ', review?.data);
    } catch (error) {
      console.log(error);
    }

    // setReviews([...reviews, newItem]);
    setShowModal(false);
    setNewReview('');
    setRating(0);
  };

  useEffect(() => {
    handleGetReviews();
  }, [showModal]);

  const renderStars = (selectedRating, isEditable = false) => (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity
          key={star}
          disabled={!isEditable}
          onPress={() => isEditable && setRating(star)}
        >
          <Ionicons
            name={star <= selectedRating ? 'star' : 'star-outline'}
            size={width * 0.08}
            color="#FFD700"
            style={{ marginRight: 3 }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={[styles.card, { padding: width * 0.04 }]}>
      <View style={styles.row}>
        <Text style={[styles.title, { fontSize }]}>
          {limitText(item.tittle, 15)}
        </Text>

        <View style={styles.iconRow}>
          <TouchableOpacity>
            <Ionicons name="eye-outline" size={iconSize} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons name="create-outline" size={iconSize} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => setReviews(reviews.filter(a => a.id !== item.id))}
          >
            <Ionicons name="trash-outline" size={iconSize} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.date, { fontSize: width * 0.035 }]}>
        {item?.create_date}
      </Text>

      {renderStars(item.rating)}
    </View>
  );
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFF',
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.date}>Loading Reviews...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { fontSize: width * 0.06 }]}>
        My Reviews
      </Text>

      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Add Review Button */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={[styles.addBtn, { padding: width * 0.04 }]}
      >
        <Text style={[styles.addBtnText, { fontSize: width * 0.045 }]}>
          + Add Review
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              { width: width * 0.85, padding: width * 0.05 },
            ]}
          >
            <Text style={[styles.modalHeader, { fontSize: width * 0.05 }]}>
              Add Review
            </Text>

            <TextInput
              placeholder="Write your review..."
              style={[styles.input, { fontSize, padding: width * 0.03 }]}
              multiline
              value={newReview}
              onChangeText={setNewReview}
            />

            <Text style={{ marginTop: 10, fontSize }}>Your Rating:</Text>
            {renderStars(rating, true)}

            <TouchableOpacity
              style={[styles.saveBtn, { padding: width * 0.035 }]}
              onPress={handleAddReview}
            >
              <Text style={{ color: '#FFF', fontSize: width * 0.045 }}>
                Save Review
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelBtn, { padding: width * 0.035 }]}
              onPress={() => {
                setNewReview('');
                setRating(0);
                setShowModal(false);
              }}
            >
              <Text style={{ color: '#333', fontSize: width * 0.045 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: '5%',
  },
  header: {
    fontWeight: '700',
    fontSize: 16,
    marginVertical: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconRow: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },
  date: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  addBtn: {
    backgroundColor: '#007AFF',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  modalHeader: {
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    backgroundColor: '#FFF',
    minHeight: 80,
    textAlignVertical: 'top',
    marginTop: 10,
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
});
