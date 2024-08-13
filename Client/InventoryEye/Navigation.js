import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

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
import ChooseCupons from './screens/customer/chooseCupons';
import Post from './screens/shared/post';
import EditProfile from './screens/customer/editProfile';
import SurveyEntry from './screens/customer/surveyEntry';
import Survey from './screens/customer/surveyScreen';
import S_home from './screens/supplier/s_home';
import EditOrCreateBonus from './screens/supplier/editOrCreateBonus';
import S_Post from './screens/supplier/s_post';
import My_Cuppons from './screens/supplier/my_cuppons';
import S_profile from './screens/supplier/profile_s';
import EditSProfile from './screens/supplier/s_editProfile';

//create the default Stack
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen
                name="New Post"
                component={EditOrCreatePost}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "create" : 'create-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
                    tabBarActiveTintColor: "#111851",
                }} />
            <Tab.Screen
                name="Bonus"
                component={ChooseCupons}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'medal' : 'medal-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
                    tabBarActiveTintColor: "#111851",
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
                    tabBarActiveTintColor: "#111851",
                }}
            />
            <Tab.Screen name="Edit Profile" component={EditProfile} options={{ headerShown: false, tabBarButton: () => null }} />
            <Tab.Screen
                name="SurveyEntry"
                component={SurveyEntry}
                options={{ headerShown: false, tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
            />
            <Tab.Screen
                name="Survey"
                component={Survey}
                options={{ headerShown: false, tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
            />

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
                    tabBarActiveTintColor: "#111851",
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
                    tabBarActiveTintColor: "#111851",
                }}
            />
        </Tab.Navigator>
    )
}

function SupplierTabs() {
    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen
                name="New Bonus"
                component={EditOrCreateBonus}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "create" : 'create-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
                    tabBarActiveTintColor: "#111851",
                }} />
            <Tab.Screen
                name="Bonus"
                component={My_Cuppons}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'medal' : 'medal-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
                    tabBarActiveTintColor: "#111851",
                }} />
            <Tab.Screen
                name="Home"
                component={S_home}
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
                    tabBarActiveTintColor: "#111851",
                }} />
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
                    tabBarActiveTintColor: "#111851",
                }} />
            <Tab.Screen
                name="Profile"
                component={S_profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'account' : 'account-outline'}
                            size={24}
                            color="rgba(17, 24, 81, 0.6)" />),
                    tabBarActiveTintColor: "#111851",
                }}
            />
            <Tab.Screen name="Edit Profile" component={EditSProfile} options={{ headerShown: false, tabBarButton: () => null }} />
        </Tab.Navigator>
    )
}

export default function Navigation() {

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator >
                    {/* options={{ headerShown: false }} * initialRouteName='UserTabs'*/}
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="RegisterType" component={RegisterType} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} />
                    <Stack.Screen name="SuccessResetPassword" component={SuccessResetPassword} />
                    <Stack.Screen name="Loading" component={Loading} />
                    <Stack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="SupplierTabs" component={SupplierTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="C_Register" component={C_Register} options={{ headerShown: false }} />
                    <Stack.Screen name="S_Register" component={S_Register} options={{ headerShown: false }} />
                    <Stack.Screen name="Post_Det" component={Post} options={{ headerShown: false }} />
                    <Stack.Screen name="Post_Det_S" component={S_Post} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )

}