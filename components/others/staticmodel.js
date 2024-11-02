import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ItemDetailsModal = ({ visible, onClose, item }) => {
  if (!item) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>Sale Price: ${item.salePrice}</Text>
          <Text>Available Colors:</Text>
          {item.colors.map((color, index) => (
            <Text key={index}>{color}</Text>
          ))}
          <Button title="Add to Cart" onPress={() => addToCart(item)} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ItemDetailsModal;
