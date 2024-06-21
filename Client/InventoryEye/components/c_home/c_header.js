import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


//recives props (name, profile image, score, number of notifications)
export default function C_header({ fullName, profileImage, userScore, notiNum }) {
  return (
    <View style={styles.container}>
      <View style={styles.profileleft}>
      <View style={styles.imageContainer}>
          <Image source={profileImage} style={styles.image} />
        </View>
        <View style={styles.scoreContainer}>
          <AntDesign name="star" size={26} color="#31A1E5" style={styles.starIcon} />
          <Text style={styles.scoreText}>{userScore}</Text>
        </View>
        </View>
      <TouchableOpacity style={styles.notileft} >
        <View style={styles.noti}>
          <Ionicons name="notifications-outline" size={35} color="#111851" />
          <View style={[styles.notiCircle, { right: 17 }]}>
            <Text style={styles.notiText}>{notiNum}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.center}>
        <Text style={styles.hello}>Hello, {fullName}!</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.inEye}>InventoryEye</Text>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="pluscircle" size={35} color="#111851" />
        </TouchableOpacity>
      </View>
    </View>
  )
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  inEye: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#111851',
    marginBottom: 5,
    marginTop: 15,
  },
  center: {
    justifyContent: 'center',
    //borderWidth:1,
    width: '35%',
  },
  hello: {
    color: '#111851',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
    marginRight: 7,
  },
  noti: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5,
    //borderWidth:1,
  },
  notiCircle: {
    backgroundColor: '#FC8D8D',
    borderRadius: 11,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 42,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  notiText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#111851',
    borderWidth: 1,
    margin:7,
  },
  imageContainer: {
    //borderWidth:1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  notileft: {
    // borderWidth:1,
    width: '15%',
  },
  profileleft: {
    width: '25%',
    alignItems: 'center',
    position:'relative',
  },
  right: {
    width: '25%',
    //borderWidth:1,
  },
  scoreContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 7, 
    left: 68, 
    zIndex: 1,
  },
  scoreText: {
    position: 'absolute',
    top:8,
    color: 'white',
    fontSize: 10,
  },
})