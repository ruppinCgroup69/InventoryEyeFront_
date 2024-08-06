import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather, FontAwesome5, MaterialIcons, Ionicons, FontAwesome, Octicons } from '@expo/vector-icons';
import profileImage from '../../images/profileImage.jpg';
import { GET } from '../../api';
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function EditOrCreatePost() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const [previousScreen, setPreviousScreen] = useState('Home');
  const [selectedPic, setSelectedPic] = useState('');
  const toggleModal = () => setModalVisible(!modalVisible);
  const [userData, setUserData] = useState(null);
  const [color, setColor] = useState('');
  const [company, setCompany] = useState('');

  const [postData, setPostData] = useState({
    postId: 0,
    userId: 0,
    userName: '',
    userImage: '',
    createAt: new Date(),
    editedAt: new Date(),
    productName: "",
    content: "",
    image: "",
    tags: "",
    category: 0,
    pickUpFromUser: '',
    pickUpLat: 0,
    picUpLng: 0,
    pickUpAddress: "",
    categoryDesc: "",
    score: 0
  });



  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('logged user');
      if (jsonValue != null) {
        const user = JSON.parse(jsonValue);
        setUserData(user);
      } else {
        console.error('No user data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setPostData(prevData => ({
        ...prevData,
        userId: userData.id,
        userName: userData.fullName,
        userImage: userData.image,
        pickUpFromUser: userData.address,
        score: userData.score
      }));
    }
  }, [userData]);

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      let newFile = {
        uri: result.assets[0].uri,
        type: `image/${result.assets[0].uri.split(".").pop()}`,
        name: `image.${result.assets[0].uri.split(".").pop()}`
      };
      handleUpload(newFile);
      setModalVisible(false);
    }
  }

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Sorry, we need camera permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      let newFile = {
        uri: result.assets[0].uri,
        type: `image/${result.assets[0].uri.split(".").pop()}`,
        name: `image.${result.assets[0].uri.split(".").pop()}`
      };
      handleUpload(newFile);
      setModalVisible(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fromScreen = route.params?.fromScreen || 'Home';
      setPreviousScreen(fromScreen);
    }, [route.params?.fromScreen])
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GET('Categories');
        setCategories(response);
        if (response.length > 0) {
          setSelectedCategory(response[0].categoryDesc);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const showActionSheet = () => {
    const options = categories.map(cat => cat.categoryDesc);

    Alert.alert(
      "Select Category",
      "",
      options.map(option => ({
        text: option,
        onPress: () => setSelectedCategory(option)
      })).concat([
        { text: "Cancel", style: "cancel" }
      ])
    );
  };

  const handleExit = () => {
    if (previousScreen) {
      navigation.navigate(previousScreen);
    } else {
      navigation.navigate('Home');
    }
  };

  const handleUpload = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'InventoryEye');
    data.append("cloud_name", "dqqe3zu2i");

    fetch("https://api.cloudinary.com/v1_1/dqqe3zu2i/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setSelectedPic(data.url);
      })
      .catch(err => {
        console.error("Error uploading image: ", err);
      });
  }

  const handleUploadPost = () => {
    const tagsArray = [color, company].filter(tag => tag !== '');
    const tagsString = JSON.stringify(tagsArray);
    setPostData(prevData => ({
      ...prevData,
      tags: tagsString
    }));

    console.log('Uploading post:', postData);
    // send postData to the API
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.exit}>
          <TouchableOpacity onPress={handleExit}>
            <Feather name="x" size={30} color="#111851" />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text style={styles.createHeader}>Create New Post</Text>
        </View>
        <View style={styles.uploadIcon}>
          <TouchableOpacity onPress={handleUploadPost}>
            <Feather name="upload" size={30} color="#111851" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.center}>
        <View style={styles.profile}>
          <View style={styles.imageContainer}>
            <Image source={profileImage} style={styles.image} />
          </View>
          <View>
            <Text style={styles.userName}>
              {userData?.fullName}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <TextInput
            multiline
            style={styles.contentText}
            placeholder='What product are you looking for ?'
            value={postData.content}
            onChangeText={(text) => setPostData({ ...postData, content: text })}
          />
        </View>
      </View>

      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.bottom}>
          <View style={styles.iconItem}>
            <TouchableOpacity style={styles.modalbtn} onPress={toggleModal}>
              <FontAwesome5 name="image" size={24} color="#111851" />
            </TouchableOpacity>
            <MaterialIcons name="category" size={24} color="#111851" />
            <FontAwesome name="pencil" size={24} color="#111851" />
            <Ionicons name="color-palette-outline" size={24} color="#111851" />
            <FontAwesome name="building-o" size={24} color="#111851" />
            <Octicons name="search" size={24} color="#111851" />
          </View>
          <View style={styles.inputItem}>
            {selectedPic ? (
              <Image source={{ uri: selectedPic }} style={styles.selectedImage} />
            ) : (
              <Text style={styles.imgText}>Select an image</Text>
            )}
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={showActionSheet}
            >
              <Text style={styles.categoryButtonText}>
                {selectedCategory || 'Select Category'}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder='product name'
              value={postData.productName}
              onChangeText={(text) => setPostData({ ...postData, productName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder='color'
              value={color}
              onChangeText={setColor}
            />
            <TextInput
              style={styles.input}
              placeholder='company'
              value={company}
              onChangeText={setCompany}
            />
            <GooglePlacesAutocomplete
              placeholder='Enter location'
              onPress={(data, details = null) => {
                console.log(data, details);
                // You can set the location state here
              }}
              query={{
                key: 'AIzaSyDxno5alotlZg-JxKYB30wq-6WWJXS0A6M',
                language: 'en',
              }}
              styles={{
                container: {
                  flex: 0,
                  width:'100%'
                },
                textInput: styles.input,
                listView: styles.autocompleteListView,
                row: styles.autocompleteRow,
              }}
              enablePoweredByContainer={false}
              fetchDetails={true}
              onFail={error => console.error(error)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.modalbtn} onPress={pickFromGallery}>
                      <Text style={styles.buttonText}>Open Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalbtn} onPress={pickFromCamera}>
                      <Text style={styles.buttonText} >Open Camera</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
    paddingTop:38
  },
  scrollContainer: {
    flexGrow: 1,
    //padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingBottom: 100 
    backgroundColor: '#F0F6FE',
  },
  center: {
    flex: 1,
    width: '100%',
  },
  top: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: '#C8DFEA',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  exit: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createHeader: {
    color: '#111851',
    fontWeight: 'bold',
    fontSize: 25,
  },
  center: {
    flex: 1,
    width: '100%',
  },
  profile: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    height: 80,
  },
  imageContainer: {
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
  userName: {
    fontSize: 20,
    color: '#111851',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  contentText: {
    fontSize: 18,
    color: 'black',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F6FE',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth:1,
    borderColor:'#ffff',
    height: 10
  },
  iconItem: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '20%',
    height: 250, // Changed from fixed height
  },
  inputItem: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '75%',
    height: 250, // Changed from fixed height
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height: 40,
    marginBottom: 10,
    fontSize: 16
  },
  imgText: {
    fontSize: 16,
    color: '#111851',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#F0F6FE',
    borderWidth: 1,
    borderColor: '#31a1e5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  categoryButtonText: {
    color: '#111851',
    fontSize: 16,
    textAlign: 'center',
  },
  modalbtn: {
    borderWidth: 1,
    borderColor: '#31A1E5',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#31A1E5',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#111851',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  selectedImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  autocompleteContainer: {
    zIndex: 3,
    width: '100%',
    marginBottom: 10,
  },
  autocompleteListView: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#31a1e5',
    borderRadius: 5,
    zIndex: 1000,
    elevation: 3,
  },
  autocompleteRow: {
    padding: 15,
    fontSize: 15,
  },
});