import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomDeleteModal({ visible, onClose, onConfirm }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Delete Item</Text>
          <Text style={styles.message}>Are you sure you want to delete?</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.noBtn} onPress={onClose}>
              <Text style={styles.noText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.yesBtn} onPress={onConfirm}>
              <Text style={styles.yesText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noBtn: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  yesBtn: {
    flex: 1,
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  noText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
  yesText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});
