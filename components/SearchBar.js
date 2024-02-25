import {StyleSheet, Text, TextInput, View, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Dimensions } from 'react-native'

const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    
  
    
    
  
    return (
      
        <TextInput
          style={styles.textInputStyle}
          value={searchQuery}
          placeholder="Topic, #entry or @user"
            placeholderTextColor="white"
          underlineColorAndroid="transparent"
          
        />
        
      
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      

    },
    
    textInputStyle: {
      height: height * 0.04,
      width: width * 0.95,
      borderWidth: 1,
      paddingLeft: 20,
      paddingVertical: 0,
      margin: width * 0.02,
      backgroundColor: '#2f2f31',
      borderRadius: 10,
      color: 'white',
      borderColor: '#2f2f31',

    },
  });