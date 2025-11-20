import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>
      <Text style={styles.paragraph}>
        Welcome to our application. By accessing or using our service, you agree
        to be bound by these terms and conditions. Please read them carefully.
      </Text>
      <Text style={styles.subHeading}>1. Acceptance of Terms</Text>
      <Text style={styles.paragraph}>
        By using this app, you agree to comply with and be legally bound by
        these terms. If you do not agree, please do not use the service.
      </Text>
      <Text style={styles.subHeading}>2. User Responsibilities</Text>
      <Text style={styles.paragraph}>
        Users must provide accurate and complete information when using our
        services. Any fraudulent activity may result in termination of access.
      </Text>
      <Text style={styles.subHeading}>3. Privacy Policy</Text>
      <Text style={styles.paragraph}>
        Your privacy is important to us. We collect and use your data in
        accordance with our privacy policy.
      </Text>
      <Text style={styles.subHeading}>4. Modifications</Text>
      <Text style={styles.paragraph}>
        We reserve the right to modify these terms at any time. Continued use of
        the service after changes constitutes acceptance of the new terms.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
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
