import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function _layout() {
  const { user } = useContext(AuthContext);

  return (
    
    
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: { backgroundColor: "#191919" },

        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="trending"
        options={{
          headerShown: false,

          title: "Trending",
        }}
      />
      
      <Tabs.Screen
        name="today"
        options={{
          headerShown: false,
          tabBarLabel: "Today",
          title: "Today",
        }}
      />
      <Tabs.Screen
        name="channels"
        options={{
          headerShown: false,
          tabBarLabel: "Channels",
          
        }}
      />
      <Tabs.Screen
        name="userProfile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          title: "Profile",
        }}
      />
    

    </Tabs>
    
  );
}
