import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { getAllTopics } from '../../api/api';
import { RefreshControl } from 'react-native';



  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
export default function ChannelList({ channels , path}) {

    
    

  
  

    const renderItem = ({ item, index }) => (
       
        <TouchableOpacity
          onPress={() => router.push({
            pathname: `${"channels/" + item.name }` ,
            params: {
              
              
            }
         })}
          style={[
            styles.itemContainer,
            { backgroundColor: index % 2 === 0 ? '#1e1e1e' : '#232323' }, 
          ]}
        >
                <Text style={styles.itemText}>{"#" + item.name}</Text>
                <Text style={styles.counterText}>{item.description}</Text>
            
          
        </TouchableOpacity>
       
        
        
      );
    
      return (
        <FlatList
          data={channels}
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
        
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 5
        
      },
      itemText: {
        color: '#ffffff',
        width : width * 0.8,
        fontSize: width * 0.05,
        
      },
      counterText: {
        color: '#80c04e',
        paddingRight: width * 0.05,
        fontSize: width * 0.045,
      }
    });
