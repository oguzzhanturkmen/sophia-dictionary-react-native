import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { getAllTopics } from '../api/api';



  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
export default function TopicList({ data }) {
  
  

    const renderItem = ({ item, index }) => (
       
        <TouchableOpacity
          onPress={() => router.push({
            pathname: `trending/${item.topicId}` ,
            params: {
              name: item.topicName,
              
            }
         })}
          style={[
            styles.itemContainer,
            { backgroundColor: index % 2 === 0 ? '#1e1e1e' : '#232323' }, 
          ]}
        >
            
                <Text style={styles.itemText}>{item.topicName.length > 65 ? item.topicName.slice(0,65) + "..." : item.topicName}</Text>
                <Text style={styles.counterText}>{item.entryCount}</Text>
            
          
        </TouchableOpacity>
       
        
        
      );
    
      return (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.topicId}
        />
      );
    };
    
    const styles = StyleSheet.create({
      itemContainer: {
        paddingLeft: height * 0.010,
        paddingBottom: height * 0.013,
        paddingTop: height * 0.013,
        width: width ,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
      },
      itemText: {
        color: '#ffffff',
        width : width * 0.8,
        fontSize: width * 0.05,
        
      },
      counterText: {
        color: '#80c04e',
        paddingRight: width * 0.05,
        fontSize: width * 0.05,
      }
    });
