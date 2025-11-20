import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Settings = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [fullPageEnabled, setFullPageEnabled] = useState(true);
  const otherItems = [
    { id: 'privacy', label: 'Privacy Policy', route: 'PrivacyPolicyScreen' },
    { id: 'terms', label: 'Terms of use', route: 'Terms' },
    { id: 'about', label: 'About Us', route: 'AboutUsScreen' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={width * 0.07}
            color="#000"
            style={{ marginRight: width * 0.02 }}
          />
        </TouchableOpacity>
        <Icon name="settings-outline" size={width * 0.07} color="#000" />
        <Text style={[styles.headerText, { fontSize: width * 0.05 }]}>
          Settings
        </Text>
      </View>

      {/* Notifications Section */}
      <View style={[styles.section, { padding: width * 0.04 }]}>
        <Text style={[styles.sectionTitle, { fontSize: width * 0.04 }]}>
          NOTIFICATIONS
        </Text>

        <View style={styles.row}>
          <Text style={[styles.label, { fontSize: width * 0.04 }]}>
            Enable notification for this account
          </Text>
          <Switch
            value={notificationEnabled}
            onValueChange={setNotificationEnabled}
            thumbColor="#fff"
            trackColor={{ false: '#ccc', true: 'limegreen' }}
          />
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { fontSize: width * 0.04 }]}>
            Enable full page notification
          </Text>
          <Switch
            value={fullPageEnabled}
            onValueChange={setFullPageEnabled}
            thumbColor="#fff"
            trackColor={{ false: '#ccc', true: 'limegreen' }}
          />
        </View>
      </View>

      {/* Other Section */}

      <View style={[styles.section, { padding: width * 0.04 }]}>
        <Text style={[styles.sectionTitle, { fontSize: width * 0.04 }]}>
          OTHER
        </Text>

        {otherItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.rowItem}
            onPress={() => navigation.navigate(item.route)}
          >
            <Text style={[styles.label, { fontSize: width * 0.04 }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: '#c5d1e7ff',
    paddingVertical: 10,
    marginBottom: 15,
    paddingLeft: 15,
  },
  headerText: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    backgroundColor: '#e6e6e6',
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  label: {
    color: '#000',
  },
  rowItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});

export default Settings;
