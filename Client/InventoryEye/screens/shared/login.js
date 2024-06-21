import { StyleSheet, Text, View, TextInput,KeyboardAvoidingView,Platform    } from 'react-native'
import React from 'react'
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';

export default function Login() {
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
        <Text>I forgot my password</Text>
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
        />
      </View>
      <View style={styles.register}>
        <Text>Don't have an account yet? <Text style={styles.now}>Register now!</Text></Text>
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
  register:{
marginTop:15,
  },
  forgot:{
marginTop:10
  },
  now:{
color:'#111851',
  },
})