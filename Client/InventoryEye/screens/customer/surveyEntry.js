import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import appLogo from '../../images/appLogo.png';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default function SurveyEntry() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Preference Survey</Text>
      <Image source={appLogo} style={styles.image} />
      <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
        <Text style={styles.text}>
          <Text style={{fontWeight:'bold'}}>Welcome {user.fullName} to our app! {'\n'}</Text>
          To provide you with the best and most personalized user experience, we want to understand your preferences and interests.
          To do so, we invite you to fill out the following survey.{'\n\n'}
          This survey contains short questions about your interests and purchasing habits.
          Based on your answers, we can customize the app's features to better match your preferences.
        </Text>
      </View>
      <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}} 
      onPress={() => navigation.navigate('Survey', { user })}
      >
        <View style={styles.button}>
          <Text style={styles.buttonTxt}>Enter the survey</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
  },
  header: {
    fontSize: 40,
    color: '#111851',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 70
  },
  image: {
    height: 120,
    width: 120,
    marginTop: 10,
   // marginBottom:10,
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    height: 40,
    width: 230,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#31A1E5',
    marginTop: 100,
  },
  buttonTxt: {
    color: "#111851",
    fontSize: 24,
    textAlign:'center',
    marginTop:2
  }
})