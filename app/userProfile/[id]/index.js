import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
    getUserDataForOtherProfiles,
    getIsFollowed,
    getFollowUser,
    getCreatedTopicsByUser,
    getLikedEntries
  } from '../../../api/api';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import UserProfileInfo from '../../../components/Profile/UserProfileInfo';
import FollowMessageButtons from '../../../components/Profile/FollowMessageButtons';
import SectionTabs from '../../../components/Profile/SectionTabs';
import { useLocalSearchParams } from 'expo-router';
import UserEntries from '../../../components/UserEntriesList';
import TopicList from '../../../components/TopicList';
const { width, height } = Dimensions.get('window');

const Profile = () => {
    const { id } = useLocalSearchParams();
    const [userInformation, setUserInformation] = useState({});
    const [isFollowed, setIsFollowed] = useState(false);
    const [sectionSelected, setSectionSelected] = useState('entries');
    const [entries, setEntries] = useState([]);
    const [topics, setTopics] = useState([]);
    const [likedEntries, setLikedEntries] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userInfo = await getUserDataForOtherProfiles(id);
          const followedStatus = await getIsFollowed(id);
          setUserInformation(userInfo);
          setIsFollowed(followedStatus);
  
          // Optionally, fetch entries, topics, and liked entries based on default section
          // For this example, let's assume entries are part of userInformation
          // If topics or liked entries are the default section, fetch them here similarly
          setEntries(userInfo.entries); // Adjust based on actual response structure
        } catch (error) {
          Alert.alert("Error", "Failed to fetch user information.");
        }
      };
  
      fetchData();
    }, [id]);
  
    const handleFollowUser = async () => {
      try {
        const newFollowStatus = await getFollowUser(id);
        setIsFollowed(newFollowStatus);
        // Optionally, refresh user information to reflect changes
        const userInfo = await getUserDataForOtherProfiles(id);
        setUserInformation(userInfo);
      } catch (error) {
        Alert.alert("Error", "Failed to update follow status.");
      }
    };
  
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
          return <TopicList topics={topics} />;
        case 'favorites':
          return <UserEntries entries={likedEntries} />;
        default:
          return <View />;
      }
    };
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader userInformation={userInformation} />
      <UserProfileInfo username={userInformation.username} bio={userInformation.bio} />
      <FollowMessageButtons isFollowed={isFollowed} onFollowUser={handleFollowUser} />
      <SectionTabs sectionSelected={sectionSelected} onSelectSection={selectSection} />
      {renderSectionContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    height: height,
  },
  // You can add other styles for the Profile component here
});

export default Profile;
