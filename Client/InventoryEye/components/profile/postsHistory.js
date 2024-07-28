import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

//recives props (Number of posts, Posts)
export default function PostsHistory({  Post }) {
  return (
    <View>

        <TouchableOpacity>
          <Image source={Post} style={styles.productimage} />
        </TouchableOpacity>
    </View>


  )
}

const styles = StyleSheet.create({
  productimage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: '#111851',
    borderWidth: 1,
    marginLeft: '3%'
  },

})