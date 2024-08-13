import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Star } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POST } from '../../api.js';

export default function RateModal({ visible, onClose, commentId, publishedBy,publishedName }) {
  const [date, setDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [bought, setBought] = useState(null);
  const [reliability, setReliability] = useState(0);
  const [generalRating, setGeneralRating] = useState(0);
  const [content, setContent] = useState('');
  const [ratedBy, setRatedBy] = useState(null);

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
          color={star <= rating ? '#4AB7FD' : '#D1D5DB'}
          fill={star <= rating ? '#4AB7FD' : 'transparent'}
        />
      </TouchableOpacity>
    ));
  };

  const validateInputs = () => {
    if (bought === null) {
      Alert.alert('Error', 'Please select whether you bought the product or not.');
      return false;
    }
    if (reliability === 0) {
      Alert.alert('Error', 'Please rate the response credibility.');
      return false;
    }
    if (generalRating === 0) {
      Alert.alert('Error', 'Please provide a general rating.');
      return false;
    }
    if (!content.trim()) {
      Alert.alert('Error', 'Please provide a comment for your rating.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    try {
      console.log('Submitting rating for commentId:', commentId);
      const requestBody = {
        commentId,
        publishedBy,
        ratedBy,
        generalScore: generalRating,
        credibility: reliability,
        bought,
        content: content.trim()
      };
      console.log('Request body:', JSON.stringify(requestBody));

      const response = await POST('CommentScore', requestBody);

      console.log('Full response:', response);

      if (response && response.ok) {
        console.log('Rating submitted successfully:', response.date);
        Alert.alert('Success', 'Rating submitted successfully');
        onClose();
      } else {
        console.error('Failed to submit rating:', response);
        let errorMessage = 'Failed to submit rating. ';
        if (response && response.status === 500) {
          errorMessage += 'There was a server error. Please try again later.';
        } else {
          errorMessage += 'Please check your input and try again.';
        }
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      let errorMessage = 'An error occurred while submitting the rating. ';
      if (error.response) {
        console.log('Error response:', error.response);
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);

        if (error.response.status === 500) {
          errorMessage += 'There was a server error. Please try again later.';
        } else {
          errorMessage += `Server responded with status code ${error.response.status}.`;
        }
ר
        // Log the response text if available
        if (error.response.data) {
          console.log('Error response text:', JSON.stringify(error.response.data));
        }
      } else if (error.request) {
        console.log('Error request:', error.request);
        errorMessage += 'No response was received from the server.';
      } else {
        console.log('Error message:', error.message);
        errorMessage += 'Please check your internet connection and try again.';
      }
      Alert.alert('Error', errorMessage);
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
            <Text style={styles.nameText}>You are rating: 
              <Text style={{fontWeight:'bold',fontSize: 18,marginBottom: 20,color:'#111851'}}> {publishedName}</Text>
              </Text>
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
                <Text style={styles.submitButtonText}>Rate</Text>
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
    maxHeight: '90%',
  },
  dateText: {
    fontSize: 16,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 18,
    marginBottom: 10,
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
    borderColor: '#4AB7FD',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#4AB7FD',
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
    backgroundColor: '#4AB7FD',
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

