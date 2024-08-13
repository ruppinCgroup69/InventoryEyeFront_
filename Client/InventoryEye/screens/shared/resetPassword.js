import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import emailjs from '@emailjs/react-native';
import { PUT } from '../../api';
import { generateCustomPassword } from '../../utils';

export default function ResetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState(generateCustomPassword(8));

  const handleResetPassword = async () => {
    const serviceId = 'service_w7aq4tg';
    const templateID = 'template_4qrf21n';
    const publicKey = 'N8FzCwPaTCLL_wCf3';

    const templateParams = {
      to_email: email,
      logo_url: 'https://res.cloudinary.com/dqqe3zu2i/image/upload/v1723477969/appLogo_xpnmsd.png',
      new_password: newPassword,
    };
    
    console.log(newPassword)
    const result = await PUT(`Users/UpdatePassword`, { emailAddress: email, password: newPassword, fullName: '', address: '', image: '' });
    console.log(result)
    if (result.ok) {
      emailjs.send(serviceId, templateID, templateParams, { publicKey })
        .then((response) => {
          console.log('Success:', response);
          navigation.navigate('SuccessResetPassword');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    else {
      console.log('error')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.header}>
          <MyHeader imageSize={130} title='Reset Password' titleSize={38} />
        </View>
        <View>
          <Text style={styles.lable}>Email:</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter your email'
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Reset Password"
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
            onPress={handleResetPassword}  // Updated here
          />
        </View>
        <View style={styles.login}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
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
  login: {
    marginTop: 15,
  },
});
