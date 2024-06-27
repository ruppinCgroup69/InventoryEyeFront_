import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

export default function EditOrCreatePost({ fullName, profileImage }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.uploadIcon}>
          <Feather name="upload" size={30} color="#111851" />
        </View>
        <View style={styles.title}>
          <Text style={styles.createHeader}>Create New Post</Text>
        </View>
        <View style={styles.exit}>
          <TouchableOpacity>
            <Feather name="x" size={30} color="#111851" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.center}>
        <View style={styles.profile}>
          <View style={styles.imageContainer}>
            <Image source={profileImage} style={styles.image} />
          </View>
          <View>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.question}>What product are you looking for ?</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText}>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem
            Ipsum passages, and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.IconsList}>

        </View>

        <View style={styles.selectList}>

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
  top: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    height: '12%',
    width: '100%',
    backgroundColor: '#C8DFEA',
    marginTop: 40,
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: '2'
  },
  exit: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createHeader: {
    color: '#111851',
    fontWeight: 'bold',
    fontSize: 25,
  },
  center: {
    position: 'absolute',
    flex: 1, //
    top: '12%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '44%',
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
    borderBottomColor: '#BCB7B7',
    borderBottomWidth: '2'
  },
  profile: {
    flexDirection: 'row',
    width: '100%', // Take full width
    paddingTop: 10,
    alignItems: 'center',
    height: '20%', //
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#111851',
    borderWidth: 1,
    margin: 10,
  },
  imageContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: '20',
    color: '#111851',
    fontWeight: 'bold',
  },
  question: {
    fontSize: '15',
    color: '#111851',
  },
  content: {
    height: '80%',
    width: '100%'
  },
  contentText: {
    fontSize: '18',
    color: 'black',
    paddingTop: 10,
    paddingHorizontal: 8
  }

})