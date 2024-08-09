import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
;

export default function Details({ fullName, profileImage, pDate, pHour, category, size, pName, company, color, location, content, productImage }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.left}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="chevron-back" size={24} color="#111851" />
          </TouchableOpacity>
          <View style={styles.profileImg}>
            <Image source={profileImage} style={styles.image} />
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.up}>
            <View style={styles.upRight}>
              <Text style={{ textAlign: 'left', fontSize: 18, color: '#111851' }}>{fullName}</Text>
              <Text style={{ textAlign: 'left', fontSize: 14, color: '#111851' }}>{pDate} {pHour}</Text>
            </View>
            <View style={styles.upLeft}>
              <TouchableOpacity>
                <AntDesign name="edit" size={24} color="rgba(17, 24, 81, 0.7)" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign name="delete" size={24} color="rgba(17, 24, 81, 0.7)" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.down}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.first}>
                <Text style={{ color: '#111851' }}>Category: <Text style={{ color: 'black' }}>{category}</Text></Text>
                <Text style={{ color: '#111851' }}>Product: <Text style={{ color: 'black' }}>{pName}</Text></Text>
                <Text style={{ color: '#111851' }}>Color: <Text style={{ color: 'black' }}>{color}</Text></Text>
              </View>
              <View style={styles.second}>
                <Text style={{ color: '#111851' }}>Size: <Text style={{ color: 'black' }}>{size}</Text></Text>
                <Text style={{ color: '#111851' }}>Company: <Text style={{ color: 'black' }}>{company}</Text></Text>
                <Text style={{ color: '#111851' }}>Location: <Text style={{ color: 'black' }}>{location}</Text></Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>{content}</Text>
      </View>
      <View style={styles.picture}>
        <Image source={productImage} style={styles.productImage} />
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.deleteText}>Are you sure you want to delete this post?</Text>
            <Text style={styles.deleteText}>This action cannot be undone</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.modalbtn} onPress={toggleModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalbtn} >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  info: {
    flexDirection: 'row',
    paddingTop: '2%',
  },
  left: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  up: {
    flexDirection: 'row',
  },

  upRight: {
    width: '50%',
    marginLeft: '2%'
  },
  upLeft: {
    flexDirection: 'row',
    width: '30%',
    marginRight: '30%'
  },
  icon: {
    marginRight: '5%',
    paddingLeft: '2%'
  },
  profileImg: {
    height: 70,
    width: 70,
    borderRadius: 35,
    borderColor: '#111851',
    borderWidth: 1,
    marginLeft: '30%',
    marginBottom: '20%',
    position: 'relative'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  iconContainer: {
    position: 'absolute',
    top: '40%',
    left: -2,
    transform: [{ translateY: -12 }],
  },
  right: {
    marginRight: '10'
  },
  first: {
    marginLeft: '2%'
  },
  second: {
    marginLeft: '1%'
  },
  content: {
    marginHorizontal: '2%',
    flex: 1,
  },
  picture: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
resizeMode: 'contain',
    marginBottom: '1%',
    marginTop: '1%'
  },
  modalContainer: {
    position: 'absolute',
    top: '15%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: '20%',
    width: '100%',
    borderWidth: 3,
    borderColor: '#31A1E5',
  },
  modalContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#111851',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: '3%'

  },
  modalbtn:{
    borderWidth:1,
    borderColor: '#31A1E5',
    borderRadius:'50%',
    marginLeft:'3%',
    width:'25%'
  },
  buttonText:{
    fontSize: 18,
    textAlign: 'center',
    color: '#111851',
  }

})