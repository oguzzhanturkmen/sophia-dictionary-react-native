import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { Link, router } from "expo-router";
import { UserCircleIcon } from "react-native-heroicons/outline";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
} from "react-native-heroicons/outline";

import { useState } from "react";
import { HandThumbUpIcon as HandThumbUpIconSolid , HandThumbDownIcon as HandThumbDownIconSolid} from "react-native-heroicons/solid";
import { getEntries, likeAnEntry, dislikeAnEntry } from "../../api/entry";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export default function UserEntries({ entries }) {

  const username  = useContext(AuthContext).user.username;
  

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
  const [refresh, setRefresh] = useState(0);
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
  const handleRefresh = () => {
    setRefresh((prevKey) => prevKey + 1);
  };
  
  
  
  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.itemContainer,
        { backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#232323" },
      ]}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => router.push({
          pathname: `(tabs)/trending/${item.topicId}`,
          params: {
            
            name : item.entryTitle
          },
        })}>
        <Text style={styles.itemHeader}>{item.entryTitle}</Text>
        </TouchableOpacity>
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
              onPress={() => item.entryAuthor !== username ?
                router.navigate({
                  pathname: `profiles/${item.entryAuthorId}`,
                  params: {
                    id: item.entryAuthorId,
                  },
                }) : null
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
      data={entries}
      renderItem={renderItem}
      keyExtractor={(item) => item.entryId}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingLeft: height * 0.01,
    paddingBottom: height * 0.013,
    paddingTop: height * 0.013,
    width: width,
  },
  itemText: {
    color: "#ffffff",
    width: width * 0.97,
    fontSize: width * 0.038,
    marginBottom: 5,
  },
  itemHeader: {
    color: "#80c04e",
    width: width * 0.96,
    fontSize: width * 0.04,
    fontWeight: "600",
    marginBottom: 14,
    fontSize: 15,
  },
});
