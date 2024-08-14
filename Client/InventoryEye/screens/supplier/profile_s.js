import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react'
import Info from '../../components/profile/info'
import CuponsHistory from '../../components/profile/cuponsHistory'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils';
import { GET, DELETE } from '../../api';
import BonusDetailsModal from './bonusModal';

export default function S_profile() {
    const navigation = useNavigation();
    const [userBonus, setUserBonus] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBonus, setSelectedBonus] = useState(null);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState({
        id: 0,
        role: 0,
        lastSeen: '',
        fullName: '',
        emailAddress: '',
        password: '',
        birthDate: '',
        lat: 0,
        lng: 0,
        address: '',
        image: '',
        createdAt: '',
        score: 0,
    });

    useFocusEffect(useCallback(() => {
        fetchUserData();
        fetchCategories();
    }, [user.id]));

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("logged user");
            navigation.navigate('Login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('logged user');
            if (jsonValue != null) {
                const userData = JSON.parse(jsonValue);
                setUser({
                    id: userData.id,
                    role: userData.role,
                    lastSeen: userData.lastSeen,
                    fullName: userData.fullName,
                    emailAddress: userData.emailAddress,
                    password: userData.password,
                    birthDate: userData.birthDate,
                    lat: userData.lat,
                    lng: userData.lng,
                    address: userData.address,
                    image: userData.image,
                    createdAt: userData.createdAt,
                    score: userData.score
                });
                fetchUserBonus(userData.id);
            } else {
                console.error('No user data found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
        }
    };

    const fetchUserBonus = async (userId) => {
        try {
            const response = await GET(`Bonus/UserId/${userId}`);
            setUserBonus(response);
        } catch (error) {
            console.error('Error fetching user bonuses:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await GET('Categories');
            setCategories(response);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    const handleBonusPress = async (bonusId) => {
        try {
            const response = await GET(`Bonus/bonusId/${bonusId}`);
            setSelectedBonus(response);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching bonus details:', error);
        }
    };

    const handleDelete = async (bonusId) => {
        try {
            await DELETE(`Bonus/${bonusId}`);
            setModalVisible(false);
            fetchUserBonus(user.id);
        } catch (error) {
            console.error('Error deleting bonus:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <View style={styles.frame}>
                    <View style={styles.inner}>
                        <Info fullName={user.fullName}
                            profileImage={{ uri: user.image }}
                            email={user.emailAddress}
                            birthdate={formatDate(new Date(user.createdAt))}
                            city={user.address}></Info>
                        <View style={styles.editIcon}>
                            <TouchableOpacity>
                                <AntDesign name="edit" size={24} color="#111851" onPress={() => navigation.navigate('Edit Profile')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.second}>
                <View style={styles.bonusHistory}>
                    <View style={styles.bonusText}>
                        <Text style={{ textAlign: 'left', marginLeft: '9%' }}>
                            Bonus History </Text>
                    </View>
                    <ScrollView horizontal contentContainerStyle={styles.bonusList}>
                        {userBonus.map((bonus) => (
                            <CuponsHistory
                                key={bonus.bonusId}
                                bonusPic={bonus.image}
                                bonusId={bonus.bonusId}
                                onBonusPress={() => handleBonusPress(bonus.bonusId)}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.logoutButtonContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
            {selectedBonus && (
                <BonusDetailsModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onDelete={handleDelete}
                    bonus={selectedBonus}
                    categories={categories}  
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF0F3',
        paddingTop: '20%',
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    frame: {
        backgroundColor: '#87CEEB',
        height: "72%",
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        position: 'relative',
        marginTop: '10%'
    },
    inner: {
        backgroundColor: 'white',
        width: '90%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        left: 30
    },
    second: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    bonusHistory: {
        backgroundColor: '#ADD8E6',
        justifyContent: 'center',
        width: '73%',
        height: '23%',
        borderRadius: 40,
        marginHorizontal: '12%',
        marginBottom: '10%',
    },
    bonusList: {
        flexDirection: 'row',
        marginLeft: '5%'
    },
    logoutButtonContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    logoutButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#31A1E5'
    },
    logoutButtonText: {
        color: '#111851',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalView: {
        position: 'absolute',
        top: '45%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '97%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#31A1E5',
    },
    modalTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#111851',
        marginBottom: 7
    },
    modalText: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})


