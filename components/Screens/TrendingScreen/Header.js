import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PlusCircleIcon, UserCircleIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";

const Header = ({ isLogged, setModalVisible, setRefresh, pageName }) => {
  return (
    <View style={styles.headerContainer}>
      {isLogged ? (
        <TouchableOpacity
          onPress={() => router.navigate("/createTopic")}
          style={styles.leftIcon}
        >
          <PlusCircleIcon size="38" strokeWidth={2.5} color="#80c04e" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => setRefresh(true)}
      >
        <Text style={styles.titleText}>{pageName}</Text>
      </TouchableOpacity>
      {isLogged ? (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.rightIcon}
        >
          <UserCircleIcon size="38" strokeWidth={2} color={"#80c04e"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => router.replace("/login")}
          style={styles.rightIcon}
        >
          <UserCircleIcon size="38" strokeWidth={2} color={"#80c04e"} />
        </TouchableOpacity>
      )}
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
  leftIcon: { marginLeft: 8 },
  titleContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  titleText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  rightIcon: { marginRight: 8 },
});

export default Header;
