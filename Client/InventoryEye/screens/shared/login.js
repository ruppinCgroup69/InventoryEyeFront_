import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { POST } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
        const response = await POST('Users/login', { emailAddress, password, fullName: '', address: '', image: '' });
        console.log('response', response);
        if (response?.ok) {
            try {
                await AsyncStorage.setItem("logged user", JSON.stringify(response.date));
                if (response.date.role === 2) {
                  navigation.navigate('UserTabs', { screen: 'Home', params: { user: response.date } });
              } else if (response.date.role === 3) {
                  navigation.navigate('SupplierTabs', { screen: 'Home', params: { user: response.date } });
              } else {
                  alert('Unknown user type.');
              }
            } catch (storageError) {
                console.error('AsyncStorage error:', storageError);
            }
        } else {
            alert('Login failed. Please check your email and password.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <MyHeader imageSize={130} title='Log In' titleSize={45} />
        </View>
        <View>
          <Text style={styles.lable}>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter your email'
            keyboardType="email-address"
            value={emailAddress}
            onChangeText={setEmailAddress} />
        </View>
        <View style={styles.password}>
          <Text style={styles.lable}>Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter your password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword} />
        </View>
        <View style={styles.forgot}>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text>I forgot my password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Enter"
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
            onPress={handleLogin}
          />
        </View>
        <View style={styles.registerTextContainer}>
          <Text style={styles.registerText}>Don't have an account yet?</Text>
          <TouchableOpacity
            style={styles.registerNowContainer}
            onPress={() => navigation.navigate('RegisterType')}  >
            <Text style={styles.registerNowText}> Register now!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF0F3',
  },
  header: {
    marginBottom: 10,
  },
  buttonsContainer: {
    marginTop: 30,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#31a1e5',
    borderRadius: 30,
    backgroundColor: 'white',
    width: 250,
    height: 50,
    paddingHorizontal: 17,
  },
  lable: {
    marginLeft: 20,
    marginBottom: 7,
    fontSize: 16,
  },
  password: {
    marginTop: 25,
  },
  registerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  forgot: {
    marginTop: 10
  },
  registerText: {
    //marginRight: 8,
  },
  registerNowContainer: {
    //  backgroundColor: 'green',
  },
  registerNowText: {
    color: '#111851',
  },
})