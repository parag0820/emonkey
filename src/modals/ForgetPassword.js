// components/CustomModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ForgetPassword = ({
  visible,
  onClose,
  onConfirm,
  loading,
  title = 'Reset Password',
  placeholder = 'Enter your account email',
  value,
  onChangeText,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, { marginHorizontal: width * 0.05 }]}>
          <Text style={styles.modalTitle}>{title}</Text>

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="gray"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.modalBtn, { marginRight: 8 }]}
            >
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.modalBtnPrimary, { marginLeft: 8 }]}
              disabled={loading}
            >
              <Text style={styles.modalBtnPrimaryText}>
                {loading ? 'Sending...' : 'Send'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    color: '#000',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  modalBtn: {
    flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#333',
    fontWeight: '600',
  },
  modalBtnPrimary: {
    flex: 1,
    backgroundColor: '#8C1212',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnPrimaryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
