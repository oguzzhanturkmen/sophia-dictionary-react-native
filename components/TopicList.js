import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { Link, router } from 'expo-router';



const topics = [
    { id: '1', name: 'This component is used for efficiently rendering a scrollable list of data. The data prop takes an array of data elements, and the', entries: 10 },
    { id: '2', name: 'Topic 2', entries: 20 },
    
    
  ];

  const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
export default function TopicList() {
  

    const renderItem = ({ item, index }) => (
       
        <TouchableOpacity
          onPress={() => router.push({
            pathname: `${item.id}` ,
            params: {
              name: item.name,
              id : item.id,
            }
         })}
          style={[
            styles.itemContainer,
            { backgroundColor: index % 2 === 0 ? '#1e1e1e' : '#232323' }, 
          ]}
        >
            
                <Text style={styles.itemText}>{item.name.length > 65 ? item.name.slice(0,65) + "..." : item.name}</Text>
                <Text style={styles.counterText}>{item.entries}</Text>
            
          
        </TouchableOpacity>
       
        
        
      );
    
      return (
        <FlatList
          data={topics}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
