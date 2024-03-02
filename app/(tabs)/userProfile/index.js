import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar, Dimensions, ScrollView } from "react-native";

import { getUserDataForProfile, getUserDataForOtherProfiles } from "../../../api/api";
import ProfileHeader from "../../../components/Screens/Profile/UserProfile/ProfileHeader";
import UserProfileInfo from "../../../components/Screens/Profile/UserProfileInfo";
import ProfileActions from "../../../components/Screens/Profile/UserProfile/PorfileActions";
import SectionTabs from "../../../components/Screens/Profile/SectionTabs";
import UserEntries from "../../../components/Utils/UserEntriesList";
import ProfileInfo from "../../../components/Screens/Profile/UserProfile/ProfileInfo";
import TopicList from "../../../components/Utils/TopicList";

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const [userInformation, setUserInformation] = useState({});
  const [allInformation, setAllInformation] = useState({});
  const [sectionSelected, setSectionSelected] = useState("entries");
    const [entries, setEntries] = useState([]);
    const [topics, setTopics] = useState([]);
    const [likedEntries, setLikedEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserDataForProfile();
      setUserInformation(userInfo);
      const otherInfo = await getUserDataForOtherProfiles(userInfo.userId);
      setAllInformation(otherInfo);
    };

    fetchData();
  }, []);

  
  const selectSection = async (section) => {
    setSectionSelected(section);
    try {
      if (section === "topics") {
        const topicsData = await getCreatedTopicsByUser(id);
        setTopics(topicsData);
      } else if (section === "favorites") {
        const likedEntriesData = await getLikedEntries(id);
        setLikedEntries(likedEntriesData);
      }
    } catch (error) {
      Alert.alert("Error", `Failed to fetch data for ${section}.`);
    }
  };

  const renderSectionContent = () => {
    switch (sectionSelected) {
      case 'entries':
        return <UserEntries entries={entries} />;
      case 'topics':
        return <TopicList data={topics} />;
      case 'favorites':
        return <UserEntries entries={likedEntries} />;
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
    <StatusBar style="light" />
    <SafeAreaView style={{ backgroundColor: "#191919" }}>
      <ProfileHeader username={userInformation.username} />
    </SafeAreaView>
    <ScrollView style={{ flex: 1 }}>
      <ProfileInfo userInformation={userInformation} />
      <UserProfileInfo username={userInformation.username} bio={userInformation.bio} />
      <ProfileActions />
      <SectionTabs sectionSelected={sectionSelected} onSelectSection={selectSection} />
      {renderSectionContent()}
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    height: height,
    width: width,
  },
});

export default Profile;
