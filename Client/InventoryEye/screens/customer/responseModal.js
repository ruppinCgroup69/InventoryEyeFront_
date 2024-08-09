import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView,Modal,TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';

export default function ResponseModal({ visible, onClose, fullName }) {
  const [selectedStockLevel, setSelectedStockLevel] = useState('High');
  const [selectedQuality, setSelectedQuality] = useState('High');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState('');
  const [store, setStore] = useState('');
  const [purchased, setPurchased] = useState('NO');
  const [satisfaction, setSatisfaction] = useState('Satisfied');

  const handleTouchOutside = () => {
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleTouchOutside}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Respond to {fullName}</Text>
              <TextInput
                style={styles.input}
                placeholder="Type your response here..."
                multiline={true}
              />
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Date and Time when you saw the product:</Text>
                <DateTimePicker
                  style={styles.date}
                  testID="dateTimePicker"
                  mode="date"
                  value={date}
                  onChange={(event, selectedDate) => setDate(selectedDate || date)}
                />
                <AntDesign name="calendar" size={24} color="rgba(17, 24, 81, 0.6)" style={{ marginTop: 6 }} />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Location:</Text>
                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Store Name:</Text>
                <TextInput
                  style={styles.input}
                  value={store}
                  onChangeText={setStore}
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Stock Level:</Text>
                <Picker
                  selectedValue={selectedStockLevel}
                  onValueChange={(itemValue) => setSelectedStockLevel(itemValue)}
                >
                  <Picker.Item label="High" value="High" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="Low" value="Low" />
                </Picker>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Purchased:</Text>
                <Picker
                  selectedValue={purchased}
                  onValueChange={(itemValue) => setPurchased(itemValue)}
                >
                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Product Quality:</Text>
                <Picker
                  selectedValue={selectedQuality}
                  onValueChange={(itemValue) => setSelectedQuality(itemValue)}
                >
                  <Picker.Item label="High" value="High" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="Low" value="Low" />
                </Picker>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Purchase Date:</Text>
                <DateTimePicker
                  style={styles.date}
                  testID="dateTimePicker"
                  mode="date"
                  value={date}
                  onChange={(event, selectedDate) => setDate(selectedDate || date)}
                />
                <AntDesign name="calendar" size={24} color="rgba(17, 24, 81, 0.6)" style={{ marginTop: 6 }} />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Degree of Satisfaction:</Text>
                <Picker
                  selectedValue={satisfaction}
                  onValueChange={(itemValue) => setSatisfaction(itemValue)}
                >
                  <Picker.Item label="Very Satisfied" value="Very Satisfied" />
                  <Picker.Item label="Satisfied" value="Satisfied" />
                  <Picker.Item label="Neutral" value="Neutral" />
                  <Picker.Item label="Dissatisfied" value="Dissatisfied" />
                  <Picker.Item label="Very Dissatisfied" value="Very Dissatisfied" />
                </Picker>
              </View>
              <Button title="Send" onPress={onClose} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31A1E5',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#111851',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  input: {
    borderColor: '#31A1E5',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height: 40,
  },
  date: {
    width: '100%',
    height: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
