import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function NewComment({ fullName, onPress }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.responseButton} onPress={onPress}>
        <Ionicons name="send" size={20} color="#111851" />
        <Text style={styles.responseText}>Respond to {fullName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderTopWidth:1,
    borderTopColor:'#C6DEE7',
  },
  responseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    borderWidth:1,
    borderColor:'#31A1E5'
  },
  responseText: {
    color: '#111851',
    fontSize: 14,
    marginLeft: 8,
  },
});