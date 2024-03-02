// UserProfileInfo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfileInfo = ({ username, bio }) => (
  <View style={styles.userInfo}>
    <Text style={styles.username}>{username}</Text>
    {bio && <Text style={styles.bio}>{bio}</Text>}
  </View>
);

const styles = StyleSheet.create({
  userInfo: {
    paddingHorizontal: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
    color: 'white',
  },
  bio: {
    color: 'white',
  },
});

export default UserProfileInfo;
