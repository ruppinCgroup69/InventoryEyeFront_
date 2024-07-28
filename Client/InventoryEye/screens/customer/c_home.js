import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import C_header from '../../components/c_home/c_header'
import profileImage from '../../images/profileImage.jpg'
import Yarden from '../../images/yarden.jpg'
import Adar from '../../images/ADAR.jpeg'
import Lipstick from '../../images/Lipstic.jpeg'
import Plates from '../../images/plate set.jpeg'
import Sahlav from '../../images/Sahlav.jpg'
import Sharon from '../../images/sharon.jpg'
import productImage from '../../images/productImage.jpg';
import Search from '../../components/c_home/search'
import { Feather } from '@expo/vector-icons';
import Post from '../../components/c_home/post'
import { useNavigation } from '@react-navigation/native';

export default function C_home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <C_header fullName='Nelly' notiNum={12} profileImage={profileImage} userScore={70} />
      </View>
      <View style={styles.searchView}>
        <Search />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.middle}>
          <Text style={styles.inEye}>Keep an eye on...</Text>
          <TouchableOpacity style={styles.filterContainer}>
            <Text style={styles.filterBy}>Filter by</Text>
            <Feather name="filter" size={20} color="rgba(17, 24, 81, 0.6)" />
          </TouchableOpacity>
        </View>
        <View style={styles.postsView}>
          <TouchableOpacity onPress={() => navigation.navigate('Post_Det')}>
            <View style={styles.postContainer}>
              <Post style={styles.posts} content='In the search for this headphones, anyone who knows where they can be purchased will be very helpful!' productName='Headphones' category='Electronics' productImage={productImage} profileImage={profileImage} fullName='Gal Cohen' score={5} publishedDate='21/06/2024' publishedHour='17:24' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.postContainer}>
              <Post style={styles.posts} content='In the search for this Lipstick! Help me' productName='Lipstick' category='Care&Cosmetics' productImage={Lipstick} profileImage={Yarden} fullName='Yarden Assulin' score={17} publishedDate='24/07/2024' publishedHour='14:30' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.postContainer}>
              <Post style={styles.posts} content='cant find this beautiful plate set. Who knows where to find it?' productName='Plate set' category='Home Furniture' productImage={Plates} profileImage={Sharon} fullName='Sharon Tebul' score={10} publishedDate='23/07/2024' publishedHour='11:06' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.postContainer}>
              <Post style={styles.posts} content='Looking for this orchid at a good price to plant in my garden. can help?' productName='Orchid' category='Garden&Yard' productImage={Sahlav} profileImage={Adar} fullName='Adar Biton' score={2} publishedDate='21/06/2024' publishedHour='17:24' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.postContainer}>
              <Post style={styles.posts} content='In the search for these headphones, anyone who knows where they can be purchased will be very helpful!' productName='Headphones' category='Electronics' productImage={productImage} profileImage={profileImage} fullName='Gal Cohen' score={5} publishedDate='21/06/2024' publishedHour='17:24' />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
  },
  topContainer: {
    paddingTop: 40,
    height: '15%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  searchView: {
    //backgroundColor:'yellow',
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    //backgroundColor:'red'
  },
  inEye: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
    marginLeft: '25%',
  },

  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBy: {
    fontSize: 12,
    color: '#111851',
    marginRight: 5,
  },
  postContainer: {
    width: '100%',
    //borderWidth:1,
    height: 130,
    marginBottom: 7,
  },
})