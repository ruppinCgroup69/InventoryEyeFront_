import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useCallback, useEffect, useState } from 'react';
import C_header from '../../components/c_home/c_header'
import Search from '../../components/c_home/search'
import { Feather } from '@expo/vector-icons';
import Post from '../../components/c_home/post'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GET } from '../../api';
import { formatDate, formatTime } from '../../utils';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { distance } from '../../utils';

export default function C_home() {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(route.params?.user || {});
  const [category, setCategory] = useState(route.params?.category || '');
  const [posts, setPosts] = useState([]);

  const getSurvey = async () => {
    try {
      let surveyData = await GET(`Survey/${user.id}`);
      // Check if surveyData is an empty array
      if (Array.isArray(surveyData) && surveyData.length === 0) {
        navigation.navigate('SurveyEntry', { user });
      }
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  };

  const getPosts = async () => {
    try {
      const url = category ? `Posts/Category/${category}` : `Posts/${user.id}`;
      let postsData = await GET(url);
  
      console.log('postsData', postsData); // Logs the entire postsData array
      console.log('user details', user);
  
      // If searchRadius is not 0, filter posts by distance
      if (user.searchRadius !== 0) {
        postsData = postsData.filter((post) => {
          const calculatedDistance = distance(post.pickUpLat, post.picUpLng, user.lat, user.lng);
          console.log(`Distance for postId ${post.postId}:`, calculatedDistance);
          return calculatedDistance <= user.searchRadius;
        });
      } else {
        // If searchRadius is 0, skip filtering
        console.log('SearchRadius is 0, showing all posts');
      }
  
      // Set the filtered or unfiltered postsData to state
      setPosts(postsData);
      console.log('Updated posts state:', postsData);
  
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      getPosts();
    }, [category])
  );
  


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('logged user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          await getSurvey(); // Fetch survey data after setting user
        } else {
          await AsyncStorage.setItem('logged user', JSON.stringify(route.params.user));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (route.params?.category) {
      setCategory(route.params.category);
    } else {
      setCategory('');
    }
  }, [route.params?.category]);

  const handlePostPress = (post) => {
    navigation.navigate('Post_Det', { postId: post.postId });
  };


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <C_header fullName={user.fullName} notiNum={12} profileImage={{ uri: user.image }} userScore={user.score} />
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
          {
            posts.length == 0 ? <Text>No posts were found </Text> :
              posts.map((post) => <TouchableOpacity key={post.postId} onPress={() => handlePostPress(post)}>
                <View style={styles.postContainer}>
                  <Post
                    style={styles.posts}
                    content={post.content}
                    productName={post.productName}
                    category={post.categoryDesc}
                    productImage={{ uri: post.image }}
                    profileImage={{ uri: post.userImage }}
                    fullName={post.userName} score={post.score}
                    publishedDate={formatDate(new Date(post.createAt))}
                    publishedHour={formatTime(new Date(post.createAt))}
                  />
                </View>
              </TouchableOpacity>)
          }
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