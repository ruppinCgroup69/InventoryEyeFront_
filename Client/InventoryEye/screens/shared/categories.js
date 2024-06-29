import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import C_header from '../../components/c_home/c_header'
import Search from '../../components/c_home/search'
import profileImage from '../../images/profileImage.jpg'
import toiletteAndHygiene from '../../images/Toiletries&hygiene.jpg'
import clothingAndfashion from '../../images/clothing&fashion.jpg'
import sportsAndtraining from '../../images/sports&training.jpg'


export default function Categories() {


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <C_header fullName='Sharon' notiNum={12} profileImage={profileImage} userScore={70} />
      </View>
      <View style={styles.middleContainer}>
        <Search />
      </View>
      <View style={styles.inEye}>
          <Text style={styles.keepEyeText}>Keep an eye on ... </Text>
        </View>
      <ScrollView contentContainerStyle={styles.bottomContainer}>
        <View style={styles.categLeft}>
          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>Toilette&Hygiene</Text>
              <Image source={toiletteAndHygiene} style={styles.image} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>Clothing&Fashion</Text>
              <Image source={clothingAndfashion} style={styles.image} />
            </View>
          </TouchableOpacity>
        </View>


        <View style={styles.categRight}>

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText} >Sports&Training</Text>
              <Image source={sportsAndtraining} style={styles.image} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>toilette&Hygiene</Text>
              <Image source={toiletteAndHygiene} style={styles.image} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>toilette&Hygiene</Text>
              <Image source={toiletteAndHygiene} style={styles.image} />
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
  bottomContainer: {
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute icons evenly
    alignItems: 'left',
    height: '100%',
  },
  categLeft: {
    width: '50%',
    height: '100%',
   // backgroundColor: 'red', 
    paddingTop:10, 
    paddingHorizontal:28
  },
  categRight: {
    width: '50%',
    height: '100%',
    //backgroundColor: 'pink', 
    paddingTop:10, 
    paddingHorizontal:28
  },
  inEye: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
    marginLeft:'25%',
  },
  keepEyeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
    marginLeft: '13%',
    marginBottom:'4%',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#111851',
    borderWidth: 1,
    margin: 7,
  },
  categoryText: {
    fontSize: '15',
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 10,
    textAlign: 'left'
  },
  middleContainer:{
    //backgroundColor:'yellow'
  }

})