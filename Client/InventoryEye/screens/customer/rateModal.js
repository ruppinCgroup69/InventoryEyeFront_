import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Star } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RateModal({ visible, onClose, publishedBy, postId }) {
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [bought, setBought] = useState(null);
  const [reliability, setReliability] = useState(0);
  const [generalRating, setGeneralRating] = useState(0);
  const [content, setContent] = useState('');
  const [ratedBy, setRatedBy] = useState(null);
  const [commentScore, setCommentScore]= useState(null);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US');
    setDate(currentDate);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('logged user');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setFullName(parsedUserData.fullName);
        setRatedBy(parsedUserData.id);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleStarPress = (rating, setRating) => {
    setRating(rating);
  };

  const renderStars = (rating, setRating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => handleStarPress(star, setRating)}>
        <Star
          size={24}
          color={star <= rating ? '#007AFF' : '#D1D5DB'}
          fill={star <= rating ? '#007AFF' : 'transparent'}
        />
      </TouchableOpacity>
    ));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`CommentScore/${commentId}`);
      setCommentScore(response);

      if (response.ok) {
        console.log('Rating submitted successfully');
        onClose();
      } else {
        console.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.nameText}>{fullName}</Text>
            
            <View style={styles.purchaseContainer}>
              <Text style={styles.labelText}>Did you buy the product?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, bought === true && styles.activeButton]}
                  onPress={() => setBought(true)}
                >
                  <Text style={[styles.buttonText, bought === true && styles.activeButtonText]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, bought === false && styles.activeButton]}
                  onPress={() => setBought(false)}
                >
                  <Text style={[styles.buttonText, bought === false && styles.activeButtonText]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.ratingContainer}>
              <Text style={styles.labelText}>Response Credibility</Text>
              <View style={styles.starsContainer}>
                {renderStars(reliability, setReliability)}
              </View>
            </View>
            
            <View style={styles.ratingContainer}>
              <Text style={styles.labelText}>General Rating</Text>
              <View style={styles.starsContainer}>
                {renderStars(generalRating, setGeneralRating)}
              </View>
            </View>
            
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Write a comment for the rating..."
              value={content}
              onChangeText={setContent}
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Rating</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  purchaseContainer: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#007AFF',
  },
  activeButtonText: {
    color: 'white',
  },
  ratingContainer: {
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#D1D5DB',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});