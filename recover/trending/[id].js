import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import { Bars3Icon, ChevronLeftIcon, PencilSquareIcon } from 'react-native-heroicons/outline'
import { router, useRouter } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import ContentList from '../../../components/ContentList'
import { useState } from 'react'

import PostModal from '../../../components/PostModal'

height = Dimensions.get('window').height
width = Dimensions.get('window').width



export default function index() {
    const {id, name} = useLocalSearchParams();
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [refresh, setRefresh] = useState(0);

    const refreshPage = () => {
      
      setRefresh(prevKey => prevKey + 1);
    };


    


  return (
    <View className="" style={{ flex : 1 , backgroundColor : '#191919'}}>
    
    <SafeAreaView style={{backgroundColor : '#191919' }} >
    <StatusBar style= "light" />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" , marginHorizontal : 8 , paddingBottom : 15}} >
      <TouchableOpacity  className="rounded-xl p-1 " style={{marginLeft : -8}}onPress={() => router.back("/") }>
                <ChevronLeftIcon size="38" strokeWidth={2.5} color="#80c04e" />
            </TouchableOpacity>
            <TouchableOpacity style={{flex : 1, justifyContent : 'center', alignItems : 'center' }} onPress={refreshPage}>
            <Text style={{color : 'white', fontSize : 20, textAlign : 'center', width : width * 0.8}}>{name?.length > 74 ? name?.substring(0,74) + "...": name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
  <PencilSquareIcon size="38" strokeWidth={2} color={"#80c04e"} />
</TouchableOpacity>

        </View>

      </SafeAreaView>
      
      
      
      
        <ContentList id={id} key={refresh}/>
        <PostModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} inputText={inputText} setInputText={setInputText} topicId={id} setRefresh={refreshPage}/>
      
      
        
      
      
      
      
    </View>
  )
}