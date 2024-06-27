import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import Welcome from './screens/shared/welcome';
import RegisterType from './screens/shared/registerType';
import Login from './screens/shared/login';
import C_Register from './screens/customer/c_register';
import S_Register from './screens/supplier/s_register';
import ResetPassword from './screens/shared/resetPassword';
import Categories from './screens/shared/categories';
import SuccessResetPassword from './screens/shared/succesResetPassword';
import Loading from './screens/shared/loading';
import C_home from './screens/customer/c_home';
import EditOrCreatePost from './screens/customer/editOrCreatePost';


//create the default Stack
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="C_Register" component={C_Register} options={{ tabBarVisible: false, headerShown: false }} />
            <Tab.Screen name="Home" component={C_home} />
            <Tab.Screen name="EditOrCreatePost" component={EditOrCreatePost} />
        </Tab.Navigator>
    )
}

function SupplierTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="S_Register" component={S_Register} options={{ tabBarVisible: false }} />
            <Tab.Screen name="Home" component={C_home} />
            <Tab.Screen name="EditOrCreatePost" component={EditOrCreatePost} />
        </Tab.Navigator>
    )
}

export default function Navigation() {

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='UserTabs'>
                    {/* options={{ headerShown: false }} */}
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="RegisterType" component={RegisterType} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} />
                    <Stack.Screen name="SuccessResetPassword" component={SuccessResetPassword} />
                    <Stack.Screen name="Loading" component={Loading} />
                    <Stack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="SupplierTabs" component={SupplierTabs} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )

}