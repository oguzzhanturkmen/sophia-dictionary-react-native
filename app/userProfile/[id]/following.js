import { View, Text } from 'react-native'
import React from 'react'
import FollowList from '../../../components/FollowList'
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { PlusCircleIcon, Cog8ToothIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import { router } from 'expo-router';

const { width , height } = Dimensions.get('window');



export default function following() {

  const [refresh, setRefresh] = useState(false);

  
  return (
    
      <View style={{ backgroundColor: '#191919', height: height, width : width ,  }}>
     <View className="" style={{backgroundColor : '#191919', height : height , width : width}}>
<StatusBar style= "light" />
    <SafeAreaView style={{backgroundColor : '#191919' , marginBottom : -30}}>
     
      
    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" , marginHorizontal : 8 , paddingBottom : 15}} >
   
      <TouchableOpacity  className="rounded-xl p-1 "  onPress={() => router.back()} >
                <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e"  />
            </TouchableOpacity>

            <TouchableOpacity style={{flex : 1, justifyContent : 'center', alignItems : 'center' }} onPress={() => setRefresh(true)}>
      <Text style={{color : 'white', fontSize : 24, textAlign : 'center',fontWeight: "bold" }}>Following</Text>
      </TouchableOpacity>
    
      <View  >
     
               <View style={{width : 30}}   />
               
           </View>
          
      
            </View>
            
      </SafeAreaView>
      <FollowList name={"Followers"}/>
    </View>
    </View>
  )
}