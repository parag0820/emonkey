import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ChangePasswordModal = ({
  visible,
  onClose,
  onUpdate,
  currentPassword,
  newPassword,
  setCurrentPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
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
          <Text style={styles.modalTitle}>Change Password</Text>
          <Text style={styles.modalSubtitle}>
            Enter new password and confirm
          </Text>

          {/* Current Password Input */}
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Current Password"
            // secureTextEntry
            placeholderTextColor={'gray'}
            style={styles.input}
          />
          {/* New Password Input */}
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="New Password"
            // secureTextEntry
            placeholderTextColor={'gray'}
            style={[styles.input, { marginTop: 12 }]}
          />

          {/* Confirm Password Input */}
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            // secureTextEntry
            placeholderTextColor={'gray'}
            style={[styles.input, { marginTop: 12 }]}
          />

          <View style={styles.btnRow}>
            <TouchableOpacity onPress={onClose} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onUpdate}
              style={styles.modalBtnPrimary}
              disabled={loading}
            >
              <Text style={styles.modalBtnPrimaryText}>
                {loading ? 'Updating...' : 'Update'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;

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
    color: '#000',
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
