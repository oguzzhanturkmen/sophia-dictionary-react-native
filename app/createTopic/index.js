import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { postTopic } from "../../api/topic"; 
import Header from "../../components/Screens/CreateTopic/Header";
import TitleInput from "../../components/Screens/CreateTopic/TitleInput";
import ContentInput from "../../components/Screens/CreateTopic/ContentInput";
import PostButton from "../../components/Screens/CreateTopic/PostButton";
import { router } from "expo-router";
import { Dimensions } from "react-native";
import { getChannels } from "../../api/channel";
import Divider from "../../components/Utils/Divider";
import TagList  from "../../components/Utils/TagList";

const [width, height] = [Dimensions.get("window").width, Dimensions.get("window").height];
const CreateTopic = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags , setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelectionChange = (selectedTags) => {
    // Handle the selection change. Maybe update a state or directly prepare the data for submission.
    
    setSelectedTags(selectedTags);
    // If you have tag details like name or other info you need to submit, you can filter them here based on selectedTagIds.
  };

  const handleSubmit = () => {
    const data = {
      topicName: title,
      content: content,
      tags: selectedTags,
    };
     handlePostTopic(data);
     
  };
  
   const handlePostTopic = async (data) => {
    try {
      const response = await postTopic(data);
      router.replace({
        pathname: `trending/${response.object.topicId}` ,
        refresh: true,
        params: {
          name: response.object.topicName,
          
        }
        ,

     });
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const fetchChannels = async () => {
      const res = await getChannels();
      setTags(res);
    };
    fetchChannels();
  }
  , []);


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <Header />
      </SafeAreaView>
      <View style={styles.innerContainer}>
        <TitleInput title={title} setTitle={setTitle} />
        <Divider />
        <TagList tags={tags} onSelectionChange={handleTagSelectionChange} />
        <Divider />
        <ContentInput content={content} setContent={setContent} />
        <PostButton onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#191919" },
  safeArea: { backgroundColor: "#191919" },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
});

export default CreateTopic;
