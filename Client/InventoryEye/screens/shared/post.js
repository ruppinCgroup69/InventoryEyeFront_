
//The Post 
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Details from '../../components/post/details';
import NewComment from '../../components/post/newComment';
import Comment from '../../components/post/comment';
import Sharon from '../../images/sharon.jpg';
import Adar from '../../images/ADAR.jpeg';
import profileImage from '../../images/profileImage.jpg';
import ResponseModal from '../customer/responseModal';
import { GET } from '../../api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';


export default function Post() {
  const route = useRoute();
  const { postId } = route.params;
  const navigation = useNavigation();
  const [parsedTags, setParsedTags] = useState([]);
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
          id: userData.id  // Ensure the id is set correctly
        });
        console.log('Fetched user data:', userData);
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

  console.log('AsyncStorage:',user);

  const fetchPostData = async () => {
    try {
      const response = await GET(`Posts/${postId}`);
      if (response) {
        setPostData(response);
        console.log('Fetched post data:', response);

        // Parse the tags
        if (response.tags) {
          try {
            const tagsArray = JSON.parse(response.tags);
            setParsedTags(tagsArray);
            console.log('Parsed tags:', tagsArray);
          } catch (parseError) {
            console.error('Error parsing tags:', parseError);
          }
        }

        try {
          await AsyncStorage.setItem(`post_${postId}`, JSON.stringify(response));
          console.log('Post data stored successfully');
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

  const [comments, setComments] = useState([]);

  const fetchComments = async (postId) => {
    try {
      console.log('Fetching comments for postId:', postId);
      const response = await GET(`Comments/PostId/${postId}`);
      console.log('Raw response from comments API:', response);
      if (response && Array.isArray(response)) {
        setComments(response);
        console.log('Fetched comments:', response);
        try {
          await AsyncStorage.setItem(`comments_for_post_${postId}`, JSON.stringify(response));
          console.log('Comments data stored successfully in AsyncStorage');
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
    console.log('Current comments in state:', comments);
  }, [comments]);


  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Details
          fullName={postData.userName}
          profileImage={{ uri: postData.image }}
          pDate={formatDate(postData.createAt)}
          pHour={formatTime(postData.createAt)}
          category={postData.categoryDesc}
          size={parsedTags[2]}
          pName={postData.productName}
          company={parsedTags[1]}
          color={parsedTags[0]}
          location={postData.pickUpAddress}
          productImage={{ uri: postData.userImage }}
          content={postData.content}
          postUserId={postData.userId}  // Add this line
          currentUserId={user.id}  // Add this line
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
                store={comment.storeLocation} // לעשות פטצ' ל STORE 
                bought={comment.bought ? 'Yes' : 'NO'}
                stock={'High'} // לעשות פטצ ל STOCK
                datepub={formatDate(comment.createdAt)}
                quality={comment.productQuality}
                datepurch={comment.bought ? formatDate(comment.boughtDate) : ''}
                rank={comment.productQuality} // לשאול את ירדן מה זה השדה הזה (אם חסר אז להוסיף לשרת)
              />
            </View>
          ))}

      </ScrollView>
      <NewComment fullName={'Yarden Assulin'} onPress={() => setModalVisible(true)} />
      <ResponseModal visible={modalVisible} onClose={() => setModalVisible(false)} fullName={'Yarden Assulin'} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
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
  spacer: {
    height: '100%',
  },
  keyboardAvoidingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});