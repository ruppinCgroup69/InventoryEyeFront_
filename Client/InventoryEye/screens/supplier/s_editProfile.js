import React, { useState, useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, View, Platform, TextInput, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PUT, GET } from '../../api';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';

const ReviewSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const emailSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
});

const updateSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  address: yup.string().required('Address is required'),
});

export default function EditSProfile() {
  const googlePlacesRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [changedFields, setChangedFields] = useState({});
  const [isEmailEditble, setIsEmailEditble] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const togglePasswordModal = () => setPasswordModalVisible(!passwordModalVisible);
  const toggleModal = () => setModalVisible(!modalVisible);
  const [emailError, setEmailError] = useState('');
  const [user, setUser] = useState({
    id: 0,
    role: 0,
    lastSeen: '',
    fullName: '',
    emailAddress: '',
    password: '',
    birthDate: '',
    lat: 0,
    lng: 0,
    address: '',
    image: '',
    createdAt: '',
    score: 0,
    searchRadius: 0,
  });
  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('logged user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        const userDataId = (userData.id)

        const response = await GET(`Users/${userDataId}`);
        if (response) {
          setUser(prevUser => ({
            ...prevUser,
            ...response,
            searchRadius: parseFloat(response.searchRadius) || 0,
            lat: parseFloat(response.lat) || 0,
            lng: parseFloat(response.lng) || 0,
          }));
          console.log('Fetched user data:', response);
        } else {
          console.error('No data returned from GET request');
        }
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
    setNewEmail(user.emailAddress);
  }, [user.emailAddress]);

  const toggleEmailEdit = () => {
    if (isEmailEditble) {
      handleEmailUpdate();
    } else {
      setIsEmailEditble(true);
      setEmailError('');
    }
  };

  const handleInputChange = (field, value) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, [field]: value };
      return newUser;
    });

    setChangedFields(prevFields => {
      const newFields = { ...prevFields, [field]: true };
      return newFields;
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedFields = {
        role: user.role,
        lastSeen: new Date().toISOString(),
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        birthDate: user.birthDate,
        lat: user.lat,
        lng: user.lng,
        address: user.address,
        image: user.image,
        createdAt: user.createdAt,
        searchRadius: user.searchRadius
      };
      const result = await PUT(`Users/${user.emailAddress}`, updatedFields);

      if (result.ok) {
        Alert.alert('Success','Your details were changed successfully!');
        const updatedUser = {
          ...user,
          ...updatedFields,
        };
        console.log('updatedUser:', updatedUser)
        await AsyncStorage.setItem('logged user', JSON.stringify(updatedUser));

        setUser(updatedUser);
      } else {
        let errorMessage = 'Failed to update profile. ';
        if (result && result.data) {
          errorMessage += `Server response: ${result.data}`;
        } else if (result && result.message) {
          errorMessage += result.message;
        } else {
          errorMessage += 'Unknown error occurred.';
        }
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlUpdatePassword = async () => {
    setErrors({});
    console.log(newPassword)
    console.log(confirmPassword)
    try {
      await ReviewSchema.validate({ newPassword, confirmPassword }, { abortEarly: false });
      console.log(user.emailAddress)
      const result = await PUT(`Users/UpdatePassword`, { emailAddress: user.emailAddress, password: newPassword, fullName: '', address: '', image: '' });
      console.log(result)
      if (result.ok) {
        Alert.alert('success')
        togglePasswordModal()
      }
    }
    catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
        console.log("Validation errors:", newErrors);
      } else {
        console.log("Unexpected error:", err);
      }
    }
  }

  const handleEmailUpdate = async () => {
    console.log('newEmail', newEmail);
    if (!newEmail || newEmail === user.emailAddress) {
      setIsEmailEditble(false);
      return;
    }
  
    try {
      await emailSchema.validate({ emailAddress: newEmail });
      const result = await PUT(`Users/UpdateEmail/${user.id}`, { id: user.id, emailAddress: newEmail, fullName: '', address: '', image: '' });
      console.log('result', result);
  
      if (result.ok === true) {
        setUser(prevUser => ({ ...prevUser, emailAddress: newEmail }));
        console.log('user', user);
        try {
          const storedUser = await AsyncStorage.getItem('logged user');
          console.log('storedUser', storedUser);
          if (storedUser !== null) {
            const parsedUser = JSON.parse(storedUser);
            parsedUser.emailAddress = newEmail;
            await AsyncStorage.setItem('logged user', JSON.stringify(parsedUser));
            console.log('AsyncStorage updated with new email');
          }
        } catch (storageErr) {
          console.error('error updating AsyncStorage: ', storageErr);
        }
        alert('Success', 'Email updated');
        setIsEmailEditble(false);
        setEmailError('');
      } else {
        setEmailError('Failed to update email on the server');
        console.error('Failed to update email on the server');
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setEmailError(err.message);
        console.log('Validation error:', err.message);
      } else {
        setEmailError('An error occurred while updating email');
        console.error('Error updating email: ', err);
      }
      setIsEmailEditble(true);
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission Denied", "Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleUpload(result.assets[0].uri);
      setModalVisible(false);
    }
  }

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission Denied", "Sorry, we need camera permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      handleUpload(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const handleUpload = (uri) => {
    const data = new FormData();
    data.append('file', {
      uri: uri,
      type: `image/${uri.split(".").pop()}`,
      name: `image.${uri.split(".").pop()}`
    });
    data.append('upload_preset', 'InventoryEye');
    data.append("cloud_name", "dqqe3zu2i");

    fetch("https://api.cloudinary.com/v1_1/dqqe3zu2i/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUser(prevUser => ({ ...prevUser, image: data.url }));
        setChangedFields(prevFields => ({ ...prevFields, image: true }));
      })
      .catch(err => {
        console.error("Error uploading image: ", err);
        alert("Error", "Failed to upload image. Please try again.");
      });
  }
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>

        <Text style={styles.header}>Edit Profile</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.imageContainer}>
          {user.image ? (
            <Image source={{ uri: user.image }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.placeholderImage]} />
          )}
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>

        <View style={styles.fieldContainer}>

          <Text style={styles.label}>Full Name:</Text>
          <TextInput
            style={styles.input}
            value={user.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
            onBlur={() => console.log('Current fullName:', user.fullName)}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              keyboardType="email-address"
              value={newEmail}
              placeholder={user.emailAddress}
              editable={isEmailEditble}
              onChangeText={(text) => {
                setNewEmail(text);
                setEmailError('');
              }}
            />
          </View>
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TouchableOpacity style={styles.editEmailButton}
          onPress={toggleEmailEdit}>
          <Text style={styles.editEmailButtontxt}>{isEmailEditble ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address:</Text>
          <GooglePlacesAutocomplete
            ref={googlePlacesRef}
            placeholder={user.address}
            fetchDetails={true}
            query={{
              key: 'AIzaSyDxno5alotlZg-JxKYB30wq-6WWJXS0A6M',
              language: 'en',
            }}
            styles={{
              textInput: styles.input,
              container: {
                flex: 0,
                width: 250,
                zIndex: 1
              },
              listView: {
                position: 'absolute',
                top: 40,
                left: 0,
                right: 0,
                backgroundColor: 'white',
                borderRadius: 5,
                elevation: 3,
                zIndex: 2,
              },
            }}
            onPress={(data, details = null) => {
              if (details && details.geometry && details.geometry.location) {
                handleInputChange('address', data.description);
                handleInputChange('lat', details.geometry.location.lat);
                handleInputChange('lng', details.geometry.location.lng);
              } else {
                handleInputChange('address', data.description);
              }
            }}
          />
        </View>

      </View>
      <View style={styles.changeFieldContainer}>
        <TouchableOpacity style={styles.changePass} onPress={togglePasswordModal}>
          <Text>Change Password</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.changePref}>
          <Text>Change Preferences</Text>
        </TouchableOpacity> */}
      </View>
      <Modal
        visible={passwordModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={togglePasswordModal}
      >
        <TouchableWithoutFeedback onPress={togglePasswordModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                  {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity onPress={handlUpdatePassword} >
                      <View style={styles.modalPasButton} >
                        <Text style={styles.buttonPasText}>Save</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePasswordModal}>
                      <View style={styles.modalPasButton}>
                        <Text style={styles.buttonPasText}>Cancel</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.imageContainer}>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={styles.modalImageOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalImageContainer}>
                  <View style={styles.modalImageContent}>
                    <TouchableOpacity style={styles.modalImageButton} onPress={pickFromGallery}>
                      <Text style={styles.buttonImageText}>OPEN GALLERY </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalImageButton} onPress={pickFromCamera}>
                      <Text style={styles.buttonImageText}>OPEN CAMERA</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      <TouchableOpacity style={styles.UpdateButton} onPress={handleUpdate}>
        <Text style={styles.UpdateButtonText}>Update</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  formContainer: {
    zIndex: 1,
    width: '100%',
  },
  header: {
    fontSize: 40,
    color: '#111851',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 40
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  changeFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  changePass: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft:128,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#31A1E5',
    width: 245,
    marginTop: 15,
    //marginRight: 5
  },
  changePref: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#31A1E5',
    width: 180,
    marginLeft: 5,
    marginTop: 15

  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginTop: 8,
  },
  lable: {
    fontSize: 16,
    marginRight: 10,
    width: 100
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
  },
  datePicker: {
    width: '80%',
  },
  calendarIcon: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    height: 40,
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginTop: 8,
  },
  buttom: {
    flexDirection: 'row',
  },
  buttonsContainer: {
    marginTop: 15,
    zIndex: 0
  },
  UpdateButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#31A1E5',
    width: 180,
    marginTop: 30
  },
  UpdateButtonText: {
    color: '#111851',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 80,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#111851',
    borderWidth: 1,
  },
  placeholderImage: {
    backgroundColor: '#C8DFEA',
  },
  changePhotoText: {
    marginTop: 10,
    color: '#31A1E5',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    marginTop: 15,
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: 80,
  },
  buttonText: {
    fontSize: 16,
    color: '#111851',
    textAlign: 'center'
  },
  searchRadiusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
  },
  searchRadiusInput: {
    width: 200,
    marginRight: 10,
    textAlign: 'center'
  },
  kmLabel: {
    fontSize: 16,
    color: '#111851',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
  },
  emailInput: {
    flex: 1,
    marginRight: 10,
  },
  editEmailButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31A1E5',
    width: 60,
    marginLeft: 180
  },
  editEmailButtontxt: {
    color: 'black',
    textAlign: 'center'
  },
  modalPasButton: {
    marginTop: 15,
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: 80,
  },
  buttonPasText: {
    fontSize: 16,
    color: '#111851',
    textAlign: 'center'
  },
  modalButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImageContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalImageOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImageButton: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#31A1E5',
    padding: 15,
    borderRadius: 10,
  },
  buttonImageText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 0,
    marginBottom:2,
    marginLeft: 0,
    alignSelf: 'flex-start',
  },
});

