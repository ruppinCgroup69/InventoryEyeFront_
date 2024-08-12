import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Platform, TextInput, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PUT, GET } from '../../api';
import * as ImagePicker from 'expo-image-picker';


export default function EditProfile() {
  const currentDate = new Date();
  const maxDate = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());
  const minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDate());
  const googlePlacesRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const [changedFields, setChangedFields] = useState({});
  const [isEmailEditble, setIsEmailEditble] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  
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

      if (result && result.emailAddress) {
        alert('Your details were changed successfully!');
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

  const handleEmailUpdate = async () => {
    console.log('newEmail', newEmail)
    if (!newEmail || newEmail === user.emailAddress) {
        setIsEmailEditble(false)
        return
    }
    try {
        const result = await PUT(`Users/UpdateEmail/${user.id}`, { emailAddress: newEmail, fullName: '', address: '', image: '' });
        console.log('result', result)
        if (result && result.ok) {
            setUser(prevUser => ({ ...prevUser, emailAddress: newEmail }));
            console.log('user', user)
            try {
                const storedUser = await AsyncStorage.getItem('logged user');
                console.log('storedUser', storedUser)
                if (storedUser !== null) {
                    const parsedUser = JSON.parse(storedUser);
                    console.log('parsedUser', parsedUser)
                    parsedUser.emailAddress = newEmail;
                    console.log('parsedUser.emailAddress', parsedUser.emailAddress)
                    await AsyncStorage.setItem('logged user', JSON.stringify(parsedUser));
                    console.log('AsyncStorage updated with new email')
                }
            }
            catch (storageErr) {
                console.error('error updating AsyncStorage: ', storageErr)
            }
            alert('Success', 'email updated')
            setIsEmailEditble(false)
        }
        else {
            alert('error', 'failed to update email')
        }
    }
    catch (err) {
        console.error('error updating email: ', err)
        alert('Error', 'An error occurred while updating email.')
    }
    finally {
        setIsEmailEditble(false);
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
              style={styles.input}
              keyboardType="email-address"
              value={newEmail}
              placeholder={user.emailAddress}
              editable={isEmailEditble}
              onChangeText={setNewEmail}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.editEmailButton}
             onPress={toggleEmailEdit}>
              <Text style={styles.editEmailButtontxt}>{isEmailEditble? 'Save':'Edit'}</Text>
            </TouchableOpacity>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Birthdate:</Text>
          <View style={styles.inputContainer}>
            <DateTimePicker
              testID="dateTimePicker"
              value={user.birthDate ? new Date(user.birthDate) : new Date()}
              mode="date"
              minimumDate={minDate}
              maximumDate={maxDate}
              style={styles.datePicker}
              onChange={(event, selectedDate) => {
                handleInputChange('birthDate', selectedDate.toISOString());
              }}
            />
            <AntDesign name="calendar" size={24} color="rgba(17, 24, 81, 0.6)" style={styles.calendarIcon} />
          </View>
        </View>
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

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Radius Range:</Text>
          <View style={styles.searchRadiusContainer}>
            <TextInput
              style={[styles.input, styles.searchRadiusInput]}
              placeholder={user.searchRadius.toString()}
              value={parseFloat(user.searchRadius)}
              onChangeText={(text) => handleInputChange('searchRadius', text)}
              keyboardType="numeric"
            />
            <Text style={styles.kmLabel}>km</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
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
    marginTop: 55
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: '100%',
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
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    borderWidth:1,
    borderColor:'#31A1E5',
    width:60,
    marginLeft:180
  },
  editEmailButtontxt: {
    color: 'black',
    textAlign:'center'
  },
});
