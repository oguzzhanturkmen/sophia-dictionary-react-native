import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
    getUserDataForOtherProfiles,
    getIsFollowed,
    getFollowUser,
    getCreatedTopicsByUser,
    getLikedEntries
  } from '../../../api/api';
import ProfileHeader from '../../../components/Screens/Profile/ProfileHeader';
import UserProfileInfo from '../../../components/Screens/Profile/UserProfileInfo';
import FollowMessageButtons from '../../../components/Screens/Profile/FollowMessageButtons';
import SectionTabs from '../../../components/Screens/Profile/SectionTabs';
import { useLocalSearchParams } from 'expo-router';
import UserEntries from '../../../components/Utils/UserEntriesList';
import TopicList from '../../../components/Utils/TopicList';
import ProfileScreenHeader from '../../../components/Screens/Profile/ProfileScreenHeader';

import {router} from 'expo-router';

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
          setEntries(userInfo.entries);
  

        
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
          return <TopicList data={topics} />;
        case 'favorites':
          return <UserEntries entries={likedEntries} />;
        default:
          return <View />;
      }
    };
  return (
    <ScrollView style={styles.container}>
      <ProfileScreenHeader router={router} username={userInformation.username}/>
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

});

export default Profile;
