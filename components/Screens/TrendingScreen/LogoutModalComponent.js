import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { logoutUser } from "../../../api/auth"; 
import { router } from 'expo-router';
const LogOutModal = ({ modalVisible, setModalVisible }) => {
  const handleLogout = async () => {
    await logoutUser(); 
    setModalVisible(false); 
    router.replace('/');
    
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want to log out?</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonLogout]} onPress={handleLogout}>
              <Text style={styles.textStyle}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", 
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2f2f31",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10, 
  },
  buttonClose: {
    backgroundColor: "gray",
  },
  buttonLogout: {
    backgroundColor: "gray", 
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
});

export default LogOutModal;
