import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '../context/AuthContext';

export default function _layout() {
  return (
    <AuthProvider>
    <Stack
    screenOptions={{
      headerShown: false,
       
    }}
    >
        <Stack.Screen name="(tabs)" options={{
            
            headerShown: false,

        }} />
        <Stack.Screen name="login" options={{
            title: "Login"

        }} />
        <Stack.Screen name="register" options={{
            title: "Register",
            headerShown: false,

        }} />
        <Stack.Screen name="followers" options={{
            title: "Followers",
            headerShown: false,

        }} />
        
        
        

    </Stack>
    </AuthProvider>
    )
}