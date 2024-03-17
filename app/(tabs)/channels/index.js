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
import {getChannels} from "../../../api/channel"
import ChannelList from "../../../components/Utils/ChannelList";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function HomePage() {

  const [channels , setChannels] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [onRefresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      const res = await getChannels();
      setChannels(res);
      
    };
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsLogged(token !== null);
    };
    fetchChannels();
    checkLoginStatus();
  }
  , [onRefresh, isLogged]);
  const handleRefresh = (done) => {
  
    setRefresh(!onRefresh); 
    if(done) done();
  };
 

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <Header isLogged={isLogged} setModalVisible={setModalVisible} setRefresh={setRefresh} pageName={"Channels"}/>
      </SafeAreaView>
     <ChannelList channels={channels} path={"Channels"} />
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
