import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Button, Dimensions } from 'react-native';
import { postEntry } from '../api/api';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


export default function PostModal( {isModalVisible, setModalVisible , setInputText, inputText, setRefresh, topicId }) {

  
  handleSubmit = async (id) => {
    data = {
      content : inputText,
      tags : ""
    }
    await postEntry(data, id).then((res) => {
      console.log(res)
      setRefresh();
      
     })
    }
    

  

  return (
    <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={() => {
    setModalVisible(false);
    
  }
}
>
  <View style={styles.modalView}>
    <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '100%'}}>
      <View style={{height : 20}}></View>
    <Text style={{color : 'white', fontSize : 20, fontWeight : 'bold'}}>Your Post</Text>
    <TouchableOpacity onPress={() => setModalVisible(false)}>
      <Text style={{color : 'white', fontSize : 20, fontWeight : 'bold'}}>X</Text>
    </TouchableOpacity>
    </View>
    <View >
    <TextInput
      style={styles.input}
      onChangeText={setInputText}
      value={inputText}
      placeholder="Enter your text here"
      textAlignVertical="top"
      placeholderTextColor="#999"
      multiline={true}
    />
    </View>
    <TouchableOpacity
      style={styles.postButton}
      onPress={() => {
        console.log(inputText); // Here, handle the posting logic
        setInputText(''); // Clear input after posting
        setModalVisible(false); // Close modal
        setRefresh(); // Refresh the page
        handleSubmit(topicId);
      }}
    >
      <Text style={styles.buttonText}>Post</Text>
    </TouchableOpacity>
  </View>
</Modal>

  )
}
const styles = StyleSheet.create({
    modalView: {
      position: 'absolute',
      bottom: 0,
      width : width,
      height: height * 0.8 ,
      backgroundColor: '#333',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      alignItems: 'center',
        
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    input: {
      width: width * 0.9,
      height: height * 0.6,
      marginTop: height * 0.04,
      fontSize: 18,
      borderRadius: 5,
      color: 'white',
    },
    
    buttonText: {
      color: 'white',
    },
    postButton: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      backgroundColor: '#80c04e', // Button background color
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  