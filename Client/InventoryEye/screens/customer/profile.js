import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import profileImage from '../../images/profileImage.jpg'
import productImage from '../../images/productImage.jpg';
import bonusImage from '../../images/bonusImage.png';
import { AntDesign } from '@expo/vector-icons';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.frame}>
          <View style={styles.inner}>
            <View style={styles.imageContainer}>
              <Image source={profileImage} style={styles.image} />
            </View>
            <View style={styles.editIcon}>
              <TouchableOpacity>
                <AntDesign name="edit" size={24} color="#111851" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>Nelly Adar</Text>
            <Text style={styles.details}>Nelly_Adar@gmail.com</Text>
            <Text style={styles.details}>25/12/1998</Text>
            <Text style={styles.details}>Tel Aviv</Text>
          </View>
        </View>
      </View>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreText}>
          <Text style={{ fontSize: 18 }}>My Score</Text>
        </View>
        <View style={styles.score}>
          <AntDesign name="star" size={50} color="#31A1E5" style={styles.starIcon} />
          <View style={styles.scoreNumContainer}>
            <Text style={styles.scorenum}>70</Text>
          </View>
        </View>
      </View>
      <View style={styles.postsHistory}>
        <View style={styles.postsText}>
          <Text style={{ textAlign: 'left', marginLeft: '7%' }}>Post's History (13)</Text>
        </View>
        <View style={styles.postsList} >
          <View style={styles.post}>
            <TouchableOpacity>
            <Image source={productImage} style={styles.productimage} />
            </TouchableOpacity>
          </View>
          <View style={styles.post}>
            <TouchableOpacity>
            <Image source={productImage} style={styles.productimage} />
            </TouchableOpacity>
          </View>
          <View style={styles.post}>
            <TouchableOpacity>
            <Image source={productImage} style={styles.productimage} />
            </TouchableOpacity>
          </View>
          <View style={styles.post}>
            <TouchableOpacity>
            <Image source={productImage} style={styles.productimage} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bonusHistory}>
        <View style={styles.bonusText}>
          <Text style={{ textAlign: 'left', marginLeft: '7%' }}>Bonus History (2)</Text>
        </View>
        <View style={styles.bonusList} >
          <View style={styles.bonus}>
            <TouchableOpacity>
            <Image source={bonusImage} style={styles.bonusimage} />
            </TouchableOpacity>
          </View>
          <View style={styles.bonus}>
            <TouchableOpacity>
            <Image source={bonusImage} style={styles.bonusimage} />
            </TouchableOpacity>
          </View>
          <View style={styles.bonus}>
            <TouchableOpacity>
            <Image source={bonusImage} style={styles.bonusimage} />
            </TouchableOpacity>
          </View>
          <View style={styles.bonus}>
            <TouchableOpacity>
            <Image source={bonusImage} style={styles.bonusimage} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
    justifyContent: 'center',
  },
  info: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    backgroundColor: '#87CEEB',
    height: "57%",
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'relative',
    marginTop: '20%'
  },
  inner: {
    backgroundColor: 'white',
    width: '90%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
  imageContainer: {
    position: 'absolute',
    top: -75,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#111851',
    borderWidth: 1.5,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    left: 30
  },
  name: {
    color: '#111851',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: '5%',
    marginTop: '10%'
  },
  details: {
    color: 'black',
    fontSize: 16,
    marginBottom: '3%'
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '43%',
    height: '8%',
    borderRadius: 30,
    marginHorizontal: '27%',
    marginBottom: '10%'
  },
  scoreText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%'
  },
  score: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumContainer: {
    position: 'absolute',
    top: '23%',
    left: '26%',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scorenum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  postsHistory: {
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    width: '75%',
    height: '10%',
    borderRadius: 40,
    marginHorizontal: '12%',
    marginBottom: '10%'
  },
  postsList: {
    flexDirection: 'row',
    marginLeft: '5%'
  },
  productimage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: '#111851',
    borderWidth: 1,
    marginLeft: '3%'
  },
  bonusList: {
    flexDirection: 'row',
    marginLeft: '5%'
  },
  bonusHistory: {
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    width: '75%',
    height: '10%',
    borderRadius: 40,
    marginHorizontal: '12%',
    marginBottom: '10%'
  },
  bonusimage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: '#111851',
    borderWidth: 1,
    marginLeft: '3%'
  },
});