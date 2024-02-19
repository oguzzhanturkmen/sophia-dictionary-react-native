import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack
    screenOptions={{
      headerShown: false,
       
    }}
    >
        <Stack.Screen name="index" options={{
            title: "Home"

        }} />
       <Stack.Screen name="register/index" options={{
            title: "Register"

        }} />
        <Stack.Screen name="content/index/" options={{
            title: "Register"

        }} />
        <Stack.Screen name="[id]" options={{
            title: "Topic"

        }} />
    </Stack>
  )
}