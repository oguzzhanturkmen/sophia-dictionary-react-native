import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import {UserCircleIcon} from 'react-native-heroicons/outline'
import {HandThumbUpIcon, HandThumbDownIcon, ShareIcon} from 'react-native-heroicons/outline'



const topics = [
    { id: '1', name: 'This component is used for efficiently rendering a scrollable list of data. The data prop takes an array of data elements, and the', entries: 10 },
    { id: '2', name: 'Topic 2', entries: 20 },
    { id: '3', name: 'This component is used for efficiently rendering a scrollable list of data. The data prop takes an array of data elements, and the', entries: 10 },
    { id: '4', name: 'Topic 2', entries: 20 },
    { id: '5', name: 'This component is used for efficiently rendering a scrollable list of data. The data prop takes an array of data elements, and the', entries: 10 },
    { id: '6', name: 'Topic 2', entries: 20 },
    { id: '7', name: 'This component is used for efficiently rendering a scrollable list of data. The data prop takes an array of data elements, and the', entries: 10 },
    { id: '8', name: 'Topic 2', entries: 20 },
    { id: '9', name: 'This component is used for efficiently rendering a scrollable list of data. The data prop takes an array of data elements, and the', entries: 10 },
    { id: '10', name: 'Topic 2', entries: 20 },
    
    
  ];

  const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
export default function ContentList() {
  

    const renderItem = ({ item, index }) => (
       
        <View
          style={[
            styles.itemContainer,
            { backgroundColor: index % 2 === 0 ? '#1e1e1e' : '#232323' }, 
          ]}
        >
          <View style={{ flex: 1}}> 
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center', paddingTop : 10 }}>
            <View style={{ flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
            <Text style={{ color: 'white', marginRight: 5 }}>19.02.2024 </Text>
            <Text style={{ color: 'white', marginRight: 10 }}>13:08</Text>
            </View>
            <Text style={{ color: 'white', marginRight : 10 , marginTop : 5, color :'#80c04e'   }}>username</Text>
            </View>
            
            <UserCircleIcon size={42} strokeWidth={1} color="white" style={{marginRight : 10}}/>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingTop : 5 , marginRight : 10 }}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
            <HandThumbUpIcon size={20} strokeWidth={1} color="white" style={{marginRight : 10}}/>
            <Text style={{ color: 'white', marginRight: 10 , fontSize : 10, marginTop : 5}}>10</Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
            <HandThumbDownIcon size={20} strokeWidth={1} color="white" style={{marginRight : 10}}/>
            <Text style={{ color: 'white', marginRight: 10 , fontSize : 10 , marginTop : 5}}>10</Text>
            </View>
            <ShareIcon size={25} strokeWidth={1} color="white" style={{marginRight : 10}}/>
        </View>
    </View>
        
    </View>
        
        
       
        
        
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
        
        
        
        
      },
      itemText: {
        color: '#ffffff',
        width : width * 0.97,
        fontSize: width * 0.038,
        marginBottom: 5,
        
        
      },
     
    });
