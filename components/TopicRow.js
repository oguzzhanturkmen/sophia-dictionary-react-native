import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
export default function TopicRow() {
  return (
    <View  style={{width : width , backgroundColor : 'white'}}>
      <Text>TopicRow</Text>
    </View>
  )
}