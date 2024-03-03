import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PostButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.postButton} onPress={onPress}>
      <Text style={styles.postButtonText}>Post</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#80c04e',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PostButton;
