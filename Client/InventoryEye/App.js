import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';

export default function App() {
  return (
      <Navigation />

     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
