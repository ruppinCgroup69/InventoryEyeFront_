import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function RegisterType() {

  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MyHeader imageSize={200} title='InventoryEye' titleSize={48} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Customer"
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
          onPress={() => navigation.navigate('C_Register', {UserType:1})}>
            </Button>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Supplier"
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
          onPress={() => navigation.navigate('S_Register', {UserType:2})}>
          </Button>
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#EAF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    marginBottom:10,
  },
  buttonsContainer: {
    marginTop: 10,
  },
})