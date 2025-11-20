import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const More = ({ visible, onClose, options = [] }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Background overlay */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />

      {/* Bottom Modal */}
      <View style={styles.modalContainer}>
        <View style={styles.row}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                item.onPress?.();
                onClose();
              }}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default More;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: '10%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#000',
    width: width * 0.25,
    alignItems: 'center',
  },
  optionText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
});
