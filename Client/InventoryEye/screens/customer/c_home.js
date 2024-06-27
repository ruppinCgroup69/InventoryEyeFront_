import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import C_header from '../../components/c_home/c_header'
import profileImage from '../../images/profileImage.jpg'
import productImage from '../../images/productImage.jpg';
import Search from '../../components/c_home/search'
import { Feather } from '@expo/vector-icons';
import Post from '../../components/c_home/post'

export default function C_home() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <C_header fullName='Sharon Tebul' notiNum={12} profileImage={profileImage} userScore={70} />
      </View>
      <View style={styles.searchView}>
        <Search />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.middle}>
          <Text style={styles.inEye}>Keep an eye on...</Text>
          <TouchableOpacity style={styles.filterContainer}>
            <Text style={styles.filterBy}>Filter by</Text>
            <Feather name="filter" size={20} color="rgba(17, 24, 81, 0.6)"  />
          </TouchableOpacity>
        </View>
        <View style={styles.postsView}>
          <TouchableOpacity>
        <View style={styles.postContainer}>
          <Post style={styles.posts} content='In the search for these headphones, anyone who knows where they can be purchased will be very helpful!' productName='Headphones' category='Electronics' productImage={productImage} profileImage={profileImage} fullName='Gal Cohen' score={5} publishedDate='21/06/2024' publishedHour='17:24'/>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.postContainer}>
          <Post style={styles.posts} content='In the search for these headphones, anyone who knows where they can be purchased will be very helpful!' productName='Headphones' category='Electronics' productImage={productImage} profileImage={profileImage} fullName='Gal Cohen' score={5} publishedDate='21/06/2024' publishedHour='17:24'/>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.postContainer}>
          <Post style={styles.posts} content='In the search for these headphones, anyone who knows where they can be purchased will be very helpful!' productName='Headphones' category='Electronics' productImage={productImage} profileImage={profileImage} fullName='Gal Cohen' score={5} publishedDate='21/06/2024' publishedHour='17:24'/>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.postContainer}>
          <Post style={styles.posts} content='In the search for these headphones, anyone who knows where they can be purchased will be very helpful!' productName='Headphones' category='Electronics' productImage={productImage} profileImage={profileImage} fullName='Gal Cohen' score={5} publishedDate='21/06/2024' publishedHour='17:24'/>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.postContainer}>
          <Post style={styles.posts} content='In the search for these headphones, anyone who knows where they can be purchased will be very helpful!' productName='Headphones' category='Electronics' productImage={productImage} profileImage={profileImage} fullName='Gal Cohen' score={5} publishedDate='21/06/2024' publishedHour='17:24'/>
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
  },
  topContainer: {
    paddingTop: 40,
    height: '15%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inEye: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
    marginLeft:'25%',
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
  postContainer:{
    width:'100%',
    //borderWidth:1,
    height:130,
    marginBottom:7,
  },
})