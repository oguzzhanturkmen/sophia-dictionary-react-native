import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { postTopic } from "../../api/api"; 
import Header from "../../components/Screens/CreateTopic/Header";
import TitleInput from "../../components/Screens/CreateTopic/TitleInput";
import ContentInput from "../../components/Screens/CreateTopic/ContentInput";
import PostButton from "../../components/Screens/CreateTopic/PostButton";
import { router } from "expo-router";
const CreateTopic = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const data = {
      topicName: title,
      content: content,
    };
    router.back();
    postTopic(data).then((res) => {
      console.log(res);
      
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <Header />
      </SafeAreaView>
      <View style={styles.innerContainer}>
        <TitleInput title={title} setTitle={setTitle} />
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
