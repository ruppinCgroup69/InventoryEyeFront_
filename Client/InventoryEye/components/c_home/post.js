import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

//recives props (full name, profile image, score, product Image, published date and time,category, product Name, content)
export default function Post({ fullName, profileImage, score, productImage, publishedDate, publishedHour, category, productName, content }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.info}>
          <View style={styles.profileImage} >
            <Image source={productImage} style={styles.myImg} />
            <View style={[styles.score, { left: 7 }]}>
              <Text style={styles.scoretext}>{score}</Text>
            </View>
          </View>
          <View style={styles.profileInfo} >
            <View style={styles.infoHead}>
              <Text style={styles.name}>{fullName}</Text>
              <Text style={styles.publish}>{publishedDate} ,{publishedHour}</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.categoryName} numberOfLines={1} ellipsizeMode="tail">
                Category: <Text style={styles.truncatedText}>{category}</Text>
              </Text>
              <Text style={styles.pName} numberOfLines={1} ellipsizeMode="tail">
                Product name: <Text style={styles.truncatedText}>{productName}</Text>
                </Text>
            </View>
          </View>

        </View>
        <View style={styles.content}>
          <Text style={styles.contenttext} numberOfLines={2} ellipsizeMode="tail">{content}</Text>
          <TouchableOpacity style={styles.more}>
            <Feather name="more-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        <Image source={profileImage} style={styles.pImg} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#BACAD6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  left: {
    width: '70%',
    height: '100%',
    //borderWidth: 1,
    marginLeft: 2,
  },
  right: {
    width: '30%',
    height: '100%',
    //borderWidth: 1,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    //borderWidth: 1,
    width: '100%',
    height: '60%',
  },
  profileInfo: {
    //borderWidth: 1,
    width: '73%',
    height: '100%',
    //backgroundColor:'yellow'
  },
  profileImage: {
    //borderWidth: 1,
    width: '27%',
    height: '100%',
    //backgroundColor:'green'
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '40%',
  },
  pImg: {
    height: '90%',
    width: '80%',
    borderWidth: 1.5,
    borderColor: '#31a1e5'
  },
  myImg: {
    height: '80%',
    width: '80%',
    borderRadius: '40%',
    borderWidth: 1,
    borderColor: '#111851',
  },
  score: {
    backgroundColor: '#FC8D8D',
    borderRadius: 7.5,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  scoretext: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
  infoHead: {
    //borderWidth: 1,
  },
  name: {
    marginTop: 2,
    textAlign: 'left',
    marginRight: 4,
    color: '#111851',
    fontSize: 14,
    fontWeight: 'bold',
  },
  publish: {
    textAlign: 'left',
    marginRight: 4,
    marginTop: 2,
  },
  categoryName: {
    color: '#111851',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  pName: {
    color: '#111851',
  },
  productInfo: {
    marginTop: 3,
  },
  more: {
    alignItems: 'center',
  },
  contenttext: {
    paddingLeft: 5,
  },
  truncatedText: {
    color: 'black',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
})