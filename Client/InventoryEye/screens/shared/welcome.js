import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MyHeader imageSize={200} title='InventoryEye' titleSize={48} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="LOG IN"
          buttonStyle={{
            height:50,
            backgroundColor: '#31a1e5',
            borderWidth: 2,
            borderColor: '#31a1e5',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 230,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View style={styles.register}>
      <View style={styles.buttonsContainer}>
        <Text style={styles.question}>Not registerd yet?</Text>
        <Button
          title="REGISTER"
          buttonStyle={{
            height:50,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#31a1e5',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 230,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: 'bold', color: '#111851' }}
        />
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    marginBottom:10,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  question: {
    textAlign: 'center',
  },
  register:{
    marginTop:11,
  },
})