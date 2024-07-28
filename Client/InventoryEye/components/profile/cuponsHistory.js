import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

//recives props (Number of bonus, bonus)
export default function CuponsHistory({  bonusPic }) {
  return (
    <View>
      <TouchableOpacity>
        <Image source={bonusPic} style={styles.bonusimage} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bonusimage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: '#111851',
    borderWidth: 1,
    marginLeft: '3%'
  },
})