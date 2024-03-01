import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Bars3Icon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";
import { postTopic } from "../../api/api";
import { Platform } from "react-native";



const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const CreateTopic = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  handleSubmit = () => {
    data = {
      topicName: title,
      content: content,
    };
    postTopic(data).then((res) => {
      console.log(res);
      router.replace({
        pathname: `trending/${res.topicId}`,
        params: {
          name: res.topicName,
          id: res.topicId,
        },
      });
    });
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <KeyboardAvoidingView className="" style={{ flex: 1, backgroundColor: "#191919" }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{ backgroundColor: "#191919" }}>
        <StatusBar style="light" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 16,
            paddingBottom: 15,
          }}
        >
          <TouchableOpacity
            className="rounded-xl p-1 "
            style={{ marginLeft: -8 }}
            onPress={() => router.back()}
          >
            <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 26,
                textAlign: "center",
                width: width * 0.8,
                fontWeight: "bold",
              }}
            >
              Post
            </Text>
          </View>
          <TouchableOpacity>
            <View style={{ width: 40 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          placeholder="Title"
          placeholderTextColor="#ccc"
          placeholderTextWeight="bold"
          value={title}
          onChangeText={setTitle}
          multiline={true}
        />

        <View
          style={{
            borderBottomColor: "#80c04e",
            borderBottomWidth: 0.5,
            marginBottom: 20,
          }}
        />
<ScrollView keyboardShouldPersistTaps="handled">
        <TextInput
          style={[styles.contentInput]}
          placeholder="What's on your mind?"
          placeholderTextColor="#ccc"
          value={content}
          onChangeText={setContent}
          multiline={true}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
        </ScrollView>
        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
        
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#333", // Ensure the safe area has the same background color
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10, // Add padding to avoid content being too close to the notch
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    color: "#fff",
    marginBottom: 5,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  contentInput: {
    borderRadius: 5,

    marginBottom: 10,
    color: "#fff",
    width: width * 0.9,
    height: height * 0.7,
    fontSize: 20,
  },
  postButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#80c04e", // Button background color
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default CreateTopic;
