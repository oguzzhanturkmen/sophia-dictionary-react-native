import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Touchable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  PlusCircleIcon,
  UserCircleIcon,
  Cog8ToothIcon,
} from "react-native-heroicons/outline";
import { useState } from "react";

import {
  getUserDataForProfile,
  getUserDataForOtherProfiles,
} from "../../../api/api";
import { useLocalSearchParams } from "expo-router";
import UserEntries from "../../../components/Utils/UserEntriesList";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const navigation = useNavigation();
  const [userInformation, setUserInformation] = useState({});
  const [allInformation, setAllInformation] = useState({});

  const [refresh, setRefresh] = useState(false);
  const [sectionSelected, setSectionSelected] = useState("topics");

  // async fetchData methods
  useEffect(() => {
    getUserDataForProfile().then((res) => {
      setUserInformation(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    getUserDataForOtherProfiles(userInformation.userId).then((res) => {
      setAllInformation(res);
      console.log(res);
    });
  }, [userInformation]);

  const selectSection = (section) => {
    setSectionSelected(section);
  };



  const renderPostItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.postItem} />
  );

  return (
    <View style={{ backgroundColor: "#191919", height: height, width: width }}>
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
            <TouchableOpacity
              className="rounded-xl p-1 "
              style={{ marginLeft: 8 }}
              onPress={() => router.push("/createTopic")}
            >
              <PlusCircleIcon size="38" strokeWidth={2.5} color="#80c04e" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
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
                {userInformation.username}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ marginRight: 8 }}
            >
              <Cog8ToothIcon size="38" strokeWidth={2} color={"#80c04e"} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              
              style={styles.profilePicture}
            />

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                width: width * 0.4,
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white" }}>
                  {userInformation.entryCount}
                </Text>
                <Text style={{ color: "white" }}>Entries</Text>
              </View>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onPress={() => router.navigate("/userProfile/[id]/followers")}
              >
                <Text style={{ color: "white" }}>
                  {userInformation.followerCount}
                </Text>
                <Text style={{ color: "white" }}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onPress={() => router.navigate("/userProfile/[id]/following")}
              >
                <Text style={{ color: "white" }}>
                  {userInformation.followingCount}
                </Text>
                <Text style={{ color: "white" }}>Following</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.username}>{userInformation.username}</Text>
          </View>
          <Text style={styles.bio}>{userInformation.bio}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 8,
              paddingBottom: 5,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                backgroundColor: "gray",
                padding: 6,
                borderRadius: 9,
                marginHorizontal: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                backgroundColor: "gray",
                padding: 6,
                borderRadius: 9,
                marginHorizontal: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Share Profile
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: "#80c04e",
              height: 1,
              width: width * 0.95,
              marginVertical: 15,
              justifyContent: "center",
              alignSelf: "center",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 8,
              paddingBottom: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => selectSection("topics")}
              style={
                sectionSelected === "topics"
                  ? styles.selectedSection
                  : styles.notSelectedSection
              }
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {"Topics"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                sectionSelected === "entries"
                  ? styles.selectedSection
                  : styles.notSelectedSection
              }
              onPress={() => selectSection("entries")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {"Entries"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                sectionSelected === "favorites"
                  ? styles.selectedSection
                  : styles.notSelectedSection
              }
              onPress={() => selectSection("favorites")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {"Favorites"}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <UserEntries entries={allInformation.entries} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191919",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 0,
    justifyContent: "flex-start",
    paddingBottom: 15,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 15,
  },
  userInfo: {
    paddingHorizontal: 15,
    color: "white",
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 10,
    color: "white",
  },
  fullName: {
    color: "grey",
    color: "white",
  },
  bio: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    color: "white",
  },
  postsContainer: {
    flex: 1,
  },
  selectedSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#80c04e",
    borderRadius: "9",
    paddingVertical: 3,
    marginHorizontal: 10,
  },

  notSelectedSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: "9",
    paddingVertical: 3,
    marginHorizontal: 10,
  },
});

export default Profile;
