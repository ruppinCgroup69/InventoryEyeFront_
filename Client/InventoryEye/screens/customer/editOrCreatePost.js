import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { GET, POST } from '../../api';
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

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
  const [addressUpdated, setAddressUpdated] = useState(false);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const [postData, setPostData] = useState({
    postId: 0,
    userId: 0,
    userName: '',
    userImage: '',
    createAt: new Date(),
    editedAt: new Date(),
    productName: '',
    content: '',
    image: '',
    tags: '',
    category: 0,
    pickUpFromUser: '',
    pickUpLat: 0,
    pickUpLng: 0,
    pickUpAddress: '',
    categoryDesc: '',
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
      console.log('postData.pickUpAddress', postData.pickUpAddress);
      console.log('googlePlacesRef.current', googlePlacesRef.current);
      console.log(postData.pickUpAddress && googlePlacesRef.current);

      googlePlacesRef.current.setAddressText(postData.pickUpAddress);
      console.log(postData.pickUpAddress)
    }
  }, [postData.pickUpAddress]);

  useEffect(() => {
    if (userData && userData.address) {
      setPostData(prevData => ({
        ...prevData,
        pickUpFromUser: userData.address,
        pickUpAddress: userData.address,
        pickUpLat: userData.lat,
        pickUpLng: userData.lng,
      }));
    }
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('logged user');
      if (jsonValue != null) {
        const user = JSON.parse(jsonValue);
        setUserData(user);
        console.log(user);
        setPostData(prevData => ({
          ...prevData,
          pickUpFromUser: user.address,
          pickUpLat: user.lat,
          pickUpLng: user.lng,
          pickUpAddress: user.address
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

  const handleAddressChange = (data, details = null) => {
    setAddressUpdated(true);
    setPostData(prev => ({
      ...prev,
      pickUpAddress: data.description,
      pickUpLat: details?.geometry?.location?.lat || prev.pickUpLat,
      pickUpLng: details?.geometry?.location?.lng || prev.pickUpLng,
    }));
  };

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
        image: postData.image,
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
        pickUpFromUser: userData.address, // This remains unchanged
        pickUpAddress: addressUpdated ? postData.pickUpAddress : userData.address,
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.top}>
          <View style={styles.exit}>
            <TouchableOpacity onPress={handleExit}>
              <Feather name="x" size={30} color="#111851" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.Header}>Create New Post</Text>
          </View>
          <View style={styles.uploadIcon}>
            <TouchableOpacity onPress={handleUploadPost}>
              <Feather name="upload" size={30} color="#111851" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.mainContent}>
            <View style={styles.center}>
              <View style={styles.profile}>
                <View style={styles.imageContainer}>
                  {userData && userData.image ? (
                    <Image source={{ uri: userData.image }} style={styles.image} />
                  ) : (
                    <View style={styles.image} />
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
                  placeholder='What are you looking for today ?'
                  value={postData.content}
                  onChangeText={(text) => setPostData({ ...postData, content: text })}
                />
                {errors.content && <Text style={styles.errorText}>{errors.content}</Text>}
              </View>
            </View>

            <View style={styles.bottom}>
              <View style={styles.inputItem}>
                <GooglePlacesAutocomplete
                  icon={<Octicons name="search" size={24} color="#111851" />}
                  ref={googlePlacesRef}
                  placeholder={postData.pickUpAddress || userData?.address || 'Enter address'}
                  onPress={handleAddressChange}
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

                <TouchableOpacity
                  style={[styles.input, styles.categoryButton]}
                  onPress={showActionSheet}
                >
                  <Text style={styles.categoryButtonText}>
                    {selectedCategory ? selectedCategory.categoryDesc : 'Select Category'}
                  </Text>
                </TouchableOpacity>

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

                <View style={postData.image ? null : styles.inputImage}>
                  {postData.image ? (
                    <TouchableOpacity onPress={toggleModal}>
                      <Image source={{ uri: postData.image }} style={styles.selectedImage} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.imgBtn} onPress={toggleModal}>
                      <Text style={styles.imgText}>
                        <FontAwesome5 name="image" size={24} color="#111851" /> Upload Image
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

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
                    <Text style={styles.buttonText}>OPEN GALLERY </Text>
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
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({

  container: {
    height: '100%'
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '10%',
    backgroundColor: '#C8DFEA',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    // marginTop: 35,
  },
  exit: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Header: {
    fontSize: 20,
    color: '#111851',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
  },
  center: {
    flex: 1,
    height: '30%',
  },
  imageContainer: {
    alignItems: 'right',
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
    paddingLeft: 8
  },
  profile: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    height: 85,
  },
  contentText: {
    // backgroundColor: 'white'
  },
  bottom: {
    height: '60%',
    backgroundColor: '#F0F6FE',
    // backgroundColor: 'yellow'
  },
  inputItem: {
    alignItems: 'left',
    justifyContent: 'flex-start',
    width: '80%',
    paddingHorizontal: 15,
    //  backgroundColor: 'red',
    marginVertical: 30
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
  categoryButtonText: {
    color: 'rgba(17, 24, 81, 0.3)',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 0
  },
  imageSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: -15,
    width: '100%',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 90,
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 10,
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imgText: {
    fontSize: 16,
    color: 'black',
  },
  inputImage: {
    alignText: 'left',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '60%',
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
  }

});

