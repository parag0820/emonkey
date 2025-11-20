import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ onAvatarPress, onNotificationPress }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.header, { paddingHorizontal: width * 0.04 }]}>
      {/* Left - Avatar */}
      <TouchableOpacity onPress={onAvatarPress}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExZl9Pz1zMxXF9d_aXJiLc4y_zyzjw9D-8MLXB-WG8CQveUuq8F-xO-1-p7CqkzwaRbQ&usqp=CAU',
          }}
          style={[
            styles.avatar,
            {
              width: width * 0.1,
              height: width * 0.1,
              borderRadius: width * 0.05,
            },
          ]}
        />
      </TouchableOpacity>

      {/* Center - Logo Text */}
      <Text style={[styles.logo, { fontSize: width * 0.05 }]}>E Monkey</Text>

      {/* Right - Notification Icon */}
      <TouchableOpacity onPress={onNotificationPress}>
        <Icon name="notifications-outline" size={width * 0.07} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#075e54',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 10,
  },
  avatar: {
    borderRadius: 50,
  },
  logo: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
