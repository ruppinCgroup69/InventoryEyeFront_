import React, { useState, useEffect } from 'react';
//import { useRoute, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Button, Modal} from 'react-native';
import { Feather, FontAwesome5, MaterialIcons, Ionicons, FontAwesome, Octicons } from '@expo/vector-icons';
import profileImage from '../../images/profileImage.jpg';
import { GET } from '../../api';
import { Picker } from '@react-native-picker/picker';


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);



export default function CommentPost({ profilepic, score, fullName, content, inventoryeye, location, bought, store, stock, datepub, datepurch, quality, rank }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    //  const navigation = useNavigation();
    // const route = useRoute();
    const [previousScreen, setPreviousScreen] = useState('Home'); // Default value
    const [selectedIsPurchased, setSelectedIsPurchased] = useState([]);
    const [isPickerVisible, setPickerVisible] = useState(false);
    

    // useFocusEffect(
    //   React.useCallback(() => {
    // Update `previousScreen` when `EditOrCreatePost` gains focus
    //    const fromScreen = route.params?.fromScreen || 'Home';
    //    setPreviousScreen(fromScreen);
    //  }, [route.params?.fromScreen])
    // );

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await GET('Categories');
                setCategories(response);
                if (response.length > 0) {
                    setSelectedCategory(response[0].categoryDesc);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory === item.categoryDesc && styles.selectedCategoryItem
            ]}
            onPress={() => setSelectedCategory(item.categoryDesc)}
        >
            <Text style={[
                styles.categoryText,
                selectedCategory === item.categoryDesc && styles.selectedCategoryText
            ]}>{item.categoryDesc}</Text>
        </TouchableOpacity>
    );

    // const handleExit = () => {
    //   if (previousScreen) {
    //    navigation.navigate(previousScreen);
    //   } else {
    //     navigation.navigate('Home');
    //   }
    //};

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.exit}>
                        <TouchableOpacity>
                            <Feather name="x" size={30} color="#111851" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.createHeader}>Comment {fullName} post </Text>
                    </View>
                    <View style={styles.uploadIcon}>
                        <TouchableOpacity>
                            <Feather name="upload" size={30} color="#111851" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.center}>
                    <View style={styles.profile}>
                        <View style={styles.imageContainer}>
                            <Image source={profileImage} style={styles.image} />
                        </View>
                        <View>
                            <Text style={styles.userName}>Sharon Tebul</Text>
                        </View>
                    </View>

                    <DismissKeyboard>
                        <ScrollView
                            style={styles.content}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            <TextInput multiline style={styles.contentText} placeholder='Where did you find the product?  `' />
                        </ScrollView>
                    </DismissKeyboard>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.Labels}>
                        <Text>I kept an eye on it on: </Text>
                        <Text>Location: </Text>
                        <Text>Store: </Text>
                        <Text>Stock Level:</Text>
                        <Text>Purchased by me : </Text>
                        <Text>Purchased Date</Text>
                        <Text>Satisfaction rank:</Text>
                    </View>
                    <View style={styles.inputItem}>
                        <Button title={`purchased: ${selectedIsPurchased}`} onPress={() => setPickerVisible(true)} style={styles.purchasedButton}/>
                        <Modal visible={isPickerVisible} transparent={true}>
                            <View style={styles.modalContainer}>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={selectedIsPurchased}
                                        onValueChange={(itemValue) => {
                                            setSelectedIsPurchased(itemValue);
                                            setPickerVisible(false);
                                        }}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Yes" value="yes" />
                                        <Picker.Item label="No" value="no" />
                                    </Picker>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>
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
    top: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        height: '12%',
        width: '100%',
        backgroundColor: '#C8DFEA',
        marginTop: 40,
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: '2'
    },
    exit: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: '70%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadIcon: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createHeader: {
        color: '#111851',
        fontWeight: 'bold',
        fontSize: 25,
    },
    center: {
        position: 'absolute',
        top: '12%',
        flexDirection: 'column',
        height: '44%',
        width: '100%',
        marginTop: 40,
        alignItems: 'center',
        borderBottomColor: '#D4D1D0',
        borderBottomWidth: '2',
    },
    profile: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 10,
        alignItems: 'center',
        height: 100,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: '#111851',
        borderWidth: 1,
        margin: 7,
    },
    imageContainer: {
        alignItems: 'center',
    },
    userName: {
        fontSize: '20',
        color: '#111851',
        fontWeight: 'bold',
    },
    question: {
        fontSize: '15',
        color: '#111851',
    },
    content: {
        height: '80%',//300
        width: '100%'//400
    },
    contentText: {
        fontSize: '18',
        color: 'black',
        paddingTop: 13,
        paddingHorizontal: 8,
        textAlign: 'left'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'stretch',
        height: '55%', // Adjust as needed
        backgroundColor: '#F0F6FE',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    Labels: {
        //flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'left',
        width: '50%',
        height: '100%',
        paddingHorizontal: 20
    },
    inputItem: {
        flexDirection: 'columne',
        //justifyContent: 'space-around',
        alignItems: 'left',
        width: '50%',
        height: '100%',
        //paddingHorizontal: 15,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        borderColor: '#31a1e5',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        height: 30,
    },
    imgText: {
        fontSize: '18',
        color: '#111851',
        paddingTop: 10,
        paddingHorizontal: 8
    },
    categoryList: {
        maxHeight: 150, // Adjust this value based on how many items you want to show without scrolling
        marginBottom: 10,
    },
    categoryItem: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 5,
        borderRadius: 20,
        backgroundColor: '#F0F6FE',
        borderWidth: 1,
        borderColor: '#31a1e5',
    },
    selectedCategoryItem: {
        backgroundColor: '#31a1e5',
    },
    categoryText: {
        color: '#111851',
        fontSize: 16,
    },
    selectedCategoryText: {
        color: '#FFFFFF',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#31a1e5',
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        height: 50,
        width: '100%',
    },
    picker: {
        height: 50,
        width: '100%',
    },
});
