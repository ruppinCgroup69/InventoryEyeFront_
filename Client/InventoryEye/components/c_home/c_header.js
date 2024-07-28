import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Pressable, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export default function C_header({ fullName, profileImage, userScore, notiNum }) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const bellIconRef = useRef(null);

  const handleNewPost = () => {
    // Pass the name of the current screen to EditOrCreatePost
    const currentScreen = navigation.getState().routes[navigation.getState().index].name;
    navigation.navigate('New Post', { fromScreen: currentScreen });
  };

  const handleNotificationPress = () => {
    bellIconRef.current.measure((fx, fy, width, height, px, py) => {
      setModalPosition({ top: py + height, left: px - width });
      setModalVisible(true);
    });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileleft}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.imageContainer}>
            <Image source={profileImage} style={styles.image} />
          </View>
        </TouchableOpacity>
        <View style={styles.scoreContainer}>
          <AntDesign name="star" size={26} color="#31A1E5" style={styles.starIcon} />
          <Text style={styles.scoreText}>{userScore}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.notileft}
        onPress={handleNotificationPress}
        ref={bellIconRef}
      >
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
        <TouchableOpacity style={styles.button} onPress={handleNewPost}>
          <AntDesign name="pluscircle" size={35} color="#111851" />
        </TouchableOpacity>
      </View>
      <Modal transparent={true} visible={isModalVisible} onRequestClose={handleCloseModal} >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <View style={[styles.modalContent, { position: 'absolute', top: modalPosition.top, left: modalPosition.left }]}>
            <Text style={styles.modalText}>Notifications</Text>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity>
              <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Shalev Bar commented on your post</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
              <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Yarden Assulin sent a new message</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity>
              <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>New ranking from Maya Ziv </Text>
                </View>
                </TouchableOpacity>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
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
    shadowOffset: { width: 0, height: 2 },
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
    margin: 7,
  },
  imageContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  notileft: {
    width: '15%',
  },
  profileleft: {
    width: '25%',
    alignItems: 'center',
    position: 'relative',
  },
  right: {
    width: '25%',
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
    top: 8,
    color: 'white',
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#31A1E5',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#111851',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#111851',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '100%',
    borderWidth:'0.5',
    borderColor:"rgba(17, 24, 81, 0.7)",
    borderRadius:'100%'
  },
  notificationText: {
    fontSize: 14,
    color: '#111851',
    paddingLeft:'5%'
  },
  notificationButton: {
    backgroundColor: '#31A1E5',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  notificationButtonText: {
    color: 'white',
    fontSize: 12,
  },
  scrollContainer: {
    maxHeight: 200, // Adjust the max height as needed
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 20, // Extra padding at the bottom for better scroll experience
  },
});
