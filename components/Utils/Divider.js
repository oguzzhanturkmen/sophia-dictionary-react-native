import { View, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'

const [width, height] = [Dimensions.get("window").width, Dimensions.get("window").height];
export default function Divider() {
  return (
    <View
    style={{
      borderBottomColor: "#80c04e",
      borderBottomWidth: 0.3,
      width: width * 0.90,
      marginBottom: 10,
    }}
  />
  )
}