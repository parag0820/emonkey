import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import BASE_URL from '../api/BaseUrl';

const { width } = Dimensions.get('window');

const AboutUs = () => {
  const [aboutText, setAboutText] = useState('');

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
      const res = await axios.get(`${BASE_URL}Emonkeyaboutus`);

      const note = res?.data?.data?.[0]?.note || '';
      setAboutText(decodeHtml(note));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAboutUs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.subheading}>Our Values</Text>
        <Text style={styles.paragraph}>{aboutText || 'Loading...'}</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: width * 0.05,
    paddingVertical: 20,
  },
  heading: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: width * 0.04,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
  highlight: {
    color: '#007BFF',
    fontWeight: '600',
  },
});
