import { View, Text, Modal, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import TopicList from "../../../components/TopicList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../../components/SearchBar";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  Bars3Icon,
  ChevronLeftIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { Slot, router } from "expo-router";
import { getAllTopics } from "../../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "../../../api/auth";
import LogOutButton from "../../../components/LogOutButton";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function HomePage() {
  const [topics, setTopics] = React.useState([]);
  const [isLogged, setIsLogged] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token !== null) {
        console.log(token + " is logged");
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };

    checkLoginStatus();

    getAllTopics().then((res) => {
      setTopics(res.content);
      console.log(res.content);
    });
  }, [isLogged]);

  useEffect(() => {
    if (refresh) {
      getAllTopics().then((res) => {
        setTopics(res.content);
        console.log(res.content);
      });
      setRefresh(false);
    }
  }, [refresh]);
  // Rerender page api requests every time the page is loaded

  return (
    <View
      className=""
      style={{ backgroundColor: "#191919", height: height, width: width }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ backgroundColor: "#191919", marginBottom: -30 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 8,
            paddingBottom: 15,
          }}
        >
          {isLogged ? (
            <TouchableOpacity
              className="rounded-xl p-1 "
              style={{ marginLeft: -8 }}
              onPress={() => router.navigate("/createtopic")}
            >
              <PlusCircleIcon size="38" strokeWidth={2.5} color="#80c04e" />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => setRefresh(true)}
          >
            <Text
              style={{
                color: "white",
                fontSize: 24,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {"Trending"}
            </Text>
          </TouchableOpacity>
          {isLogged ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <UserCircleIcon size="38" strokeWidth={2} color={"#80c04e"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.replace("/login")}>
              <UserCircleIcon size="38" strokeWidth={2} color={"#80c04e"} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <SearchBar />
      <TopicList data={topics} />
      <LogOutButton
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
