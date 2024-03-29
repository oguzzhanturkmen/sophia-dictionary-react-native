import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { Link, router } from "expo-router";
import { UserCircleIcon } from "react-native-heroicons/outline";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
} from "react-native-heroicons/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid , HandThumbDownIcon as HandThumbDownIconSolid} from "react-native-heroicons/solid";
import { getEntries, likeAnEntry, dislikeAnEntry } from "../../api/entry";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function ContentList({ id }) {

  const [content, setContent] = useState([]);
  const [topicInformation, setTopicInformation] = useState({});
  const [loggedInUser, setLoggedInUser] = useState("");
  

  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prevKey) => prevKey + 1);
  };

 
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEntries(id);
      setContent(data.entries.content);
      setTopicInformation(data.topic);
    
    };
    const getLoggedInUser = async () => {
      const user = await AsyncStorage.getItem("username");
      setLoggedInUser(user);
    };
    getLoggedInUser();

    console.log(loggedInUser);
    fetchData();
    
  }, [refresh]);

  const handleLike = (entryId) => {
    
    likeAnEntry(entryId).then((data) => {
      handleRefresh();
    }
    );
    
  };
    
  

  const handleDislike = (entryId) => {
    dislikeAnEntry(entryId).then((data) => {
      handleRefresh();
    }
    );
    
  }

  const parseContent = (content) => {
    
    const parts = content.split(/(\s#\w+)/g);
  
    return parts.filter(Boolean).map((part, index) => {
      if (part.startsWith(' #')) {
        return (
          <Text key={index} style={{ color: '#80c04e' , fontWeight : "400" }}>
            {part}
          </Text>
        );
      } else {
        
        return (
          <Text key={index} style={{ color: '#ffffff' }}>
            {part}
          </Text>
        );
      }
    });
  };


    



  const renderItem = ({ item, index }) => (
    
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#232323" },
      ]}
    >
      <View style={{ flex: 1 }}>
      <Text style={styles.itemText}>{parseContent(item.entryContent)}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", marginRight: 5 }}>
                {item.entryDate}{" "}
              </Text>
              <Text style={{ color: "white", marginRight: 10 }}>
                {item.entryTime}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => item.entryAuthor !== loggedInUser ?
                router.navigate({
                  pathname: `profiles/${item.entryAuthorId}`,
                  params: {
                    id: item.entryAuthorId,
                  },
                }) : router.push({
                  pathname: `/userProfile`,
                  params: {
                    id: item.entryAuthorId,
                  },
                })
              }
            >
              <Text
                style={{
                  color: "white",
                  marginRight: 10,
                  marginTop: 5,
                  color: "#80c04e",
                }}
              >
                {item.entryAuthor}
              </Text>
            </TouchableOpacity>
          </View>

          <UserCircleIcon
            size={42}
            strokeWidth={1}
            color="#80c04e"
            style={{ marginRight: 10 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: 5,
            marginRight: 10,
          }}
        >
         
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity onPress={() => handleLike(item.entryId)}>
            {item.liked ? (
            <HandThumbUpIconSolid
            size={20}
            strokeWidth={1}
            color="white"
            style={{ marginRight: 10 }}
            />)  : 
              (
              <HandThumbUpIcon
              size={20}
              strokeWidth={1}
              color="white"
              style={{ marginRight: 10 }}
            />
            )}
            </TouchableOpacity>
            
            <Text
              style={{
                color: "white",
                marginRight: 10,
                fontSize: 10,
                marginTop: 5,
              }}
            >
              {item.likeCount}
            </Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity onPress={() => handleDislike(item.entryId)}>
            {item.disliked ? (
              <HandThumbDownIconSolid
                size={20}
                strokeWidth={1}
                color="white"
                style={{ marginRight: 10 }}
              />
            ) : (
              <HandThumbDownIcon
                size={20}
                strokeWidth={1}
                color="white"
                style={{ marginRight: 10 }}
              />
            )}
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                marginRight: 10,
                fontSize: 10,
                marginTop: 5,
              }}
            >
              {item.dislikeCount}
            </Text>
          </View>
          <ShareIcon
            size={25}
            strokeWidth={1}
            color="white"
            style={{ marginRight: 10 }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={content}
      renderItem={renderItem}
      keyExtractor={(item) => item.entryId}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingLeft: height * 0.01,
    paddingBottom: height * 0.02,
    paddingTop: height * 0.013,
    width: width,
  },
  itemText: {
    color: "#ffffff",
    width: width * 0.97,
    fontSize: width * 0.038,
    marginBottom: 5,
  },
});
