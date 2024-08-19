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
  const [category, setCategory] = useState(route.params?.categoryP);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dynamicMargin = category ? 0 : '25%';
  const dynamicPadding = category ? 3 : 20;


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
      let url = '';
      if (searchTerm) {
        url = `Posts/Search/${searchTerm}`;
      } else if (category) {
        url = `Posts/Category/${category}`;
      } else {
        url = `Posts/${user.id}`;
      }
      let postsData = await GET(url);

      // If searchRadius is not 0, filter posts by distance
      if (user.searchRadius !== 0) {
        postsData = postsData.filter((post) => {
          const calculatedDistance = distance(post.pickUpLat, post.picUpLng, user.lat, user.lng);
          console.log(`Distance for postId ${post.postId}:`, calculatedDistance);
          return calculatedDistance <= user.searchRadius;
        });
      } else {
        console.log('SearchRadius is 0, showing all posts');
      }

      setPosts(postsData);
      console.log('Updated posts state:', postsData);

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useFocusEffect(useCallback(() => {
    if (route.params?.categoryP !== undefined) {
      setCategory(route.params.categoryP);
    }
  }, [route.params?.categoryP]))

  useFocusEffect(useCallback(() => {
    getPosts();
  }, []))

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
          setUser(route.params.user);
          // await getPosts();
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [route.params?.user, category]);

  useEffect(() => {
    console.log('first');
    getPosts();
  }, [category, searchTerm])


  const handlePostPress = (post) => {
    navigation.navigate('Post_Det', { postId: post.postId });
  };

  const handleNoCategoryPress = () => {
    console.log('Filter');
  };

  const clearFilter = () => {
    setCategory('');
    setSearchTerm('');
    getPosts();
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (category) {
      setCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <C_header fullName={user.fullName} notiNum={12} profileImage={{ uri: user.image }} userScore={user.score} />
      </View>
      <View style={styles.searchView}>
        <Search onSearch={handleSearch} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.middle, { paddingHorizontal: dynamicPadding }]}>
          <Text style={[styles.inEye, { marginLeft: dynamicMargin }]}>
            {searchTerm ? `Search results for: ${searchTerm}` :
              (category ? `Category: ${category}` : 'Keep an eye on...')}
          </Text>
          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => (category || searchTerm) ? clearFilter() : handleNoCategoryPress()}
          >
            <Text style={styles.filterBy}>{(category || searchTerm) ? 'Clear filter' : 'Filter by'}</Text>
            <Feather name={(category || searchTerm) ? 'x' : 'filter'} size={20} color="rgba(17, 24, 81, 0.6)" />
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
                    publishedDate={formatDate(new Date(post.editedAt))}
                    publishedHour={formatTime(new Date(post.editedAt))}
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
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  inEye: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
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