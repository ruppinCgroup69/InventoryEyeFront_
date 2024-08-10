import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function Comment({ profilepic, score, fullName, content, inventoryeye, location, bought, store, stock, datepub, datepurch, quality, rank }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.leftUp}>
          <Image source={profilepic} style={styles.myImg} />
          <View style={styles.scoreContainer}>
            <AntDesign name="star" size={22} color="#31A1E5" />
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </View>
        <View style={styles.leftDown}>
          <TouchableOpacity style={styles.relativeContainer}>
            <AntDesign name="star" size={26} color="#31A1E5" style={styles.starIcon} />
            <View style={styles.Plus}>
              <Text style={styles.plusText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.fullNameText}>{fullName}</Text>
        <Text style={styles.contentText}>{content}</Text>
        <Text style={{ fontSize: 13, color: "#111851" }}>I kept an eye on it on: <Text style={{ fontSize: 13, color: "black" }}>{inventoryeye}</Text></Text>
        <Text style={{ fontSize: 13, color: "#111851" }}>Location: <Text style={{ fontSize: 13, color: "black" }}>{location}</Text></Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.contentleft}>
            <Text style={{ fontSize: 13, color: "#111851" }}>Store: <Text style={{ fontSize: 13, color: "black" }}>{store}</Text></Text>
            <Text style={{ fontSize: 13, color: "#111851" }}>Stock Level: <Text style={{ fontSize: 13, color: "black" }}>{stock}</Text></Text>
          </View>
          <View style={styles.contentright}>
            <Text style={{ fontSize: 13, color: "#111851" }}>Purchased by me?: <Text style={{ fontSize: 13, color: "black" }}>{bought}</Text></Text>
            {bought === 'Yes' && (
              <>
                {quality !== undefined && <Text style={{ fontSize: 13, color: "#111851" }}>Product quality: <Text style={{ fontSize: 13, color: "black" }}>{quality}</Text></Text>}
                {datepurch && <Text style={{ fontSize: 13, color: "#111851" }}>Purchase Date: <Text style={{ fontSize: 13, color: "black" }}>{datepurch}</Text></Text>}
                {rank !== undefined && <Text style={{ fontSize: 13, color: "#111851" }}>Satisfaction rank: <Text style={{ fontSize: 13, color: "black" }}>{rank}</Text></Text>}
              </>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '2%' }}>
          <Text style={{ color: '#B0B0B0', fontSize: 10 }}>{datepub}</Text>
          <TouchableOpacity style={{ marginLeft: '5%' }}>
            <Text style={{ color: '#B0B0B0', fontSize: 10 }}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  left: {
    width: '25%',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    // backgroundColor: 'yellow'
  },
  leftUp: {
    alignItems: 'center',
  },
  leftDown: {
    alignItems: 'center',
    marginTop: '2%'
  },
  myImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#111851',
  },
  scoreContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 53,
    zIndex: 1,
  },
  scoreText: {
    position: 'absolute',
    top: 6,
    color: 'white',
    fontSize: 10,
  },
  starIcon: {
    paddingTop: '15%',
  },
  relativeContainer: {
    position: 'relative',
  },
  Plus: {
    backgroundColor: '#FC8D8D',
    borderRadius: 6,
    width: 12,
    height: 12,
    top: 10,
    left: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  plusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    paddingLeft: 0.5,
    paddingBottom: 15
  },
  right: {
    width: '75%',
  },
  fullNameText: {
    fontSize: 16,
    color: '#111851',
  },
  contentText: {
    fontSize: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  contentright: {
    marginLeft: '2%'
  }
});
