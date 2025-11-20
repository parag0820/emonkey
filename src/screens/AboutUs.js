import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const AboutUs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header Image or Logo */}
        <Image
          source={require('../assets/autoMobile.png')} // 👈 Replace with your app logo
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.heading}>About Us</Text>

        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.highlight}>Our App</Text> — your
          trusted companion for smart and convenient healthcare solutions. Our
          mission is to simplify your experience by providing secure, efficient,
          and user-friendly services at your fingertips.
        </Text>

        <Text style={styles.subheading}>Our Mission</Text>
        <Text style={styles.paragraph}>
          We aim to empower users with seamless access to doctors, health
          services, and wellness information. By combining technology with care,
          we strive to make healthcare accessible for everyone, anytime,
          anywhere.
        </Text>

        <Text style={styles.subheading}>Our Vision</Text>
        <Text style={styles.paragraph}>
          Our vision is to create a digital platform that connects people to
          quality healthcare services without barriers. We believe that
          technology can bring people closer to better health and well-being.
        </Text>

        <Text style={styles.subheading}>Our Values</Text>
        <Text style={styles.paragraph}>
          • Integrity — We value honesty and transparency in all we do.{'\n'}•
          Innovation — We constantly improve our platform for better
          experiences.{'\n'}• Compassion — We care about the well-being of our
          users.{'\n'}• Accessibility — We aim to make healthcare simple and
          reachable.
        </Text>

        <Text style={styles.subheading}>Contact Us</Text>
        <Text style={styles.paragraph}>
          For any queries or feedback, reach out to us at:{' '}
          <Text style={styles.highlight}>support@example.com</Text>
        </Text>

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
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: 'center',
    marginBottom: 10,
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
