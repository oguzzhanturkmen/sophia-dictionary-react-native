// FollowMessageButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FollowMessageButtons = ({ isFollowed, onFollowUser }) => (
  <View style={styles.buttonsContainer}>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: isFollowed ? '#414142' : '#80c04e' }]}
      onPress={onFollowUser}
    >
      <Text style={styles.buttonText}>{isFollowed ? 'Unfollow' : 'Follow +'}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, { backgroundColor: '#414142' }]}>
      <Text style={styles.buttonText}>Message +</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  button: {
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FollowMessageButtons;
