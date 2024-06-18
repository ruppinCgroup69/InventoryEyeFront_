import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';

export default function RegisterType() {
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
        />
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
  },
  header:{
    marginBottom:10,
  },
  buttonsContainer: {
    marginTop: 10,
  },
})