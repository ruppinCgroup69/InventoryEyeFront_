import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function SuccessResetPassword() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MyHeader imageSize={180} title='Your Password Has Been Successfuly Restored' titleSize={30} />
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.recovery}>
        Password recovery instructions have been sent to your email
        </Text>
      </View>
  
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          buttonStyle={{
            height:50,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#31a1e5',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 230,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: 'bold', color: '#111851', fontSize:23 }}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF0F3',
  },
  header:{
    marginBottom:10,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  recovery:{
    textAlign:'center',
    color:'#111851',
    fontSize:18,
    marginHorizontal:25,
  },
  txtContainer:{
marginBottom:7,
  },
})