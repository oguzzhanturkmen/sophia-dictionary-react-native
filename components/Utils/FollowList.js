// FollowersScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

const FollowerItem = ({ username, bio, imageUrl, userId, entryCount }) => (
  <TouchableOpacity
    style={styles.itemContainer}
    onPress={() =>
      router.navigate({
        pathname: `profiles/${userId}`,
        params: {
          id: userId,
        },
      })
    }
  >
    <Image
      source={{ uri: imageUrl ? imageUrl : "" }}
      style={styles.profileImage}
    />
    <View style={styles.textContainer}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.bio}>{bio}</Text>
    </View>
  </TouchableOpacity>
);

const FollowList = ({ data }) => {
  return (
    
    <FlatList
      data={data}
      keyExtractor={(item) => item.userId}
      renderItem={({ item }) => (
        <FollowerItem
          username={item.username}
          bio={item.bio}
          imageUrl={item.profileImage}
          userId={item.userId}
          entryCount={item.entryCount}
        />
      )}
    />
  );
  ;
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "grey",
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  bio: {
    color: "grey",
  },
});

export default FollowList;
