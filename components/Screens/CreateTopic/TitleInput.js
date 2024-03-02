import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const {width , height} = Dimensions.get('window');

const TitleInput = ({ title, setTitle }) => {
  return (
    <TextInput
      style={styles.titleInput}
      placeholder="Title"
      placeholderTextColor="#ccc"
      placeholderTextWeight="bold"
      value={title}
      onChangeText={setTitle}
      multiline={true}
    />
  );
};

const styles = StyleSheet.create({
  titleInput: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    maxHeight: height * 0.15,
  },
});

export default TitleInput;
