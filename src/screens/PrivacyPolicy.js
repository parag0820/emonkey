import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const { width } = Dimensions.get('window');

const PrivacyPolicy = () => {
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
      const res = await axios.get(
        `https://emonkey.in/emonkey_admin/api/AdminController/Emonkeyprivacypolicy`,
      );

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Privacy Policy</Text>

        <Text style={styles.paragraph}>{text}</Text>

        <Text style={styles.subheading}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We may collect personal information such as your name, email address,
          contact details, and usage data when you use our services. This helps
          us improve our offerings and provide a personalized experience.
        </Text>

        <Text style={styles.subheading}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          Your data is used to enhance our services, communicate with you, and
          ensure a smooth user experience. We never share or sell your
          information to third parties without consent.
        </Text>

        <Text style={styles.subheading}>3. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement strict security measures to protect your data from
          unauthorized access, disclosure, or misuse. However, no online system
          is completely secure, and we cannot guarantee absolute safety.
        </Text>

        <Text style={styles.subheading}>4. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          We may update our Privacy Policy periodically. We encourage you to
          review this page from time to time for any changes.
        </Text>

        <Text style={styles.subheading}>5. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns about this Privacy Policy, feel
          free to contact us at:{' '}
          <Text style={styles.highlight}>support@example.com</Text>
        </Text>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

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
    fontSize: width * 0.07, // responsive heading
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: width * 0.035,
    color: '#888',
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

export default PrivacyPolicy;
