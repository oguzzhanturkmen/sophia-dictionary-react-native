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
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { Slot, router } from "expo-router";
import { getAllTopics } from "../../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "../../../api/auth";
import LogOutButton from "../../../components/LogOutButton";
import { useState } from "react";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function HomePage() {
  const [topics, setTopics] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

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

    getAllTopics(currentPage).then((res) => {
      setTopics(res.content);
      setTotalPages(res.totalPages);
    });
  }, [isLogged, currentPage]);

  useEffect(() => {
    if (refresh) {
      getAllTopics(currentPage).then((res) => {
        setTopics(res.content);
        setTotalPages(res.totalPages);
        console.log(res.content);
      });
      setRefresh(false);
    }
  }, [refresh]);
  // Rerender page api requests every time the page is loaded

  return (
    <View
      className=""
      style={{
        backgroundColor: "#191919",
        height: height,
        width: width,
      }}
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
              style={{ marginLeft: 8 }}
              onPress={() => router.navigate("/createTopic")}
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
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ marginRight: 8 }}
            >
              <UserCircleIcon size="38" strokeWidth={2} color={"#80c04e"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => router.replace("/login")}
              style={{ marginRight: 8 }}
            >
              <UserCircleIcon size="38" strokeWidth={2} color={"#80c04e"} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      <SearchBar />
      <View style={{ paddingBottom: height * 0.3 }}>
        <TopicList data={topics} />
      </View>
      <LogOutButton
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View
        style={{
          height: height * 0.045,
          width: width,
          backgroundColor: "#191919",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          position: "absolute",
          alignItems: "center",
          bottom: height * 0.085,
          zIndex: 100,
        }}
      >
        <View>
          <TouchableOpacity onPress={handlePrevPage}>
            <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {currentPage + 1} / {totalPages}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleNextPage}>
            <ChevronRightIcon size="38" strokeWidth={2.5} color="#80c04e" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
