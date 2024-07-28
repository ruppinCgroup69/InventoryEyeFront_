import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NewComment({ fullName }) {
  return (
    <View style={styles.container}>
<TextInput
  style={styles.input}
  placeholder={`Respond to ${fullName}...`}
  multiline
  numberOfLines={4} 
  textAlignVertical="top" 
/>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="send" size={24} color='rgba(17, 24, 81, 0.7)' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height:70,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#C6DEE7', // Ensure it's visible against the background
  },
  input: {
    flex: 1,
    minHeight: 40, // Minimum height of the input
    maxHeight: 120, // Maximum height of the input
    borderColor: 'rgba(17, 24, 81, 0.4)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10, // Padding for text inside input
    backgroundColor: '#EAF0F3',
    textAlignVertical: 'top', // Align text to the top
    marginBottom:'3%'
  },
  button: {
    marginLeft: 10,
    marginBottom:'3.5%'
  },
});
