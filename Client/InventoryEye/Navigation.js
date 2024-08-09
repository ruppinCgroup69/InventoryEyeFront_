import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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
import Profile from './screens/customer/profile';
import C_Messages from './screens/customer/c_messages';
import ChooseCupons from './screens/customer/chooseCupons';
import Post from './screens/shared/post';

//create the default Stack
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen
                name="Messages"
                component={C_Messages}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'message-text' : 'message-text-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
            tabBarActiveTintColor:"#111851",
                }} />
            <Tab.Screen
                name="Cupons"
                component={ChooseCupons}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'medal' : 'medal-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
                            tabBarActiveTintColor:"#111851",
                }} />
            <Tab.Screen
                name="Home"
                component={C_home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                width: 35,
                                height: 35,
                                borderRadius: 17.5,
                                backgroundColor: focused ? 'rgba(17, 24, 81, 0.6)' : 'transparent',
                                borderWidth: 1,
                                borderColor: 'rgba(17, 24, 81, 0.6)',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesome5
                                name="eye"
                                color={focused ? 'white' : 'rgba(17, 24, 81, 0.6)'}
                                size={24}
                            />
                        </View>
                    ),
                    tabBarActiveTintColor:"#111851",
                }}
            />
            <Tab.Screen name="New Post" component={EditOrCreatePost} options={{ headerShown: false,tabBarButton: () => null }} />
            <Tab.Screen
                name="Categories"
                component={Categories}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'cart' : 'cart-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
                            tabBarActiveTintColor:"#111851",
                }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'account' : 'account-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
                            tabBarActiveTintColor:"#111851",
                }}
            />
        </Tab.Navigator>
    )
}

function SupplierTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={C_home} />
            <Tab.Screen name="EditOrCreatePost" component={EditOrCreatePost} />
        </Tab.Navigator>
    )
}

export default function Navigation() {

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator >
                    {/* options={{ headerShown: false }} * initialRouteName='UserTabs'*/}
                    {/* <Stack.Screen name="Post_Det" component={Post} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="RegisterType" component={RegisterType} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                    <Stack.Screen name="ResetPassword" component={ResetPassword} />
                    <Stack.Screen name="SuccessResetPassword" component={SuccessResetPassword} />
                    <Stack.Screen name="Lרoading" component={Loading} />
                    <Stack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="SupplierTabs" component={SupplierTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="C_Register" component={C_Register} options={{ headerShown: false }} />
                    <Stack.Screen name="S_Register" component={S_Register} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="Post_Det" component={Post} options={{ headerShown: false }} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )

}