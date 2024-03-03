import React from 'react';
import { TextInput, ScrollView, StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ContentInput = ({ content, setContent }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <TextInput
        style={styles.contentInput}
        placeholder="What's on your mind?"
        placeholderTextColor="#ccc"
        value={content}
        onChangeText={setContent}
        multiline={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentInput: {
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
    width: width * 0.9,
    height: height * 0.7,
    fontSize: 20,
    maxHeight: height * 0.4,
  },
});

export default ContentInput;
