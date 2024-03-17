import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from "expo-router";

const ProfileActions = ({ onEditPress, onSharePress }) => {

  
  
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onEditPress}
      >
        <Text style={styles.actionText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onSharePress}
      >
        <Text style={styles.actionText}>Share Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 15, 

  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 6,
    borderRadius: 9,
    flex: 1, 
    marginHorizontal: 15, 
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileActions;
