import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import appLogo from '../../images/appLogo.png';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { GET,POST } from '../../api';

export default function Survey() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [stores, setStores] = useState({});
  const [selectedStores, setSelectedStores] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await GET('Categories');
        if (response && Array.isArray(response)) {
          const updatedCategories = response.map(category => ({
            ...category,
            categoryDesc: category.categoryDesc.replace(/&/g, ' and ')
          }));
          setCategories(updatedCategories);
        } else {
          console.log('Failed to fetch categories or invalid response');
        }
      } catch (error) {
        console.error('An error occurred while fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getStores = async () => {
      if (selectedCategories.length > 0) {
        try {
          const response = await GET('StoreCategories');
          if (response && Array.isArray(response)) {
            const storesByCategory = {};
            const initialSelectedStores = {};

            selectedCategories.forEach(categoryId => {
              const categoryStores = response.filter(store =>
                store.categoryId === categoryId && store.isActive
              );
              storesByCategory[categoryId] = categoryStores;
              initialSelectedStores[categoryId] = [];
            });

            setStores(storesByCategory);
            setSelectedStores(initialSelectedStores);
          } else {
            console.log('Failed to fetch stores or invalid response');
          }
        } catch (error) {
          console.error('An error occurred while fetching stores:', error);
        }
      }
    };

    if (step === 2) {
      getStores();
    }
  }, [step, selectedCategories]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter(id => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const toggleStore = (categoryId, storeId) => {
    setSelectedStores(prevSelected => {
      const updatedCategoryStores = prevSelected[categoryId] ? [...prevSelected[categoryId]] : [];
      if (updatedCategoryStores.includes(storeId)) {
        return {
          ...prevSelected,
          [categoryId]: updatedCategoryStores.filter(id => id !== storeId)
        };
      } else {
        return {
          ...prevSelected,
          [categoryId]: [...updatedCategoryStores, storeId]
        };
      }
    });
  };

  const handleCategorySubmit = () => {
    if (selectedCategories.length > 0) {
      setStep(2);
    } else {
      alert('Please select at least one category');
    }
  };

  const handleFinalSubmit = async () => {
    try {
      // Loop through each selected category
      for (const categoryId of selectedCategories) {
        // Loop through each selected store for the current category
        const storesForCategory = selectedStores[categoryId] || [];
        for (const storeId of storesForCategory) {
          const postData = {
            userId: user.id,
            favCategory: categoryId,
            favStore: storeId
          };
            
          const result = await POST('Survey', postData);
          if (result.ok) {
            navigation.navigate('Home', { user })
          } else {
            console.log('Failed to submit survey data');
          }
        }
      }
  
    } catch (error) {
      console.error('An error occurred while submitting survey data:', error);
    }
  };
  
  
  const handleBack = () => {
    setStep(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Preference Survey</Text>
        <Image source={appLogo} style={styles.image} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {step === 1 ? (
          <>
            <Text style={styles.question}>Please select the categories that interest you:</Text>
            <View style={styles.checkboxContainer}>
              {categories.map(category => (
                <View key={category.categoryId} style={styles.checkboxWrapper}>
                  <Checkbox
                    value={selectedCategories.includes(category.categoryId)}
                    onValueChange={() => toggleCategory(category.categoryId)}
                    color={selectedCategories.includes(category.categoryId) ? '#111851' : '#000000'}
                  />
                  <Text style={styles.checkboxLabel}>{category.categoryDesc}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleCategorySubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonTxt}>Next</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {selectedCategories.map(categoryId => (
              <View key={categoryId} style={styles.categorySection}>
                <Text style={styles.categoryQuestion}>
                  Select stores for {categories.find(c => c.categoryId === categoryId).categoryDesc}:
                </Text>
                {stores[categoryId] && stores[categoryId].map(store => (
                  <View key={store.storeId} style={styles.checkboxWrapper}>
                    <Checkbox
                      value={selectedStores[categoryId]?.includes(store.storeId)}
                      onValueChange={() => toggleStore(categoryId, store.storeId)}
                      color={selectedStores[categoryId]?.includes(store.storeId) ? '#111851' : '#000000'}
                    />
                    <Text style={styles.checkboxLabel}>{store.storeName}</Text>
                  </View>
                ))}
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonTxt}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleFinalSubmit}>
                <Text style={styles.buttonTxt}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
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
    alignSelf: 'center',
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#31A1E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTxt: {
    color: "#111851",
    fontSize: 24,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  checkboxContainer: {
    marginTop: 5,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000000',
  },
  question: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryQuestion: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    height: 40,
    width: 100,
    borderRadius: 15,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#31A1E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonTxt: {
    color: "#111851",
    fontSize: 24,
  },
});