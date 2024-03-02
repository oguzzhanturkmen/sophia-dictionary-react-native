import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get("window");

const ProfileInfo = ({ userInformation }) => {
  return (
    <View style={styles.profileContainer}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
        style={styles.profilePicture}
      />
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userInformation.entryCount}</Text>
          <Text style={styles.statLabel}>Entries</Text>
        </View>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => router.navigate(`/userProfile/${userInformation.userId}/followers`)}
        >
          <Text style={styles.statValue}>{userInformation.followerCount}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => router.navigate(`/userProfile/${userInformation.userId}/following`)}
        >
          <Text style={styles.statValue}>{userInformation.followingCount}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 15,
    justifyContent: "flex-start",
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.6,
  },
  statItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  statLabel: {
    color: "white",
    fontSize: 14,
  },
});

export default ProfileInfo;
