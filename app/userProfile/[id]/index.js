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
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  PlusCircleIcon,
  UserCircleIcon,
  Cog8ToothIcon,
} from "react-native-heroicons/outline";
import { useState } from "react";
import ContentList from "../../../components/ContentList";
import { Stack, Tabs, router } from "expo-router";
import { getUserDataForOtherProfiles } from "../../../api/api";
import { useLocalSearchParams } from "expo-router";
import UserEntries from "../../../components/UserEntriesList";

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [userInformation, setUserInformation] = useState({});

  const [refresh, setRefresh] = useState(false);
  const [sectionSelected, setSectionSelected] = useState("topics");

  const selectSection = (section) => {
    setSectionSelected(section);
  };

  useEffect(() => {
    getUserDataForOtherProfiles(id).then((res) => {
      setUserInformation(res);
      console.log(res);
    });
  }, []);

  // Mock user data
  const userData = {
    username: "john_doe",
    fullName: "John Doe",
    followers: 250,
    following: 20,
    postsX: 30,
    profilePicture: "https://via.placeholder.com/100",
    bio: "📷 Photographer | 🌎 Traveler | 📚 Book Lover",
    posts: Array.from(
      { length: 30 },
      (_, i) => `https://picsum.photos/200/300?random=${i + 1}`
    ),
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
              onPress={() => router.back()}
            >
              <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
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

            <View style={{ width: 38 }}></View>
          </View>
        </SafeAreaView>

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: userData.profilePicture }}
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
          <Text style={styles.bio}>{userInformation?.bio}</Text>
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
          <UserEntries entries={userInformation.entries} />
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
    paddingBottom: 2,
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