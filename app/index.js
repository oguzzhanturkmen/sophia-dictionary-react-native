import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Dimensions } from 'react-native'
import TopicList from '../components/TopicList'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/SearchBar'
import { ScrollView } from 'react-native'

const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width





export default function HomePage() {
  return (
   
    <View className="" style={{backgroundColor : '#191919', height : height , width : width}}>
<StatusBar style= "light" />
    <SafeAreaView style={{backgroundColor : '#191919' , marginBottom : -30}}>
     
      
      <View style={{marginVertical : 10}}>
      <Text style={{color : 'white', fontSize : 20, textAlign : 'center', }}>Gündem</Text>
      </View>
      </SafeAreaView>
      
      
      
      <ScrollView className=" justify-center items-center " >
      
      <SearchBar/>
        <TopicList/>
        
      </ScrollView>
      
      
      
    </View>
    
    
  )
}