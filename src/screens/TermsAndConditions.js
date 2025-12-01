import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import BASE_URL from '../api/BaseUrl';

const TermsAndConditions = () => {
  const [text, setText] = useState('');

  const decodeHtml = value => {
    if (!value) return '';
    return value
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  const getAboutUs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}Emonkeyprivacypolicy`);

      const note = res?.data?.data?.[0]?.note || '';
      setText(decodeHtml(note));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAboutUs();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subHeading}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>{text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default TermsAndConditions;
