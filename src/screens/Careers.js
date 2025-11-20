import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Careers = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('IT & Software');

  // Category list
  const jobCategories = [
    { id: '1', title: 'IT & Software', icon: 'laptop-outline' },
    { id: '2', title: 'Healthcare', icon: 'medkit-outline' },
    { id: '3', title: 'Finance', icon: 'cash-outline' },
    { id: '4', title: 'Education', icon: 'school-outline' },
  ];

  // Job data mapped by category
  const jobsByCategory = {
    'IT & Software': [
      {
        id: 'it1',
        title: 'React Native Developer',
        company: 'Tech Mind Pvt Ltd',
        location: 'Mumbai, India',
        salary: '₹4 LPA - ₹8 LPA',
      },
      {
        id: 'it2',
        title: 'Backend Engineer (Node.js)',
        company: 'NextCode Solutions',
        location: 'Bangalore, India',
        salary: '₹6 LPA - ₹12 LPA',
      },
    ],
    Healthcare: [
      {
        id: 'hc1',
        title: 'Nurse Staff',
        company: 'Apollo Hospital',
        location: 'Delhi, India',
        salary: '₹3 LPA - ₹6 LPA',
      },
      {
        id: 'hc2',
        title: 'Medical Officer',
        company: 'Fortis Healthcare',
        location: 'Pune, India',
        salary: '₹5 LPA - ₹9 LPA',
      },
    ],
    Finance: [
      {
        id: 'fn1',
        title: 'Account Executive',
        company: 'Indus Corp',
        location: 'Pune, India',
        salary: '₹3 LPA - ₹5 LPA',
      },
      {
        id: 'fn2',
        title: 'Financial Analyst',
        company: 'WealthGrow Advisors',
        location: 'Mumbai, India',
        salary: '₹5 LPA - ₹8 LPA',
      },
    ],
    Education: [
      {
        id: 'ed1',
        title: 'Mathematics Lecturer',
        company: 'Bright Minds Academy',
        location: 'Jaipur, India',
        salary: '₹4 LPA - ₹7 LPA',
      },
      {
        id: 'ed2',
        title: 'School Principal',
        company: 'Harmony Public School',
        location: 'Ahmedabad, India',
        salary: '₹8 LPA - ₹12 LPA',
      },
    ],
  };

  const renderCategory = ({ item }) => {
    const isActive = selectedCategory === item.title;
    return (
      <TouchableOpacity
        style={[styles.categoryBox, isActive && styles.activeCategoryBox]}
        onPress={() => setSelectedCategory(item.title)}
      >
        <Ionicons
          name={item.icon}
          size={22}
          color={isActive ? '#fff' : '#2563EB'}
        />
        <Text
          style={[styles.categoryText, isActive && styles.activeCategoryText]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderJob = ({ item }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => navigation.navigate('JobDetailScreen', { job: item })}
    >
      <View style={styles.jobHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Ionicons name="chevron-forward-outline" size={18} color="#6B7280" />
      </View>
      <Text style={styles.company}>{item.company}</Text>
      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color="#6B7280" />
        <Text style={styles.location}>{item.location}</Text>
      </View>
      <Text style={styles.salary}>{item.salary}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Explore Job Categories</Text>
      <FlatList
        data={jobCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
      />

      <Text style={[styles.heading, { marginTop: 25 }]}>
        {selectedCategory} Jobs
      </Text>
      <FlatList
        data={jobsByCategory[selectedCategory] || []}
        renderItem={renderJob}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Careers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#F9FAFB',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  categoryBox: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategoryBox: {
    backgroundColor: '#2563EB',
  },
  categoryText: {
    fontSize: 13,
    marginTop: 6,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#fff',
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  company: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  location: {
    marginLeft: 5,
    fontSize: 13,
    color: '#6B7280',
  },
  salary: {
    color: '#F54927',
    fontWeight: '600',
    marginTop: 6,
    fontSize: 14,
  },
});
