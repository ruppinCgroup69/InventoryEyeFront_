import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CBonusModal({ visible, onClose, onChoose, bonus, categories, isAccepted }) {
  if (!bonus) return null;

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.categoryId === categoryId);
    return category ? category.categoryDesc : 'Unknown Category';
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{bonus.name}</Text>
          <Image source={{ uri: bonus.image }} style={styles.bonusImage} />
          <Text style={styles.description}>{bonus.description}</Text>
          <Text style={styles.category}>Category: {getCategoryName(bonus.category)}</Text>
          <Text style={styles.minScore}>Minimum Score: {bonus.minScore}</Text>
          <Text style={styles.numDownloads}>Downloads: {bonus.numDownloads}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </TouchableOpacity>
            {!isAccepted && (
              <TouchableOpacity onPress={() => onChoose(bonus.bonusId)} style={styles.chooseButton}>
                <Text style={styles.chooseButtonText}>CHOOSE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bonusImage: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    marginBottom: 5,
  },
  minScore: {
    fontSize: 14,
    marginBottom: 5,
  },
  numDownloads: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#111851',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});


