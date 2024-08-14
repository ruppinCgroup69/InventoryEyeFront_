import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import S_header from '../../components/s_home/s_header'
import Search from '../../components/c_home/search';
import Sc_Post from '../../components/s_home/sc_post';
import { useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { GET } from '../../api';
import { formatDate, formatTime } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function S_home() {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(route.params?.user || {});
  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dynamicMargin = category ? 0 : '25%';
  const dynamicPadding = category ? 3 : 20;

  const getPosts = async () => {
    try {
      let url = '';
      if (searchTerm) {
        url = `Posts/Search/${searchTerm}`;
        console.log('Fetching posts with search term:', searchTerm);
      } else if (category) {
        url = `Posts/Category/${category}`;
        console.log('Fetching posts for category:', category);
      } else {
        url = `Posts/${0}`;
        console.log('Fetching all posts');
      }
      console.log('API URL:', url);
      let postsData = await GET(url);
      console.log('Fetched posts:', postsData);
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useFocusEffect(useCallback(() => {
    console.log('Screen focused. Route params:', route.params);
    if (route.params?.category !== undefined) {
      console.log('Setting category from route params:', route.params.category);
      setCategory(route.params.category);
    }
  }, [route.params?.category]))

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('logged user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } else {
          await AsyncStorage.setItem('logged user', JSON.stringify(route.params.user));
          setUser(route.params.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [route.params?.user, category]);

  useEffect(() => {
    getPosts();
  }, [category, searchTerm])

  const handlePostPress = (post) => {
    navigation.navigate('Post_Det_S', { postId: post.postId });
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
    console.log('Search term entered:', text);
    setSearchTerm(text);
    if (category) {
      console.log('Clearing category due to search');
      setCategory('');
    }
  };

  return <View style={styles.container}>
    <View style={styles.topContainer}>
      <S_header fullName={user.fullName} profileImage={{ uri: user.image }} />
    </View>
    <View style={styles.searchView}>
      <Search onSearch={handleSearch} />
    </View>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.middle, { paddingHorizontal: dynamicPadding }]}>
        <Text style={[styles.inEye, { marginLeft: dynamicMargin }]}>
          {searchTerm ? `Search results for: ${searchTerm}` :
            (category ? `Category: ${posts.length > 0 ? posts[0].categoryDesc : 'Loading...'}`
              : 'Keep an eye on...')}
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
                <Sc_Post
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
    height: 130,
    marginBottom: 7,
  },
})