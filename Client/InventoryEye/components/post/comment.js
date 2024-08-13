import { Modal, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

export default function Comment({ profilepic, score, fullName, content, inventoryeye, location, bought, store, stock, datepub, datepurch, quality, rank, onRatePress, commentId, userId, supplier, currentUserId, onEditPress, onDeletePress }) {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const canModify = userId === currentUserId;

  const toggleDeleteModal = () => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
  };

  const handleDelete = () => {
    onDeletePress(commentId);
    toggleDeleteModal();
  };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.leftUp}>
          {profilepic && <Image source={profilepic} style={styles.myImg} />}
          <View style={styles.scoreContainer}>
            <AntDesign name="star" size={22} color="#31A1E5" />
            <Text style={styles.scoreText}>{score}</Text>
          </View>
        </View>
        {!supplier && (
          <View style={styles.leftDown}>
            <TouchableOpacity
              style={styles.relativeContainer}
              onPress={() => onRatePress(commentId, userId)}
            >
              <AntDesign name="star" size={26} color="#31A1E5" style={styles.starIcon} />
              <View style={styles.Plus}>
                <Text style={styles.plusText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.right}>
        <View style={styles.headerRow}>
          <Text style={styles.fullNameText}>{fullName}</Text>
          {canModify && (
            <View style={styles.actionIcons}>
              <TouchableOpacity onPress={() => onEditPress(commentId)} style={styles.iconButton}>
                <AntDesign name="edit" size={20} color="#31A1E5" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleDeleteModal} style={styles.iconButton}>
                <AntDesign name="delete" size={20} color="#31A1E5" />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
        </View>
      </View>

      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleDeleteModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.deleteText}>Are you sure you want to delete this comment?</Text>
            <Text style={styles.deleteText}>This action cannot be undone</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.modalbtn} onPress={toggleDeleteModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalbtn} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
    marginRight: 15,
    marginTop: 5
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 5,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalbtn: {
    backgroundColor: '#31A1E5',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});


