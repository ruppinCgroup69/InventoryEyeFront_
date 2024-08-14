import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import S_header from '../../components/s_home/s_header';
import Cupon from '../../components/s_cupons/cupon';
import { GET, DELETE } from '../../api';
import { formatDate, formatTime } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BonusDetailsModal from './bonusModal';

export default function My_Cuppons() {
  const [user, setUser] = useState({});
  const [userBonus, setUserBonus] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('logged user');
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        setUser(userData);
        fetchUserBonus(userData.id);
      } else {
        console.error('No user data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await GET('Categories');
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCategories();
  }, []);

  const fetchUserBonus = async (userId) => {
    try {
      const response = await GET(`Bonus/UserId/${userId}`);
      setUserBonus(response);
    } catch (error) {
      console.error('Error fetching user bonuses:', error);
    }
  };

  const handleBonusPress = (bonus) => {
    setSelectedBonus(bonus);
    setModalVisible(true);
  };

  const handleDelete = async (bonusId) => {
    console.log(bonusId)
    try {
      await DELETE(`Bonus/${bonusId}`);
      setModalVisible(false);
      fetchUserBonus(user.id);
    } catch (error) {
      console.error('Error deleting bonus:', error);
    }
  };

  const renderBonusRow = (bonus1, bonus2) => (
    <View style={styles.bonusRow} key={`${bonus1.bonusId}-${bonus2?.bonusId || 'empty'}`}>
      <TouchableOpacity onPress={() => handleBonusPress(bonus1)} style={styles.touchable}>
        <Cupon
          name={bonus1.name}
          description={bonus1.description}
          category={bonus1.category}
          bonusImage={{ uri: bonus1.image }}
          profileImage={{ uri: bonus1.userImage }}
          fullName={bonus1.userName}
          minScore={bonus1.minScore}
          numDownloads={bonus1.numDownloads}
          publishedDate={formatDate(new Date(bonus1.editedAt))}
          publishedHour={formatTime(new Date(bonus1.editedAt))}
        />
      </TouchableOpacity>
      {bonus2 && (
        <TouchableOpacity onPress={() => handleBonusPress(bonus2)} style={styles.touchable}>
          <Cupon
            name={bonus2.name}
            description={bonus2.description}
            category={bonus2.category}
            bonusImage={{ uri: bonus2.image }}
            profileImage={{ uri: bonus2.userImage }}
            fullName={bonus2.userName}
            minScore={bonus2.minScore}
            numDownloads={bonus2.numDownloads}
            publishedDate={formatDate(new Date(bonus2.editedAt))}
            publishedHour={formatTime(new Date(bonus2.editedAt))}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <S_header fullName={user.fullName} profileImage={{ uri: user.image }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>My Bonuses:</Text>
        <View style={styles.bonusView}>
          {userBonus.length === 0 ? (
            <Text>No Bonuses were found</Text>
          ) : (
            [...Array(Math.ceil(userBonus.length / 2))].map((_, index) =>
              renderBonusRow(userBonus[index * 2], userBonus[index * 2 + 1])
            )
          )}
        </View>
      </ScrollView>
      {selectedBonus && (
        <BonusDetailsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onDelete={handleDelete}
          bonus={selectedBonus}
          categories={categories} // Pass categories here
        />
      )}
    </View>
  );
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
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    color: '#111851',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  bonusView: {
    padding: 10,
  },
  bonusRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  touchable: {
    flex: 1,
  },
  cupon: {
    flex: 1,
    marginHorizontal: 0,
    marginBottom: 10,
  },
});


