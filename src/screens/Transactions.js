import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

const transactionsData = [
  {
    id: '1',
    date: '2025-10-10',
    description: 'Payment received',
    amount: '+ ₹1,200',
    status: 'Success',
  },
  {
    id: '2',
    date: '2025-10-09',
    description: 'Doctor consultation',
    amount: '- ₹500',
    status: 'Completed',
  },
  {
    id: '3',
    date: '2025-10-08',
    description: 'Wallet recharge',
    amount: '+ ₹1,000',
    status: 'Success',
  },
  {
    id: '4',
    date: '2025-10-06',
    description: 'Subscription plan',
    amount: '- ₹299',
    status: 'Completed',
  },
  {
    id: '5',
    date: '2025-10-08',
    description: 'Wallet recharge',
    amount: '+ ₹1,000',
    status: 'Success',
  },
  {
    id: '6',
    date: '2025-10-06',
    description: 'Subscription plan',
    amount: '- ₹299',
    status: 'Completed',
  },
];

const Transactions = () => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const renderItem = ({ item }) => (
    <View style={[styles.card, { padding: isTablet ? 20 : 12 }]}>
      <View style={styles.row}>
        <Text style={[styles.date, { fontSize: isTablet ? 16 : 13 }]}>
          {item.date}
        </Text>
        <Text
          style={[
            styles.amount,
            {
              color: item.amount.startsWith('+') ? '#1E7A1E' : '#C62828',
              fontSize: isTablet ? 18 : 15,
            },
          ]}
        >
          {item.amount}
        </Text>
      </View>
      <Text style={[styles.desc, { fontSize: isTablet ? 17 : 14 }]}>
        {item.description}
      </Text>
      <Text style={[styles.status, { fontSize: isTablet ? 15 : 12 }]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingHorizontal: isTablet ? 40 : 16 }]}>
      {/* <Text style={[styles.title, { fontSize: isTablet ? 28 : 22 }]}>
        Transactions
      </Text> */}

      <FlatList
        data={transactionsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      />

      {/* <TouchableOpacity
        style={[styles.button, { paddingVertical: isTablet ? 14 : 10 }]}
      >
        <Text style={[styles.buttonText, { fontSize: isTablet ? 18 : 15 }]}>
          Download Statement
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: 20,
  },
  title: {
    fontWeight: '700',
    color: '#222',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: '#666',
  },
  desc: {
    color: '#333',
    marginTop: 6,
  },
  amount: {
    fontWeight: 'bold',
  },
  status: {
    marginTop: 4,
    color: '#00796B',
  },
  button: {
    backgroundColor: '#007BFF',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 15,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Transactions;
