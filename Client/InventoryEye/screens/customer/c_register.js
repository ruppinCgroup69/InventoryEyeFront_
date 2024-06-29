import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function C_Register( ) {
  const navigation = useNavigation();
  const route=useRoute();
  const {UserType}=route.params;

  const handleCustomerRegister = () => {
    alert(UserType);
    navigation.navigate('Login');
  };

  const currentDate = new Date();
  const maxDate = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());
  const minDate = new Date(currentDate.getFullYear() - 120, currentDate.getMonth(), currentDate.getDate());

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MyHeader imageSize={120} title='Customer Register' titleSize={33} />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Full Name:</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Email:</Text>
          <TextInput style={styles.input}
            keyboardType="email-address" />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Password:</Text>
          <TextInput style={styles.input}
            secureTextEntry={true} />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Re Password:</Text>
          <TextInput style={styles.input}
            secureTextEntry={true} />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.lable}>Birthdate:</Text>
          <View style={styles.input}>
            <DateTimePicker style={styles.date}
              testID="dateTimePicker"
              value={new Date()}
              mode="date"
              disabled="default"
              minimumDate={minDate}
              maximumDate={maxDate}
            />
            <AntDesign name="calendar" size={24} color="rgba(17, 24, 81, 0.6)" style={{ marginTop: 6 }} />
          </View>
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Address:</Text>
          <TextInput style={styles.input}
          />
        </View>
        <View style={styles.buttom}>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterType') }>
            <Ionicons name="arrow-back-circle-outline" size={26} color="#111851" style={{marginTop: '150%' }} />
          </TouchableOpacity>

          <View style={styles.buttonsContainer}>
            <Button
              title="Register"
              buttonStyle={{
                height: 50,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#31a1e5',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ color: '#111851', fontSize: 23 }}
              onPress={handleCustomerRegister}>
              </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '4%',
    marginBottom: 30,
  },
  lable: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    height: 40,
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginTop: 8,
  },
  dateInput: {
    width: '60%',
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: '80%',
  },
  buttonsContainer: {
    marginTop: 15,

  },
  date: {
    width: '70%',
  },
  buttom: {
    flexDirection: 'row',

  },
})