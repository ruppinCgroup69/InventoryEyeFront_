import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

//recives props (full Name, profile image, email, birthdate, city)
export default function Info({fullName, profileImage,email,birthdate,city}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <Image source={profileImage} style={styles.image} />
      </View>
      <View style={styles.info}>
      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.details}>{email}</Text>
      <Text style={styles.details}>{birthdate}</Text>
      <Text style={styles.details}>{city}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  info:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: -80,
    left:28,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#111851',
    borderWidth: 1.5,
  },
  name: {
    color: '#111851',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: '10%',
    marginTop: '10%',
  },
  details: {
    color: 'black',
    fontSize: 16,
    marginBottom: '5%'
  },
})