// OTPVerificationModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const OTPVerificationModal = ({
  visible,
  onClose,
  onVerify,
  otp,
  setOtp,
  loading,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>OTP Verification</Text>
          <Text style={styles.modalSubtitle}>
            Enter the OTP sent to your email or phone
          </Text>

          <TextInput
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
            keyboardType="numeric"
            placeholderTextColor={'gray'}
            maxLength={6}
            style={styles.input}
          />

          <View style={styles.btnRow}>
            <TouchableOpacity onPress={onClose} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onVerify}
              style={styles.modalBtnPrimary}
              disabled={loading}
            >
              <Text style={styles.modalBtnPrimaryText}>
                {loading ? 'Verifying...' : 'Verify'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OTPVerificationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 5,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  modalBtn: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  modalBtnText: {
    color: '#333',
    fontWeight: '600',
  },
  modalBtnPrimary: {
    backgroundColor: '#8C1212',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  modalBtnPrimaryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
