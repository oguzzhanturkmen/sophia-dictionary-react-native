// FollowersScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';

// Mock data for demonstration purposes
const followersData = [
  {
    id: '1',
    username: 'user1',
    bio: 'Loves coding and coffee',
    imageUrl: 'https://example.com/user1.jpg',
  },
  {
    id: '2',
    username: 'user2',
    bio: 'Travel, Music, and Coding',
    imageUrl: 'https://example.com/user2.jpg',
  },
  // Add more followers as needed
];

const FollowerItem = ({ username, bio, imageUrl }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: imageUrl }} style={styles.profileImage} />
    <View style={styles.textContainer}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.bio}>{bio}</Text>
    </View>
  </View>
);

const FollowList = () => {
  // In a real app, you'd fetch this data from a server
  const [followers, setFollowers] = useState(followersData);

  return (
    <FlatList
      data={followers}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <FollowerItem
          username={item.username}
          bio={item.bio}
          imageUrl={item.imageUrl}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'grey',
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  bio: {
    color: 'grey',
  },
});

export default FollowList;
