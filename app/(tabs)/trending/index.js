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
import SearchBar from "../../../components/Utils/SearchBar";
import { getSearch } from "../../../api/search";
import FollowList from "../../../components/Utils/FollowList";
import { Text } from "react-native";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function HomePage() {
  const [topics, setTopics] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [onRefresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); 
  const [searchType, setSearchType] = useState("topic");
  const [isEmpty, setIsEmpty] = useState(false);
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsLogged(token !== null);
    };

    const fetchTopics = async () => {
      
      let res;
      if (isSearching && searchQuery) {
        res = await getSearch(searchQuery, currentPage); 
      } else {
        res = await getTopics(currentPage);
      }

      if (res && Object.keys(res).length !== 0 && res.content.length > 0) {
        if(searchType === "user"){
          setUsers(res.content);
          setTotalPages(res.totalPages);
          setIsEmpty(false);
        
        }
        else{
        setTopics(res.content);
        setTotalPages(res.totalPages);
        setIsEmpty(false);
        console.log('API call successful');
        setUsers([]);
      }
        
      } else {
        setIsEmpty(true);
        console.log('API call failed or returned no data');
      }
    };
    
    checkLoginStatus();
    fetchTopics();
  }, [isLogged, currentPage, onRefresh, isSearching]);

  useEffect(() => {
    
    setIsSearching(searchQuery.length > 3);
    if(searchQuery.startsWith("@")) setSearchType("user");
    else setSearchType("topic");
    
    setCurrentPage(0);
  }, [searchQuery]);

  const handleRefresh = (done) => {
  
    setRefresh(!onRefresh); 
    if(done) done();
  };
  const handleRenderContentForSearch = () => {
    if(isEmpty) {
      return <View style={styles.emptyContainer}><Text style={styles.emptyText}>No results found</Text></View>;
    }
    else if(searchType === "user") {
      return <FollowList data={users} />;
    }
    return <TopicListView topics={topics} path={"trending"} onRefresh={handleRefresh} />;
  };


  const handlePrevPage = () => setCurrentPage(prev => (prev > 0 ? prev - 1 : prev));
  const handleNextPage = () => setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : prev));


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <Header isLogged={isLogged} setModalVisible={setModalVisible} setRefresh={setRefresh} pageName={"Trending"} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}></SearchBar>
      </SafeAreaView>
      {handleRenderContentForSearch()}
      
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 20,
  },
});
