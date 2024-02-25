import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';


const ProfileScreen = () => {
    // Dummy data for demonstration
    const userInfo = {
      profilePic: 'https://your-image-url.com/pic.jpg',
      followersCount: 120,
      followingCount: 75,
      entriesCount: 90,
      lastEntries: [
        { id: '1', title: 'Entry 1', description: 'Description of Entry 1' },
        { id: '2', title: 'Entry 2', description: 'Description of Entry 2' },
        // Add more entries as needed
      ],
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.profileInfoContainer}>
          <Image source={{ uri: userInfo.profilePic }} style={styles.profilePic} />
          <View style={styles.countersContainer}>
            <Text>Followers: {userInfo.followersCount}</Text>
            <Text>Following: {userInfo.followingCount}</Text>
            <Text>Entries: {userInfo.entriesCount}</Text>
          </View>
        </View>
        <FlatList
          data={userInfo.lastEntries}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.entryContainer}>
              <Text style={styles.entryTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    profileInfoContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    profilePic: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    countersContainer: {
      flex: 1,
      justifyContent: 'space-around',
      marginLeft: 20,
    },
    entryContainer: {
      marginBottom: 10,
    },
    entryTitle: {
      fontWeight: 'bold',
    },
  });
  