import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import C_header from '../../components/c_home/c_header'
import S_header from '../../components/s_home/s_header'
import Search from '../../components/c_home/search'
import { GET } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const handleCategoryPress = (categoryId) => {
    if (user.role === 2) {
      navigation.navigate('UserTabs', {
        screen: 'Home',
        params: { categoryP: categoryId }
      });
    } else if (user.role === 3) {
      navigation.navigate('SupplierTabs', {
        screen: 'Home',
        params: { categoryP: categoryId }
      });
    }
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('logged user');
        if (userData) {
          const user = JSON.parse(userData);
          setUser(user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GET('Categories');
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {user.role === 2 ? (
          <C_header fullName={user.fullName} notiNum={12} profileImage={{ uri: user.image }} userScore={user.score} />
        ) : user.role === 3 ? (
          <S_header fullName={user.fullName} profileImage={{ uri: user.image }} />
        ) : null}
      </View>
      <View style={styles.inEye}>
        <Text style={styles.keepEyeText}>Keep an eye on ... </Text>
      </View>
      <ScrollView contentContainerStyle={[styles.bottomContainer, { flexGrow: 1 }]}>
        <View style={styles.categLeft}>
          {categories.slice(0, 5).map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(category.categoryId)}
            >
              <View style={styles.categoriesContainer}>
                <Text style={styles.categoryText}>{category.categoryDesc}</Text>
                <Image source={{ uri: category.categoryImage }} style={styles.image} />
              </View>
            </TouchableOpacity>

          ))}
        </View>

        <View style={styles.categRight}>
          {categories.slice(5, 10).map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(category.categoryId)}
            >
              <View style={styles.categoriesContainer}>
                <Text style={styles.categoryText}>{category.categoryDesc}</Text>
                <Image source={{ uri: category.categoryImage }} style={styles.image} />
              </View>
            </TouchableOpacity>

          ))}
        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F3',
  },
  topContainer: {
    paddingTop: 40,
    height: '15%',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start', // Changed from 'left' to 'flex-start'
    // Remove height: '100%',
  },
  categLeft: {
    width: '50%',
    //height: '100%',
    //backgroundColor: 'red', 
    paddingTop: 5, //10
    paddingHorizontal: 28
  },
  categRight: {
    width: '50%',
    //height: '100%',
    // backgroundColor: 'yellow', 
    paddingTop: 5, //10, 
    paddingHorizontal: 28
  },
  inEye: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
    alignItems: 'center',
    paddingVertical: 10,
  },
  keepEyeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111851',
    marginLeft: '13%',
    //marginBottom:'4%',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#111851',
    borderWidth: 1,
    margin: 7,
    marginHorizontal: '10%',
    marginVertical: '5%'//10
  },
  categoryText: {
    fontSize: '12',
    fontWeight: 'bold',
    color: '#111851',
    paddingTop: 10,
    textAlign: 'center'
  },
  categoriesContainer: {
    width: '180',
    height: '180',
    borderRadius: 30,
    borderColor: '#111851',
    borderWidth: 1,
    backgroundColor: '#F0F6FE',
    marginVertical: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
})