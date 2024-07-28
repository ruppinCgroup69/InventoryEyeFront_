import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

//recives props (ScoreNum)
export default function Score({ ScoreNum }) {
  return (
    <View>
      <AntDesign name="star" size={50} color="#31A1E5" style={styles.starIcon} />
      <View style={styles.scoreNumContainer}>
        <Text style={styles.scorenum}>{ScoreNum}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  starIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumContainer: {
    position: 'absolute',
    top: '25%',
    left: '11%',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scorenum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
})