import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Platform, Alert } from 'react-native';
import { Feather, FontAwesome5, MaterialIcons, Ionicons, FontAwesome, Octicons } from '@expo/vector-icons';
import { GET, POST } from '../../api';
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';
import Entypo from '@expo/vector-icons/Entypo';

export default function EditOrCreatePost() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const [previousScreen, setPreviousScreen] = useState('Home');
  const [selectedPic, setSelectedPic] = useState('');
  const toggleModal = () => setModalVisible(!modalVisible);
  const [userData, setUserData] = useState(null);
  const [color, setColor] = useState('');
  const [company, setCompany] = useState('');
  const googlePlacesRef = useRef();
  const [overallError, setOverallError] = useState('');
  const [errors, setErrors] = useState({});
  const [size, setSize] = useState('');
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
  const PostSchema = yup.object({
    productName: yup.string().required('Product name is required'),
    content: yup.string().required('Content is required'),
    color: yup.string().required('Color is required'),
    company: yup.string().required('Company is required'),
    image: yup.string().required('Please select an image'),
  });


  useEffect(() => {
  }, [userData]);

  useEffect(() => {
    if (postData.pickUpAddress && googlePlacesRef.current) {
      googlePlacesRef.current.setAddressText(postData.pickUpAddress);
    }
  }, [postData.pickUpAddress]);


  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('logged user');
      if (jsonValue != null) {
        const user = JSON.parse(jsonValue);
        setUserData(user);
        setPostData(prevData => ({
          ...prevData,
          pickUpFromUser: user.address,
          pickUpLat: user.lat,
          pickUpLng: user.lng,
          pickUpAddress: user.address,
        }));
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
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const showActionSheet = () => {
    Alert.alert(
      "Select Category",
      "",
      [
        ...categories.map(category => ({
          text: category.categoryDesc,
          onPress: () => {
            setSelectedCategory(category)
            isFashionCategorySelected()
          }
        })),
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  // const IconTextInput = ({ icon, placeholder, value, onChangeText, style }) => (
  //   <View style={[styles.iconTextInputContainer, style]}>
  //     {icon}
  //     <TextInput
  //       style={[styles.iconTextInput, { flex: 1 }]} 
  //       placeholder={placeholder}
  //       value={value}
  //       onChangeText={onChangeText}
  //     />
  //   </View>
  // );

  const isFashionCategorySelected = () => {
    if (!selectedCategory) {
      return false;
    }

    const fashionCategory = categories.find(category => category.categoryDesc === 'Clothing&Fashion');
    return fashionCategory && selectedCategory.categoryDesc === fashionCategory.categoryDesc;
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
        setPostData(prevData => ({ ...prevData, image: data.url }));
      })
      .catch(err => {
        console.error("Error uploading image: ", err);
      });
  }

  const handleUploadPost = async () => {
    if (!userData) {
      alert('Error: User data is not available. Please try again.');
      return;
    }
    setErrors({});
    setOverallError('');
    try {
      const postToValidate = {
        productName: postData.productName,
        content: postData.content,
        color: color,
        company: company,
        image:  postData.image,
      };
      await PostSchema.validate(postToValidate, { abortEarly: false });
      if (!selectedCategory) {
        throw new Error('Please select a category before uploading.');
      }
      const tagsArray = [color, company].filter(tag => tag !== '');
      const tagsString = JSON.stringify(tagsArray);
      const finalPostData = {
        ...postData,
        userId: userData.id,
        userName: userData.fullName,
        userImage: userData.image,
        createAt: new Date(),
        editedAt: new Date(),
        productName: postData.productName,
        content: postData.content,
        image: postData.image,
        tags: tagsString,
        category: selectedCategory.categoryId,
        categoryDesc: selectedCategory.categoryDesc,
        pickUpFromUser: userData.address,
        score: userData.score
      };
      const response = await POST('Posts', finalPostData)

      if (response && response.ok) {
        navigation.navigate('Home');
      }
      else {
        alert('An error occurred while uploading the post. Please try again.');
      }
    }
    catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        setOverallError('All fields must be filled in.');
      }
      else if (err.message === 'Please select a category before uploading.') {
        alert(err.message);
      }
      else {
        alert('An error occurred while uploading the post. Please try again.');
      }
    }
  };

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
            {userData && userData.image ? (
              <Image source={{ uri: userData.image }} style={styles.image} />
            ) : (
              <View style={[styles.image, styles.placeholderImage]} />
            )}
          </View>
          <View>
            <Text style={styles.userName}>
              {userData ? userData.fullName : 'Loading...'}
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
          {errors.content && <Text style={styles.errorText}>{errors.content}</Text>}
        </View>
      </View>

      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardShouldPersistTaps="handeld"
      >

        <View style={styles.bottom}>
          <View style={styles.inputItem}>
            <View style={styles.imageSelectionContainer}>
              {
                postData.image ? (
                  <Image source={{ uri: postData.image }} style={styles.selectedImage} />
                ) : (
                  <TouchableOpacity style={styles.imgBtn} onPress={toggleModal}>
                    <Text style={styles.imgText}> <FontAwesome5 name="image" style={styles.camIcon} size={24} color="#111851" />  Upload Image</Text>
                  </TouchableOpacity>
                )
              }
            </View>

            <TouchableOpacity
              style={[styles.input, styles.categoryButton]}
              onPress={showActionSheet}
            >
              <MaterialIcons name="category" size={24} color="#111851" />
              <Text style={styles.categoryButtonText}>
                {selectedCategory ? selectedCategory.categoryDesc : 'Select Category'}
              </Text>
            </TouchableOpacity>

            {/* <IconTextInput
              icon={<FontAwesome name="pencil" size={24} color="#111851" style={styles.inputIcon} />}
              placeholder="Product name"
              value={postData.productName}
              onChangeText={(text) => setPostData({ ...postData, productName: text })}
              style={styles.input}
            />

            <IconTextInput
              icon={<Ionicons name="color-palette-outline" size={24} color="#111851" />}
              placeholder="Color"
              value={color}
              onChangeText={setColor}
              style={styles.input}
            />

            {isFashionCategorySelected() && (
              <IconTextInput
                icon={<Entypo name="ruler" size={24} color="#111851" />}
                style={[styles.input, styles.sizeInput]}
                placeholder='Size'
                value={size}
                onChangeText={setSize}
              />
            )}

            <IconTextInput
              icon={<FontAwesome name="building-o" size={24} color="#111851" />}
              placeholder="Company"
              value={company}
              onChangeText={setCompany}
              style={styles.input}
            /> */}

            <TextInput
              placeholder="Product name"
              value={postData.productName}
              onChangeText={(text) => setPostData({ ...postData, productName: text })}
              style={styles.input}
            />

            <TextInput
              placeholder="Color"
              value={color}
              onChangeText={setColor}
              style={styles.input}
            />

            {isFashionCategorySelected() && (
              <TextInput
                style={[styles.input, styles.sizeInput]}
                placeholder='Size'
                value={size}
                onChangeText={setSize}
              />
            )}

            <TextInput
              placeholder="Company"
              value={company}
              onChangeText={setCompany}
              style={styles.input}
            />


            <GooglePlacesAutocomplete
              icon={<Octicons name="search" size={24} color="#111851" />}
              ref={googlePlacesRef}
              placeholder={postData.pickUpAddress}
              onPress={(data, details = null) => {
                setPostData(prev => ({
                  ...prev,
                  pickUpAddress: data.description,
                  pickUpLat: details?.geometry?.location?.lat || prev.pickUpLat,
                  pickUpLng: details?.geometry?.location?.lng || prev.pickUpLng,
                }));
              }}
              query={{
                key: 'AIzaSyDxno5alotlZg-JxKYB30wq-6WWJXS0A6M',
                language: 'en',
              }}
              styles={{
                container: {
                  flex: 0,
                  width: '100%',
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
        {overallError ? <Text style={styles.overallErrorText}>{overallError}</Text> : null}
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
                  <TouchableOpacity style={styles.modalButton} onPress={pickFromGallery}>
                    <Text style={styles.buttonText}>OPEN GALLERY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={pickFromCamera}>
                    <Text style={styles.buttonText}>OPEN CAMERA</Text>
                  </TouchableOpacity>
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
    paddingTop: 38
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'left',
    justifyContent: 'flex-start',
    backgroundColor: '#F0F6FE',

  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#31A1E5',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  placeholderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 7,
  },
  placeholderText: {
    color: '#111851',
    fontSize: 16,
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
    alignItems: 'left',
    flexDirection: 'row',
    backgroundColor: '#F0F6FE',
    paddingVertical: 10,
    //paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#ffff',
    height: 10,
    paddingTop: 20,
    justifyContent: 'flex-start',
  },
  inputItem: {
    alignItems: 'left',
    justifyContent: 'flex-start',
    width: '80%',
    paddingHorizontal: 15,
  },
  iconTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: -5,
    height: 40,
    width: '100%',
  },
  iconTextInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  input: {
    alignText: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 8,
    marginVertical: 10,
    height: 40,
    marginBottom: -5,
    fontSize: 16
  },
  sizeInput: {
    marginTop: 10, // Increase this value to add more space above the Size input
  },
  imgText: {
    fontSize: 16,
    color: '#111851',
    marginBottom: 10,
    backgroundColor: '#F0F6FE',
    borderWidth: 1,
    borderColor: '#31a1e5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 'auto',
    textAlign: 'left',
    paddingLeft: 10

  },
  imgContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  imgBtn: {
    width: '100%',
  },
  categoryButton: {
    backgroundColor: '#ffff',
    borderWidth: 1,
    borderColor: '#31a1e5',
    borderRadius: 10,
    padding: 10,
    marginBottom: -5,
    marginVertical: 10,
    width: '100%',
  },
  categoryButtonText: {
    color: 'rgba(17, 24, 81, 0.3)',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 7
  },
  modalbtn: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#31a1e5',
    padding: 10,
    borderRadius: 10,
  },
  imageSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: -15,
    width: '100%',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#111851',
    fontSize: 11,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10
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
  overallErrorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },

});