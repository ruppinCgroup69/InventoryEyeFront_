import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function PostsHistory({ Post, postId }) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Post_Det', { postId })}>
        {Post && (
          <Image
            source={typeof Post === 'string' ? { uri: Post } : Post}
            style={styles.productimage}
          />
        )}
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
    marginLeft: '3%',
    marginTop: '5%'
  },

})

