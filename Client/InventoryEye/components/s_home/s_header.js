import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export default function S_header({fullName, profileImage}) {
  const navigation = useNavigation();

  const handleNewBonus = () => {
    // Pass the name of the current screen to EditOrCreatePost
    const currentScreen = navigation.getState().routes[navigation.getState().index].name;
    navigation.navigate('New Bonus', { fromScreen: currentScreen });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileleft}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.imageContainer}>
            <Image source={profileImage} style={styles.image} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <Text style={styles.hello}>Hello, {fullName}!</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.inEye}>InventoryEye</Text>
        <TouchableOpacity style={styles.button} onPress={handleNewBonus}>
          <AntDesign name="pluscircle" size={35} color="#111851" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#BCB7B7',
    width: '100%',
    marginTop: 0,
    backgroundColor: '#C8DFEA',
  },
  profileleft: {
    width: '25%',
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#111851',
    borderWidth: 1,
    margin: 7,
  },
  center: {
    justifyContent: 'center',
    width: '35%',
  },
  hello: {
    color: '#111851',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
    marginRight: 7,
  },
  right: {
    width: '25%',
  },
  inEye: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#111851',
    marginBottom: 5,
    marginTop: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});
