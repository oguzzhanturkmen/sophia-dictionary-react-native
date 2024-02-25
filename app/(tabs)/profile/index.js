import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Touchable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PlusCircleIcon, UserCircleIcon, Cog8ToothIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import ContentList from '../../../components/ContentList';
import { Stack, Tabs } from 'expo-router';
import { getUserDataForProfile } from '../../../api/api';
import { useLocalSearchParams } from 'expo-router';
import UserEntries from '../../../components/UserEntriesList';



const { width , height } = Dimensions.get('window');


const Profile = () => {
    const navigation = useNavigation();
    const [userInformation, setUserInformation] = useState({});

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getUserDataForProfile().then((res) => {
            setUserInformation(res);
        }
        )
    }, []);



  // Mock user data
  const userData = {
    username: 'john_doe',
    fullName: 'John Doe',
    followers: 250,
    following: 20,
    postsX: 30,
    profilePicture: 'https://via.placeholder.com/100',
    bio: '📷 Photographer | 🌎 Traveler | 📚 Book Lover',
    posts: Array.from({ length: 30 }, (_, i) => `https://picsum.photos/200/300?random=${i + 1}`),
  };

  
  const renderPostItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.postItem} />
  );

  return (
    <View style={{ backgroundColor: '#191919', height: height, width : width ,  }}>
     <View className="" style={{backgroundColor : '#191919', height : height , width : width}}>
<StatusBar style= "light" />
    <SafeAreaView style={{backgroundColor : '#191919' , marginBottom : -30}}>
     
      
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" , marginHorizontal : 8 , paddingBottom : 15}} >
   
      <TouchableOpacity  className="rounded-xl p-1 " style={{marginLeft : 8}} onPress={() => router.navigate("/createTopic")} >
                <PlusCircleIcon size="38" strokeWidth={2.5} color="#80c04e"  />
            </TouchableOpacity>

            <TouchableOpacity style={{flex : 1, justifyContent : 'center', alignItems : 'center' }} onPress={() => setRefresh(true)}>
      <Text style={{color : 'white', fontSize : 24, textAlign : 'center',fontWeight: "bold" }}>{userInformation.username}</Text>
      </TouchableOpacity>
    
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{marginRight : 8}}
      >
               <Cog8ToothIcon size= "38" strokeWidth = {2} color={"#80c04e"}   />
               
           </TouchableOpacity>
          
      
            </View>
            
      </SafeAreaView>
      
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: userData.profilePicture }} style={styles.profilePicture} />
        
        <View style={{ flex: 1, flexDirection : "row",  width : width * 0.4  , justifyContent : "space-around"}}>
        <View style={{ flex: 1, flexDirection : "column", alignItems : "center" }}>
            <Text style={{  color: 'white', }}>{userInformation.entryCount}</Text>
            <Text style={{  color: 'white', }}>Entries</Text>
            </View>
        <View style={{ flex: 1, flexDirection : "column", alignItems : "center" }}>
            <Text style={{  color: 'white', }}>{userInformation.followerCount}</Text>
            <Text style={{  color: 'white', }}>Followers</Text>
            </View>
            <View style={{ flex: 1, flexDirection : "column", alignItems : "center" }}>
            <Text style={{  color: 'white', }}>{userInformation.followingCount}</Text>
            <Text style={{  color: 'white', }}>Following</Text>
            </View>
      </View>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{userInformation.username}</Text>
          
        </View>
      <Text style={styles.bio}>{userInformation.bio}</Text>
      <View style={{ flex : 1 , flexDirection : "row", justifyContent : "space-between" , paddingHorizontal : width * 0.05 , paddingBottom : height * 0.02}} >
      <View style={{ width : width * 0.4, height : height * 0.04 ,  borderColor : "black" , borderStyle : "solid" , borderWidth: 1, alignItems : "center", justifyContent : "center" , borderRadius : 10}} >
        <Text style={{ color: 'black',fontWeight : "bold" }}>Edit Profile</Text>
        </View>
        <View style={{ width : width * 0.4, height : height * 0.04 ,  borderColor : "black" , borderStyle : "solid" , borderWidth: 1 , alignItems : "center", justifyContent : "center" , borderRadius : 10}} >
        <Text style={{ color: 'black', fontWeight : "bold" }}>Share Profile</Text>
        </View>
        
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" , marginHorizontal : 8 , paddingBottom : 15}} >
                
                <TouchableOpacity style={{flex : 1, justifyContent : 'center', alignItems : 'center',  }} onPress={() => setRefresh(true)}>
                <Text style={{color : 'white', fontSize : 24, textAlign : 'center',fontWeight: "bold" ,color : "white"}}>{"Topics"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex : 1, justifyContent : 'center', alignItems : 'center' ,color : "white"}} onPress={() => setRefresh(true)}>
                <Text style={{color : 'white', fontSize : 24, textAlign : 'center',fontWeight: "bold" ,color : "white"}}>{"Entries"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex : 1, justifyContent : 'center', alignItems : 'center' ,color : "white"}} onPress={() => setRefresh(true)}>
                <Text style={{color : 'white', fontSize : 24, textAlign : 'center',fontWeight: "bold",color : "white" }}>{"Favorites"}</Text>
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
    backgroundColor:"#191919" ,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: 'white',
    
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
    color: 'white',
  },
  fullName: {
    color: 'grey',
    color: 'white',
  },
  bio: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    color: 'white',
  },
  postsContainer: {
    flex: 1,
    
    
  },
  
});

export default Profile;
