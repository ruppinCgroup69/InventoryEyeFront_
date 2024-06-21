import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyHeader from '../../components/shared/myHeader';

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MyHeader imageSize={200} title='InventoryEye' titleSize={48} />
      </View>
      <View>
        <Text style={styles.eye}>
        Keeping An Eye On It
        </Text>
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
  header: {
    marginBottom: 10,
  },
  eye:{
    textAlign:'center',
    color:'#111851',
    fontSize:22,
    marginHorizontal:30,
  },
})