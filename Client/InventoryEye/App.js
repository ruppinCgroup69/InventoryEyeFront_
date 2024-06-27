import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/shared/welcome';
import RegisterType from './screens/shared/registerType';
import Login from './screens/shared/login';
import C_Register from './screens/customer/c_register';
import S_Register from './screens/supplier/s_register';
import ResetPassword from './screens/shared/resetPassword';
import SuccessResetPassword from './screens/shared/succesResetPassword';
import Loading from './screens/shared/loading';
import C_header from './components/c_home/c_header';
import C_home from './screens/customer/c_home';
import EditOrCreatePost from './screens/customer/editOrCreatePost';
import Categories from './screens/shared/categories';

export default function App() {
  return (
    <View style={styles.container}>
      <EditOrCreatePost/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
