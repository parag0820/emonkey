import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import BASE_URL from '../api/BaseUrl';

const Subscription = () => {
  const { width } = useWindowDimensions();
  const [subPlans, setPlans] = useState([]);
  const isTablet = width > 768;

  const SubscriptinPlans = async () => {
    try {
      const planResponse = await axios.get(`${BASE_URL}membershiplist`);
      setPlans(planResponse?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    SubscriptinPlans();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingHorizontal: isTablet ? 40 : 20 },
      ]}
    >
      <Text style={[styles.title, { fontSize: isTablet ? 28 : 22 }]}>
        Choose Your Subscription
      </Text>

      {subPlans.map(plan => (
        <View
          key={plan.id}
          style={[
            styles.card,
            {
              width: isTablet ? '70%' : '90%',
              padding: isTablet ? 25 : 15,
            },
          ]}
        >
          <Text style={[styles.planName, { fontSize: isTablet ? 22 : 18 }]}>
            {plan?.plan_name}
          </Text>

          <Text style={[styles.price, { fontSize: isTablet ? 20 : 16 }]}>
            {plan?.duration}
          </Text>

          <Text style={[styles.feature, { fontSize: isTablet ? 16 : 14 }]}>
            {plan.description}
          </Text>

          <Text style={[styles.price, { fontSize: isTablet ? 20 : 16 }]}>
            ₹{plan?.price}
          </Text>

          <TouchableOpacity
            style={[styles.button, { paddingVertical: isTablet ? 14 : 10 }]}
          >
            <Text style={[styles.buttonText, { fontSize: isTablet ? 18 : 15 }]}>
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f6fa',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  planName: {
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    color: '#555',
    marginVertical: 5,
  },
  feature: {
    color: '#666',
    marginVertical: 2,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Subscription;
