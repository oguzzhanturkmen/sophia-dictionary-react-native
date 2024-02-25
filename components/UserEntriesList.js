import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import {UserCircleIcon} from 'react-native-heroicons/outline'
import {HandThumbUpIcon, HandThumbDownIcon, ShareIcon} from 'react-native-heroicons/outline'
import { getEntries } from '../api/api';
import { useState } from 'react';
import { useEffect } from 'react';



  const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
export default function UserEntries({entries}) {

  
  

    const renderItem = ({ item, index }) => (
       
        <View
          style={[
            styles.itemContainer,
            { backgroundColor: index % 2 === 0 ? '#1e1e1e' : '#232323' }, 
          ]}
        >
          <View style={{ flex: 1}}> 
        <Text style={styles.itemText}>{item.entryContent}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center', paddingTop : 10 }}>
            <View style={{ flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
            <Text style={{ color: 'white', marginRight: 5 }}>{item.entryDate} </Text>
            <Text style={{ color: 'white', marginRight: 10 }}>{item.entryTime}</Text>
            </View>
            <TouchableOpacity onPress={() => router.navigate({
            pathname: `userProfile/${item.entryOwnerId}` ,
            params: {
              id: item.entryOwnerId,
            
            }
              
            })}>
            <Text style={{ color: 'white', marginRight : 10 , marginTop : 5, color :'#80c04e'   }}>{item.entryOwner}</Text>
            </TouchableOpacity>
            </View>
            
            <UserCircleIcon size={42} strokeWidth={1} color="white" style={{marginRight : 10}}/>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingTop : 5 , marginRight : 10 }}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
            <HandThumbUpIcon size={20} strokeWidth={1} color="white" style={{marginRight : 10}}/>
            <Text style={{ color: 'white', marginRight: 10 , fontSize : 10, marginTop : 5}}>{item.likeCount}</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
            <HandThumbDownIcon size={20} strokeWidth={1} color="white" style={{marginRight : 10}}/>
            <Text style={{ color: 'white', marginRight: 10 , fontSize : 10 , marginTop : 5}}>{item.dislikeCount}</Text>
            </View>
            <ShareIcon size={25} strokeWidth={1} color="white" style={{marginRight : 10}}/>
        </View>
    </View>
        
    </View>
        
        
       
        
        
      );
    
      return (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={item => item.entryId}
        />
      );
    };
    
    const styles = StyleSheet.create({
      itemContainer: {
        paddingLeft: height * 0.010,
        paddingBottom: height * 0.013,
        paddingTop: height * 0.013,
        width: width ,
        
        
        
        
      },
      itemText: {
        color: '#ffffff',
        width : width * 0.97,
        fontSize: width * 0.038,
        marginBottom: 5,
        
        
      },
     
    });
