import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';

  import {getUserProfile, getIsFollowed , getCreatedEntriesByUser, getLikedEntriesByUser, getCreatedTopicsByUser,followOrUnfollow} from '../../../api/user';
import ProfileHeader from '../../../components/Screens/Profile/ProfileHeader';
import UserProfileInfo from '../../../components/Screens/Profile/UserProfileInfo';
import FollowMessageButtons from '../../../components/Screens/Profile/FollowMessageButtons';
import SectionTabs from '../../../components/Screens/Profile/SectionTabs';
import { useLocalSearchParams } from 'expo-router';
import UserEntries from '../../../components/Utils/UserEntriesList';
import TopicList from '../../../components/Utils/TopicList';
import ProfileScreenHeader from '../../../components/Screens/Profile/ProfileScreenHeader';

import {router} from 'expo-router';
import TopicListViewProfile from '../../../components/Screens/Profile/UserProfile/TopicListViewProfile'

const { width, height } = Dimensions.get('window');

const Profile = () => {
    const { id } = useLocalSearchParams();
    const [userInformation, setUserInformation] = useState({});
    const [isFollowed, setIsFollowed] = useState(false);
    const [sectionSelected, setSectionSelected] = useState('entries');
    const [entries, setEntries] = useState([]);
    const [topics, setTopics] = useState([]);
    const [likedEntries, setLikedEntries] = useState([]);
    const [onRefresh, setRefresh] = useState(false);

    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userInfo = await getUserProfile(id);
          const followedStatus = await getIsFollowed(id);
          const userEntries = await getCreatedEntriesByUser(id);
          setUserInformation(userInfo);
          setIsFollowed(followedStatus.state);
          setEntries(userEntries);
  

        
        } catch (error) {
          Alert.alert("Error", "Failed to fetch user information.");
        }
      };
      console.log(id);
      fetchData();
      console.log(id);
    }, [id]);
  
    const handleFollowUser = async () => {
      try {
        const newFollowStatus = await followOrUnfollow(id);
        setIsFollowed(newFollowStatus.state);
        
        const userInfo = await getUserProfile(id);
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
          console.log(topicsData);
          setTopics(topicsData);
        } else if (section === "favorites") {
          console.log("favorites");
          const likedEntriesData = await getLikedEntriesByUser(id);
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
          return <TopicListViewProfile topics={topics} path={"trending"} onRefresh={handleRefresh}/>;
        case 'favorites':
          return <UserEntries entries={likedEntries} />;
        default:
          return <View />;
      }
    };

    const onNavigateFollowers = () => {
      router.push(`profiles/${id}/followers`, { id: id });
    }
    const onNavigateFollowings = () => {
      router.push(`profiles/${id}/following`, { id: id });
    }
    const handleRefresh = (done) => {
  
      setRefresh(!onRefresh); 
      if(done) done();
    };
  return (
    <ScrollView style={styles.container}>
      <ProfileScreenHeader router={router} username={userInformation.username}/>
      <ProfileHeader userInformation={userInformation} onNavigateFollowers={onNavigateFollowers} onNavigateFollowing={onNavigateFollowings} />
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
