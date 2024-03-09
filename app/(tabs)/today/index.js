import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllTopics } from "../../../api/api";
import Footer from "../../../components/Screens/TrendingScreen/FooterComponent";
import Header from "../../../components/Screens/TrendingScreen/Header";
import TopicListView from "../../../components/Screens/TrendingScreen/TopicListView";
import LogoutModalComponent from "../../../components/Screens/TrendingScreen/LogoutModalComponent";
import {getTopics} from "../../../api/topic"


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function HomePage() {
  const [topics, setTopics] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [onRefresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsLogged(token !== null);
    };

    const fetchTopics = async () => {
      const res = await getTopics(currentPage);
      setTopics(res.content);
      setTotalPages(res.totalPages);
    };
    
    checkLoginStatus();
    fetchTopics();
  }, [isLogged, currentPage, onRefresh]);

  const handlePrevPage = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  const handleRefresh = (done) => {
  
    setRefresh(!onRefresh); 
    if(done) done();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <Header isLogged={isLogged} setModalVisible={setModalVisible} setRefresh={setRefresh} pageName={"Today"}/>
      </SafeAreaView>
      <TopicListView topics={topics} path={"today"} onRefresh={handleRefresh}/>
      <Footer
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <LogoutModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    height: height,
    width: width,
  },
  safeArea: {
    backgroundColor: "#191919",
    marginBottom: -30,
  },
});
