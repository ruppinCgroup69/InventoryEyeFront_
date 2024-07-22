import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import C_header from '../../components/c_home/c_header'
import Search from '../../components/c_home/search'
import profileImage from '../../images/profileImage.jpg'
import toiletteAndHygiene from '../../images/Toiletries&hygiene.jpg'
import clothingAndfashion from '../../images/clothing&fashion.jpg'
import sportsAndtraining from '../../images/sports&training.jpg'
import HomeForniture from '../../images/Home Furniture.jpg'
import OfficeSuppliers from '../../images/Office Supplies.jpg'
import GardenAndYard from '../../images/Garden&Yard.jpg'
import CareAndCosmetics from '../../images/Care&Cosmetics.jpg'
import CellPhone from '../../images/Cell Phone.jpg'


export default function Categories() {


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <C_header fullName='Nelly' notiNum={12} profileImage={profileImage} userScore={70} />
      </View>
      <View style={styles.middleContainer}>
        <Search />
      </View>
      <View style={styles.inEye}>
          <Text style={styles.keepEyeText}>Keep an eye on ... </Text>
        </View>
      <ScrollView 
          contentContainerStyle={[
            styles.bottomContainer, 
            { flexGrow: 1 } // Adds 10 pixels of space between items
          ]}
      >
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

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>Home Forniture</Text>
              <Image source={HomeForniture} style={styles.image} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText} >Sports&Training</Text>
              <Image source={sportsAndtraining} style={styles.image} />
            </View>
          </TouchableOpacity>

        </View>


        <View style={styles.categRight}>


          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>Office Suppliers</Text>
              <Image source={OfficeSuppliers} style={styles.image} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>Garden&Yard </Text>
              <Image source={GardenAndYard} style={styles.image} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>Care&Cosmetics</Text>
              <Image source={CareAndCosmetics} style={styles.image} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoryText}>Cell Phone</Text>
              <Image source={CellPhone} style={styles.image} />
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start', // Changed from 'left' to 'flex-start'
    // Remove height: '100%',
  },
  categLeft: {
    width: '50%',
    //height: '100%',
    //backgroundColor: 'red', 
    paddingTop:5, //10
    paddingHorizontal:28
  },
  categRight: {
    width: '50%',
    //height: '100%',
   // backgroundColor: 'yellow', 
    paddingTop:5, //10, 
    paddingHorizontal:28
  },
  inEye: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
    alignItems:'center',
    paddingVertical: 10,
  },
  keepEyeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
    marginLeft: '13%',
    //marginBottom:'4%',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#111851',
    borderWidth: 1,
    margin: 7,
    marginHorizontal:'10%',
    marginVertical:'5%'//10
  },
  categoryText: {
    fontSize: '15',
    fontWeight: 'bold',
    color: '#111851',
    paddingTop: 10,
    textAlign: 'center'
  },
  categoriesContainer:{
    width: '100%',
    height: '180', 
    borderRadius: 40,
    borderColor: '#111851',
    borderWidth: 1,
    backgroundColor: '#F0F6FE',
    marginVertical:10, 
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
})