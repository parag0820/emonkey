// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   useWindowDimensions,
//   TouchableOpacity,
//   Image,
// } from 'react-native';

// const data = [
//   {
//     id: '1',
//     name: 'John Doe',
//     date: '10 Oct 2025',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA_6IN3sV-_zIH1GvfCZGEYBqjckBL1eUYA&s',
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     date: '9 Oct 2025',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96vu0ZDuTYFtpdQNNT003zYWl5xd98Zkdew&s',
//   },
//   {
//     id: '3',
//     name: 'Mark Johnson',
//     date: '8 Oct 2025',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DDIcZ-_bvEw6cBpdBEVYnnhxDsyeKht6uw&s',
//   },
// ];

// const Listing = () => {
//   const { width } = useWindowDimensions();

//   // Responsive column layout
//   const numColumns = width > 700 ? 3 : width > 500 ? 2 : 1;
//   const cardWidth = width / numColumns - 20;

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
//       <Image
//         source={{ uri: item.image }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.date}>{item.date}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>📋 My Listings</Text>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         numColumns={numColumns}
//         key={numColumns} // ensures layout resets when columns change
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// export default Listing;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//     paddingHorizontal: 10,
//     paddingTop: 20,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   listContainer: {
//     justifyContent: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 10,
//     margin: 5,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   image: {
//     width: '100%',
//     height: 100,
//     borderRadius: 10,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 8,
//   },
//   date: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Listing = ({ navigation }) => {
  const Card = ({ title, icon, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={icon} size={28} color="#2C5EFF" style={styles.icon} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Card
          title="Company Information"
          icon="business-outline"
          onPress={() => navigation.navigate('CompanyInfo')}
        />
        <Card
          title="Location Information"
          icon="location-outline"
          onPress={() => navigation.navigate('LocationInfo')}
        />
        <Card
          title="Contact Information"
          icon="call-outline"
          onPress={() => navigation.navigate('ContactInfo')}
        />
        <Card
          title="Payment & Timing"
          icon="time-outline"
          onPress={() => navigation.navigate('PaymentTiming')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Business Keywords</Text>
        <Card
          title="Add Business Keywords"
          icon="add-circle-outline"
          onPress={() => navigation.navigate('AddKeywords')}
        />
        <Card
          title="View Business Keywords"
          icon="list-outline"
          onPress={() => navigation.navigate('ViewKeywords')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Media & Catalog</Text>
        <Card
          title="Business Images / Banner / Logo"
          icon="images-outline"
          onPress={() => navigation.navigate('Media')}
        />
        <Card
          title="Catalog Management"
          icon="albums-outline"
          onPress={() => navigation.navigate('Catalog')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Services & Requests</Text>
        <Card
          title="Request ECS / CCSI Service"
          icon="construct-outline"
          onPress={() => navigation.navigate('RequestService')}
        />
        <Card
          title="Online Request / Complaint"
          icon="chatbubbles-outline"
          onPress={() => navigation.navigate('Complaint')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    padding: width * 0.05,
    paddingBottom: 100,
  },

  subHeader: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 15,
    marginVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  icon: {
    marginRight: 15,
  },
  cardText: {
    fontSize: width * 0.04,
    color: '#333',
    fontWeight: '500',
  },
});

export default Listing;
