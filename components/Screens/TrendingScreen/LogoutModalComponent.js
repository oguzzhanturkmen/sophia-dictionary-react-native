import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { logoutUser } from "../../../api/auth"; 
const LogOutModal = ({ modalVisible, setModalVisible }) => {
  const handleLogout = async () => {
    await logoutUser(); // Implement logout logic as needed
    setModalVisible(false); // Close modal after logging out
    // Additional steps after logout (e.g., navigate to login screen) can be added here
  };

  return (
    <Modal
      animationType="slide"
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
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    marginHorizontal: 10, // Adds spacing between buttons
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonLogout: {
    backgroundColor: "#f44336", // Red color for logout to indicate a potentially destructive action
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default LogOutModal;
