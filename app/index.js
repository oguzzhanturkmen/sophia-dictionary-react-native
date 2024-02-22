import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Dimensions } from 'react-native'
import TopicList from '../components/TopicList'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/SearchBar'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Bars3Icon, ChevronLeftIcon, UserCircleIcon } from 'react-native-heroicons/outline'
import { Slot, router } from 'expo-router'

const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width

    //Render a slot

    //Render a slot









export default function HomePage() {
  return (
   
  
    <View className="" style={{backgroundColor : '#191919', height : height , width : width}}>
<StatusBar style= "light" />
    <SafeAreaView style={{backgroundColor : '#191919' , marginBottom : -30}}>
     
      
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" , marginHorizontal : 8 , paddingBottom : 15}} >
      <TouchableOpacity  className="rounded-xl p-1 " style={{marginLeft : -8}} >
                <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
            </TouchableOpacity>
            <View style={{flex : 1, justifyContent : 'center', alignItems : 'center' }}>
      <Text style={{color : 'white', fontSize : 24, textAlign : 'center',fontWeight: "bold" }}>Gündem</Text>
      </View>
      
      <TouchableOpacity onPress={() => router.navigate('/login')}
       >
                <UserCircleIcon size= "38" strokeWidth = {2} color={"#80c04e"}   />
                
            </TouchableOpacity>
            </View>
      </SafeAreaView>
      
      <SearchBar/>
        <TopicList/>
        
      
      
      
      
    </View>
    
    
  )
}