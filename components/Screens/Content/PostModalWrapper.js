import React, { useState } from 'react';
import PostModal from "../../Utils/PostModal"

const PostModalWrapper = ({ topicId, onRefresh, isModalVisible  }) => {
 
  const [inputText, setInputText] = useState('');

  const handleRefresh = () => {
    onRefresh(); 
    setModalVisible(false); 
  };
  const setModalVisible = () => {
    isModalVisible = !isModalVisible;
  }

  return (
    <PostModal
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      inputText={inputText}
      setInputText={setInputText}
      topicId={topicId}
      setRefresh={handleRefresh}
    />
  );
};

export default PostModalWrapper;
