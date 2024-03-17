import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PlusCircleIcon, Cog8ToothIcon } from 'react-native-heroicons/outline';
import { router } from 'expo-router';

const ProfileHeader = ({ username, setRefresh, onPressSettingsButton }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{ marginLeft: 8 }}
        onPress={() => router.push("/createTopic")}
      >
        <PlusCircleIcon size="38" strokeWidth={2.5} color="#80c04e" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={() => setRefresh(true)}
      >
        <Text style={styles.username}>{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress= {onPressSettingsButton}
        style={{ marginRight: 8 }}
      >
        <Cog8ToothIcon size="38" strokeWidth={2} color={"#80c04e"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    paddingBottom: 15,
  },
  username: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProfileHeader;
