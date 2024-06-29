import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <View style={styles.container}>
        <View style={styles.header}>
          <MyHeader imageSize={130} title='Log In' titleSize={45} />
        </View>
        <View>
          <Text style={styles.lable}>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter your email'
            keyboardType="email-address" />
        </View>
        <View style={styles.password}>
          <Text style={styles.lable}>Password:</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter your password'
            secureTextEntry={true} />
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
            onPress={() => navigation.navigate('UserTabs')} 
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
      </View>
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