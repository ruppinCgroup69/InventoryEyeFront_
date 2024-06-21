import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import MyHeader from '../../components/shared/myHeader';
import { Button } from '@rneui/themed';

export default function S_Register() {

  return (
    <KeyboardAvoidingView //כשהמקלדת עולה שאר הדברים מתכווצים?
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MyHeader imageSize={120} title='Supplier Register' titleSize={33} />
        </View>
        <View style={styles.fieldContainer} >
          <Text style={styles.lable}>Store Name:</Text>
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
        <View style={styles.fieldContainer} > 
          <Text style={styles.lable}>Address:</Text>
          <TextInput style={styles.input}
          />
        </View>
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
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    //צריך להוסיף GOOGLEAPI לכתובות
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 10,
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
    width: '60%',
    borderColor: '#31a1e5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height: '80%',
  },
  buttonsContainer: {
    marginTop: 30,
  },
})