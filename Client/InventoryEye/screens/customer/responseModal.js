import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Modal, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Keyboard } from 'react-native';
import { GET, POST } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Option = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.option, isSelected && styles.selectedOption]}
    onPress={onPress}
  >
    <Text style={isSelected ? styles.selectedOptionText : styles.optionText}>
      {label}
    </Text>
  </TouchableOpacity>
);

const qualityMapping = {
  'Low': 1,
  'Medium': 2,
  'High': 3
};

const reverseQualityMapping = {
  1: 'Low',
  2: 'Medium',
  3: 'High'
};

export default function ResponseModal({ visible, onClose, fullName, postId, onCommentPosted,categoryId  }) {
  const [respnseContent, setRespnseContent] = useState('');
  const [inEyeDate, setInEyeDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [selectedStockLevel, setSelectedStockLevel] = useState('');
  const [purchased, setPurchased] = useState('No');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [purchDate, setPurchDate] = useState(new Date());
  const [satisfaction, setSatisfaction] = useState('');
  const [inputHeight, setInputHeight] = useState(30);
  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [stockLevels, setStockLevels] = useState([]);
  const [responseData, setResponseData] = useState({
    postId: 0,
    userId: 0,
    storeId: 0,
    stockId: 0,
    commentId: 0,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    content: '',
    inventoryEye: new Date().toISOString(),
    storeLocation: '',
    bought: 0,
    boughtDate: null,
    productQuality: 0,
    userName: '',
    userImage: '',
    score: 0,
    satisfaction: 0
  });

  const fetchStores = async () => {
    try {
      const response = await GET(`StoreCategories/CategoryId/${categoryId}`);
      if (Array.isArray(response)) {
        setStores(response);
      } else {
        console.error('Unexpected response format:', response);
        setStores([]); 
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      setStores([]); 
    }
  };

  useEffect(() => {
    fetchStores();
  }, [categoryId]);
  
  useEffect(() => {
    const fetchStockLevels = async () => {
      try {
        const response = await GET('StockLevel');
        setStockLevels(response);
      } catch (error) {
        console.error('Error fetching stock levels:', error);
      }
    };
    fetchStockLevels();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('logged user');
        if (userData) {
          const user = JSON.parse(userData);
          setResponseData((prevData) => ({
            ...prevData,
            userId: user.id,
            userName: user.fullName,
            userImage: user.image,
            score: user.score
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const PLACEHOLDER_DATE = '1900-01-01T00:00:00.000Z';

  const handleSend = async () => {
    const updatedResponseData = {
      ...responseData,
      postId,
      content: respnseContent,
      inventoryEye: inEyeDate.toISOString(),
      storeLocation: location,
      storeId: selectedStore ? selectedStore.storeId : 0,
      stockId: stockLevels.find(level => level.stockDesc === selectedStockLevel)?.stockId || 0,
      bought: purchased === 'Yes',
      boughtDate: purchased === 'Yes' ? purchDate.toISOString() : PLACEHOLDER_DATE,
      productQuality: qualityMapping[selectedQuality] || 0,
      satisfaction: satisfaction ? parseInt(satisfaction, 10) : 0,
    };

    try {
      const response = await POST('Comments', updatedResponseData);
      onCommentPosted();
      onClose();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const showActionSheet = () => {
    Alert.alert(
      "Select Store",
      "",
      [
        ...(Array.isArray(stores) && stores.length > 0 ? stores.map(store => ({
          text: store.storeName,
          onPress: () => {
            setSelectedStore(store);
          }
        })) : [
          { text: "No stores available", style: "cancel" }
        ]),
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };
  
  


  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.title}>Respond to {fullName}</Text>
                <TextInput
                  style={[styles.input, { height: inputHeight }]}
                  placeholder="Type your response here..."
                  multiline={true}
                  onContentSizeChange={(event) => {
                    setInputHeight(event.nativeEvent.contentSize.height);
                  }}
                  onChangeText={setRespnseContent}
                />
                <View style={styles.fieldContainer}>
                  <Text style={styles.inEyeLabel}>I kept an eye on it on:</Text>
                  <View style={styles.optionsContainer}>
                    <DateTimePicker
                      style={styles.date}
                      testID="dateTimePicker"
                      mode="date"
                      value={inEyeDate}
                      maximumDate={new Date()}
                      onChange={(event, selectedDate) => setInEyeDate(selectedDate || date)}
                    />
                  </View>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Location:</Text>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Store Name:</Text>
                  <TouchableOpacity
                    style={[styles.input, { flex: 1 }]}
                    onPress={showActionSheet}
                  >
                    <Text style={styles.storeButtonText}>
                      {selectedStore ? selectedStore.storeName : 'Select Store'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Stock Level:</Text>
                  <View style={styles.optionsContainer}>
                    {stockLevels.map((level) => (
                      <Option
                        key={level.stockId}
                        label={level.stockDesc}
                        isSelected={selectedStockLevel === level.stockDesc}
                        onPress={() => setSelectedStockLevel(level.stockDesc)}
                      />
                    ))}
                  </View>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Purchased:</Text>
                  <View style={styles.optionsContainer}>
                    {['Yes', 'No'].map((option) => (
                      <Option
                        key={option}
                        label={option}
                        isSelected={purchased === option}
                        onPress={() => setPurchased(option)}
                      />
                    ))}
                  </View>
                </View>

                {purchased === 'Yes' && (
                  <>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>Product Quality:</Text>
                      <View style={styles.optionsContainer}>
                        {['Low', 'Medium', 'High'].map((quality) => (
                          <Option
                            key={quality}
                            label={quality}
                            isSelected={selectedQuality === quality}
                            onPress={() => setSelectedQuality(quality)}
                          />
                        ))}
                      </View>
                    </View>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>Purchase Date:</Text>
                      <View style={styles.optionsContainer}>
                        <DateTimePicker
                          style={styles.date}
                          testID="dateTimePicker"
                          mode="date"
                          value={purchDate}
                          maximumDate={new Date()}
                          onChange={(event, selectedDate) => setPurchDate(selectedDate || purchDate)}
                        />
                      </View>
                    </View>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.label}>Satisfaction:</Text>
                      <Text style={styles.satisfactionLabel}>Low</Text>
                      <View style={styles.optionsRankContainer}>
                        {[1, 2, 3, 4, 5].map((level) => (
                          <Option
                            key={level}
                            label={String(level)}
                            isSelected={satisfaction === level}
                            onPress={() => setSatisfaction(level)}
                          />
                        ))}
                      </View>
                      <Text style={styles.satisfactionLabel}>High</Text>
                    </View>
                  </>
                )}
                <View style={styles.buttons}>
                  <Button title="Comment" onPress={handleSend} style={styles.button} />
                  <Button title="Close" onPress={onClose} style={styles.closeButton} />
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback >
    </Modal >
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '97%',
    height: '60%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31A1E5',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#111851',
    marginBottom: 7
  },
  fieldContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inEyeLabel: {
    fontSize: 14,
    marginBottom: 0,
    width: '60%'
  },
  label: {
    fontSize: 14,
    marginBottom: 0,
    width: '30%'
  },
  optionsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  optionsRankContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#31A1E5',
    margin: 2,
  },
  selectedOption: {
    backgroundColor: '#31A1E5',
  },
  optionText: {
    color: '#111851',
  },
  selectedOptionText: {
    color: 'white',
  },
  input: {
    borderColor: '#31A1E5',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    minHeight: 30,
    textAlignVertical: 'top',
  },
  date: {
    width: '100%',
    height: 40,
  },
  button: {
    marginTop: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#31A1E5',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  satisfactionLabel: {
    fontSize: 14,
    color: '#111851',
  },
  storeButton: {
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderColor: '#31a1e5',
    borderRadius: 10,
    padding: 10,
    marginBottom: -5,
    marginVertical: 10,
    width: '100%',
  },
  storeButtonText: {
    color: 'rgba(17, 24, 81, 0.3)',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 7,
    paddingVertical: 0,
    paddingTop: 5
  },
});
