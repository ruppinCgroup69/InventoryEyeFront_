import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import * as yup from 'yup';
import { POST } from '../../api';

const ReviewSchema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  emailAddress: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  rePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
    address: yup.string().required('Address is required'),
});

export default function S_Register() {
  const navigation = useNavigation();
  const route = useRoute();
  const { UserType } = route.params;
  const currentDate = new Date();

  const [user, setUser] = useState({
    id:0,
    fullName: '',
    emailAddress: '',
    password: '',
    birthdate: '',
    lat: 0,
    lng: 0,
    address: '',
    image: 'string',
    createdAt: '',
    lastSeen: '',
    score: 0,
    role: ''
  });
  
  const [rePassword, setRePassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSupplierRegister = async () => {
    setErrors({});
    try {
      const updatedUser = {
        id:user.id,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        password: user.password,
        birthdate: currentDate, 
        lat: user.lat,
        lng: user.lng,
        address: user.address,
        image: user.image,
        createdAt: currentDate,
        lastSeen: currentDate,
        score: user.score,
        role: UserType,
      };

      await ReviewSchema.validate({
        ...updatedUser,
        rePassword: rePassword,
      }, { abortEarly: false });

      console.log('Sending user data to the server:', updatedUser);
      const response = await POST('Users', updatedUser);
      if (response != "good") {
        alert('Failed to register user: No response from server');
        return;
      }
      alert('User registered successfully!');
      navigation.navigate('Login');
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
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MyHeader imageSize={120} title='Supplier Register' titleSize={33} />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Store Name:</Text>
          <TextInput
            style={styles.input}
            value={user.fullName}
            onChangeText={(text) => setUser({ ...user, fullName: text })}
          />
        </View>
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Email:</Text>
          <TextInput
            style={styles.input}
            value={user.emailAddress}
            onChangeText={(text) => setUser({ ...user, emailAddress: text })}
            keyboardType="email-address"
          />
        </View>
        {errors.emailAddress && <Text style={styles.errorText}>{errors.emailAddress}</Text>}
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Password:</Text>
          <TextInput
            style={styles.input}
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
            secureTextEntry={true} />
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Re Password:</Text>
          <TextInput
            style={styles.input}
            value={rePassword}
            onChangeText={(text) => setRePassword(text)}
            secureTextEntry={true}
          />
        </View>
        {errors.rePassword && <Text style={styles.errorText}>{errors.rePassword}</Text>}
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Address:</Text>
          <TextInput style={styles.input}
            value={user.address}
            onChangeText={(text) => setUser({ ...user, address: text })}
          />
        </View>
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        <View style={styles.buttom}>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterType')}>
            <Ionicons name="arrow-back-circle-outline" size={26} color="#111851" style={{ marginTop: '150%' }} />
          </TouchableOpacity>
          <View style={styles.buttonsContainer}>
            <Button
              title="Register"
              buttonStyle={{
                height: 50,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#31a1e5',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ color: '#111851', fontSize: 23 }}
              onPress={handleSupplierRegister}>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '4%',
    marginBottom: 30,
  },
  lable: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    height: 40,
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginTop: 8,
  },
  buttonsContainer: {
    marginTop: 15,
  },
  buttom: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});
