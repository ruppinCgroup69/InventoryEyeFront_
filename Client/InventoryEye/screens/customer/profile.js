import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react'
import Info from '../../components/profile/info'
import Score from '../../components/profile/score'
import PostsHistory from '../../components/profile/postsHistory'
import CuponsHistory from '../../components/profile/cuponsHistory'
import bonusImage from '../../images/bonusImage.png';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { GET } from '../../api';
import CBonusModal from './cBonusModal';
import { formatDate } from '../../utils';

export default function Profile() {
  const navigation = useNavigation();
  const [userPosts, setUserPosts] = useState([]);
  const [userBonus, setUserBonus] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    role: 0,
    lastSeen: '',
    fullName: '',
    emailAddress: '',
    password: '',
    birthDate: '',
    lat: 0,
    lng: 0,
    address: '',
    image: '',
    createdAt: '',
    score: 0,
  });
  const fetchUserPosts = async (userId) => {
    try {
      const posts = await GET(`Posts/UserID/${userId}`);
      setUserPosts(posts);
    } catch (error) {
      console.error('Error retrieving user posts:', error);
    }
  };

  const fetchUserBonus = async (userId) => {
    try {
      const bonuses = await GET(`Bonus/ClientUsed/${userId}`);
      setUserBonus(bonuses);
    } catch (error) {
      console.error('Error retrieving user bonuses:', error);
    }
  };

  const handleBonusPress = useCallback((bonus) => {
    console.log('Bonus pressed:', bonus);
    setSelectedBonus(bonus);
    setModalVisible(true);
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await GET('Categories');
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error retrieving categories:', error);
    }
  };

  useFocusEffect(useCallback(() => {
    fetchUserData().then(() => {
      fetchUserPosts(user.id);
      fetchUserBonus(user.id);
      fetchCategories();
    });
  }, [user.id]));

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("logged user");
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('logged user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        setUser({
          id: userData.id,
          role: userData.role,
          lastSeen: userData.lastSeen,
          fullName: userData.fullName,
          emailAddress: userData.emailAddress,
          password: userData.password,
          birthDate: userData.birthDate,
          lat: userData.lat,
          lng: userData.lng,
          address: userData.address,
          image: userData.image,
          createdAt: userData.createdAt,
          score: userData.score
        });
      } else {
        console.error('No user data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.frame}>
          <View style={styles.inner}>
            <Info 
              fullName={user.fullName}
              profileImage={user.image || null}
              email={user.emailAddress}
              birthdate={formatDate(new Date(user.birthDate))}
              city={user.address}></Info>
            <View style={styles.editIcon}>
              <TouchableOpacity>
                <AntDesign name="edit" size={24} color="#111851" onPress={() => navigation.navigate('Edit Profile')} />
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
            <Score ScoreNum={user.score}></Score>
          </View>
        </View>
        <View style={styles.postsHistory}>
          <View style={styles.postsText}>
            <Text style={{ textAlign: 'left', marginLeft: '9%', marginTop: '2%' }}>
              Post's History </Text>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.postsList}>
            {userPosts.map((post) => (
              <PostsHistory
                key={post.postId}
                Post={post.userImage}
                postId={post.postId}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.bonusHistory}>
          <View style={styles.bonusText}>
            <Text style={{ textAlign: 'left', marginLeft: '9%' }}>
              Bonus History
            </Text>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.bonusList}>
          {userBonus.map((bonus) => (
            <CuponsHistory
              key={bonus.bonusId}
              bonusPic={bonus.image}
              onPress={() => handleBonusPress(bonus)}
            />
          ))}
        </ScrollView>
        </View>
        {selectedBonus && (
      <CBonusModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}r
      onChoose={(id) => {/* Handle choose action if needed */}}
      bonus={selectedBonus}
      categories={categories}
      isAccepted={selectedBonus?.isAccepted}
    />
        )}
      </View>

      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
    marginLeft: '6%',
  },
  bonusList: {
    flexDirection: 'row',
    marginLeft: '5%'
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  logoutButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#31A1E5'
  },
  logoutButtonText: {
    color: '#111851',
    fontSize: 16,
    fontWeight: 'bold',
  },
});