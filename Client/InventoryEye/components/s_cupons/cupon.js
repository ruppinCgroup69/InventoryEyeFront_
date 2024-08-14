import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function Cupon({ name, description, category, bonusImage, profileImage, fullName, minScore, numDownloads, publishedDate, publishedHour, style }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.cupon}>
        <Image source={bonusImage} style={styles.bonusImage} />
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <Image source={profileImage} style={styles.profileImage} />
          <View style={styles.footerText}>
            <Text style={styles.fullName} numberOfLines={1}>{fullName}</Text>
            <Text style={styles.date}>{publishedDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#BACAD6',
    borderRadius: 10,
    backgroundColor: 'white',
    flex: 1, 
    marginBottom: 10
   },
  cupon: {
    flex: 1,

  },
  bonusImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  footerText: {
    flex: 1,
  },
  fullName: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 8,
    color: '#999',
  },
});


