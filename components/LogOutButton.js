import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import { logoutUser} from '../api/auth'
import { Dimensions } from 'react-native'


import React from 'react'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function LogOutButton({modalVisible, setModalVisible}) {
  return (
    <Modal
  
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <TouchableOpacity
    style={styles.modalOverlay}
    activeOpacity={1}
    onPressOut={() => setModalVisible(false)}
  >
    <View style={styles.modalContent}>
      <TouchableOpacity
        onPress={() => {
          logoutUser();
          setModalVisible(false);
        }}
        
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
</Modal>

  )
}

const styles = StyleSheet.create({
    // Existing styles...
    modalOverlay: {
      flex: 1,
      position: 'absolute',
      width: width,
        height: height,
      
      
      
      
    },
    modalContent: {
      backgroundColor: '#333',
        position: 'absolute',
        width: width * 0.3,
        height: height * 0.08,
        right: width * 0.07,
        top: height * 0.11,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
        justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    logoutButton: {
      backgroundColor: '#444',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    logoutButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      
    },
  });
  