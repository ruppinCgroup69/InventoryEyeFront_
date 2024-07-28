import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import Info from '../../components/profile/info'
import Score from '../../components/profile/score'
import PostsHistory from '../../components/profile/postsHistory'
import CuponsHistory from '../../components/profile/cuponsHistory'
import profileImage from '../../images/profileImage.jpg'
import productImage from '../../images/productImage.jpg';
import bonusImage from '../../images/bonusImage.png';
import { AntDesign } from '@expo/vector-icons';
import Post from '../shared/post';


export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.frame}>
          <View style={styles.inner}>
            <Info fullName='Nelly Adar' profileImage={profileImage} email='Nelly_Adar@gmail.com' birthdate='25/12/1998' city='Tel Aviv'></Info>
            <View style={styles.editIcon}>
              <TouchableOpacity>
                <AntDesign name="edit" size={24} color="#111851" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.second}>
        <View style={styles.scoreContainer}>
          <View style={styles.scoreText}>
            <Text style={{ fontSize: 18 }}>My Score</Text>
          </View>
          <View style={styles.score}>
            <Score ScoreNum='70'></Score>
          </View>
        </View>
        <View style={styles.postsHistory}>
          <View style={styles.postsText}>
          <Text style={{ textAlign: 'left', marginLeft: '9%' }}>
          Post's History </Text>
          </View>
          <View style={styles.postsList}>
          <PostsHistory Post={productImage}></PostsHistory>
          <PostsHistory Post={productImage}></PostsHistory>
          <PostsHistory Post={productImage}></PostsHistory>
          <PostsHistory Post={productImage}></PostsHistory>
          </View>
        </View>

        <View style={styles.bonusHistory}>
          <View style={styles.bonusText}>
          <Text style={{ textAlign: 'left', marginLeft: '9%' }}>
          Bonus History </Text>
          </View>
          <View style={styles.bonusList} >
              <CuponsHistory bonusPic={bonusImage}></CuponsHistory>
              <CuponsHistory bonusPic={bonusImage}></CuponsHistory>
              <CuponsHistory bonusPic={bonusImage}></CuponsHistory>
              <CuponsHistory bonusPic={bonusImage}></CuponsHistory>
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
    paddingTop: '20%',
  },
  info: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  frame: {
    backgroundColor: '#87CEEB',
    height: "72%",
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'relative',
    marginTop: '10%'
  },
  inner: {
    backgroundColor: 'white',
    width: '90%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    left: 30
  },
  second: {
    flex: 1,
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '43%',
    height: '17%',
    borderRadius: 30,
    marginHorizontal: '27%',
    marginBottom: '10%',
  },
  score: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%'
  },
  postsHistory: {
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    width: '73%',
    height: '23%',
    borderRadius: 40,
    marginHorizontal: '12%',
    marginBottom: '10%',
  },
  bonusHistory: {
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    width: '73%',
    height: '23%',
    borderRadius: 40,
    marginHorizontal: '12%',
    marginBottom: '10%',
  },
  postsList: {
    flexDirection: 'row',
    marginLeft: '6%'
  },
  bonusList: {
    flexDirection: 'row',
    marginLeft: '5%'
  },
});