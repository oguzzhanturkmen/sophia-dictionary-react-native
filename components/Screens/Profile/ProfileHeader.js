// ProfileHeader.js
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileHeader = ({ userInformation, onNavigateFollowers, onNavigateFollowing }) => (
  <View style={styles.headerContainer}>
    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.profilePicture} />
    <View style={styles.statsContainer}>
      <Text style={styles.statText}>{userInformation.entryCount} Entries</Text>
      <TouchableOpacity onPress={onNavigateFollowers}>
        <Text style={styles.statText}>{userInformation.followerCount} Followers</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNavigateFollowing}>
        <Text style={styles.statText}>{userInformation.followingCount} Following</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 0,
    justifyContent: 'flex-start',
    paddingBottom: 15,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  statText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ProfileHeader;
