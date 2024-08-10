import { StyleSheet, Text, View, Platform, TextInput, Image, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState, useEffect } from 'react';
import { PUT } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile() {
  const currentDate = new Date();
  const maxDate = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());
  const minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDate());
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
  });

  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('logged user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        setUser({
          id: userData.id,
          role: userData.role,
          lastSeen: userData.lastSeen,
          fullName: userData.fullName,
          emailAddress: userData.emailAddress,
          password: userData.password,
          birthDate: userData.birthDate,
          lat: userData.lat,
          lng: userData.lng,
          address: userData.address,
          image: userData.image,
          createdAt: userData.createdAt,
          score: userData.score
        });
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


  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Full Name:</Text>
          <TextInput
            style={styles.input}
            value={user.fullName}
          />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Email:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={user.emailAddress}
          />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={user.password}
          />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Re Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={user.password}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.lable}>Birthdate:</Text>
          <View style={styles.inputContainer}>
            <DateTimePicker
              testID="dateTimePicker"
              value={user.birthDate ? new Date(user.birthDate) : new Date()}
              mode="date"
              minimumDate={minDate}
              maximumDate={maxDate}
              style={styles.datePicker}
            />
            <AntDesign name="calendar" size={24} color="rgba(17, 24, 81, 0.6)" style={styles.calendarIcon} />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.lable}>Address:</Text>
          <GooglePlacesAutocomplete
            placeholder='Enter address'
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
            currentLocation={user.address}
            onPress={(data, details = null) => {
              if (details && details.geometry && details.geometry.location) {
                setUser({
                  ...user,
                  address: data.description,
                  lat: details.geometry.location.lat,
                  lng: details.geometry.location.lng,
                });
              } else {
                setUser({
                  ...user,
                  address: data.description,
                });
              }
            }}
          />
        </View>
        <View style={styles.imageContainer} >
          <Text style={styles.lable}>Image:</Text>
          {user.image ? (
            <Image
              source={{ uri: user.image }}
              style={styles.image}
            />
          ) : (
            <Text>No image available</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.UpdateButton}>
        <Text style={styles.UpdateButtonText}>Update</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
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
    marginLeft: 10,
  },
});
