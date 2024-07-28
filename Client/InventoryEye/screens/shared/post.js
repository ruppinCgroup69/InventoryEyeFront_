import {useEffect, useState} from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Details from '../../components/post/details';
import NewComment from '../../components/post/newComment';
import Comment from '../../components/post/comment';
import Yarden from '../../images/yarden.jpg';
import Sharon from '../../images/sharon.jpg';
import Adar from '../../images/ADAR.jpeg';
import profileImage from '../../images/profileImage.jpg';
import Lipstick from '../../images/Lipstic.jpeg';
import { GET } from '../../api';


export default function Post() {

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.details}>
          <Details
            fullName={'Yarden Assulin'}
            profileImage={Yarden}
            pDate={'24/07/2024'}
            pHour={',14:30'}
            category={'Care&Cosmetics'}
            pName={'Lipstick'}
            company={'Mac'}
            color={'pink'}
            location={'Haifa'}
            productImage={Lipstick}
            content={'In the Search for this Lipstick! Help me, the shade is Whirl. There is no stock available anywhere...'}
          />
        </View>
        <View style={styles.comments}>
          <View style={styles.comment}>
            <Comment
              profilepic={Sharon} score={10} fullName={'Sharon Tebul'} content={'I saw it an hour ago, I checked and there is stock!'}
              inventoryeye={'24/07/2024 ,15:00'} location={'Azriely Mall, Haifa'} store={'MAC'} bought={'NO'}
              stock={'High'} datepub={'24/07/2024 ,15:37'} 
            />
          </View>
          <View style={styles.comment}>
            <Comment
              profilepic={Adar} score={2} fullName={'Adar Biton'} content={'I saw it an hour ago, I checked and there is stock!'}
              inventoryeye={'24/07/2024 ,15:00'} location={'Azriely Mall, Haifa'} store={'MAC'} bought={'Yes'}
              stock={'High'} datepub={'24/07/2024 ,15:37'} quality={'High'} datepurch={'24/07/2024 ,15:00'} rank={8}
            />
          </View>
          <View style={styles.comment}>
            <Comment
              profilepic={profileImage} score={5} fullName={'Gal Cohen'} content={'I saw it an hour ago, I checked and there is stock!'}
              inventoryeye={'24/07/2024 ,15:00'} location={'Azriely Mall, Haifa'} store={'MAC'} bought={'NO'}
              stock={'High'} datepub={'24/07/2024 ,15:37'} 
            />
          </View>
        </View>
        <View style={styles.spacer} />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.keyboardAvoidingView}
      >
        <NewComment fullName={'Yarden Assulin'} />
      </KeyboardAvoidingView>
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
    height:'45%'
  },
  comments: {
    flex: 1,
    height:'55%',
    marginTop:'1%'
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