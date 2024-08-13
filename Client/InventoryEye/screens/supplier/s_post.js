import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Comment from '../../components/post/comment';
import Details from '../../components/post/details';
import { GET } from '../../api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function S_Post() {
  const route = useRoute();
  const { postId } = route.params;
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const [parsedTags, setParsedTags] = useState([])
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
  const [postData, setPostData] = useState({
    postId: 0,
    userId: 0,
    userName: '',
    userImage: '',
    createAt: new Date(),
    editedAt: new Date(),
    productName: "",
    content: "",
    image: "",
    tags: "",
    category: 0,
    pickUpFromUser: '',
    pickUpLat: 0,
    picUpLng: 0,
    pickUpAddress: "",
    categoryDesc: "",
    score: 0
  });

  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('logged user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        setUser({
          ...userData,
          id: userData.id
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

  const fetchPostData = async () => {
    try {
      const response = await GET(`Posts/PostId/${postId}`);
      if (response) {
        setPostData(response);
        if (response.tags) {
          try {
            const tagsArray = JSON.parse(response.tags);
            setParsedTags(tagsArray);
          } catch (parseError) {
            console.error('Error parsing tags:', parseError);
          }
        }
        try {
          await AsyncStorage.setItem(`post_${postId}`, JSON.stringify(response));
        } catch (storageError) {
          console.error('AsyncStorage error:', storageError);
        }
      } else {
        console.log('Failed to fetch post data');
      }
    } catch (error) {
      console.error('An error occurred while fetching post data:', error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString();
  };

  const formatTime = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const fetchComments = async (postId) => {
    try {
      const response = await GET(`Comments/PostId/${postId}`);
      if (response && Array.isArray(response)) {
        setComments(response);
        try {
          await AsyncStorage.setItem(`comments_for_post_${postId}`, JSON.stringify(response));
        } catch (storageError) {
          console.error('AsyncStorage error:', storageError);
        }
      } else {
        console.log('Failed to fetch comments or invalid response');
      }
    } catch (error) {
      console.error('An error occurred while fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchPostData();
    fetchComments(postId);
  }, [postId]);

  useEffect(() => {
  }, [comments]);

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Details
          fullName={postData.userName}
          profileImage={{ uri: postData.image }}
          pDate={formatDate(postData.editedAt)}
          pHour={formatTime(postData.editedAt)}
          category={postData.categoryDesc}
          size={parsedTags[2]}
          pName={postData.productName}
          company={parsedTags[1]}
          color={parsedTags[0]}
          location={postData.pickUpAddress}
          productImage={{ uri: postData.userImage }}
          content={postData.content}
          postUserId={postData.userId}
          currentUserId={user.id}
          postId={postId}
        />
      </View>
      <ScrollView style={styles.comments}>
        {comments.map((comment, index) => (
          <View key={comment.commentId || index} style={styles.comment}>
            <Comment
              profilepic={{ uri: comment.userImage }}
              score={comment.score}
              fullName={comment.userName}
              content={comment.content}
              inventoryeye={formatDate(comment.inventoryEye)}
              location={comment.storeLocation}
              store={comment.storeLocation}
              bought={comment.bought ? 'Yes' : 'NO'}
              stock={'High'}
              datepub={formatDate(comment.createdAt)}
              quality={comment.bought ? comment.productQuality : undefined}
              datepurch={comment.bought ? formatDate(comment.boughtDate) : ''}
              rank={comment.bought ? comment.satisfaction : undefined}
              commentId={comment.commentId}
              userId={comment.userId}
              supplier={'yes'}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
  },
  details: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(17, 24, 81, 0.4)',
    paddingTop: '12%',
    paddingBottom: 20,
    height: '45%'
  },
  comments: {
    flex: 1,
    height: '55%',
    marginTop: '1%'
  },
  comment: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(17, 24, 81, 0.1)',
  },
});