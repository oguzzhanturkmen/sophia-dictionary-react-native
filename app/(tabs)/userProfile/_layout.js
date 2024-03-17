import { Link, Stack } from "expo-router";

export default function HomeLayout() {
  return <Stack 
  screenOptions={{
    headerShown: false,
  }}
  >
    <Stack.Screen name="index" options={{
      title: "Home",
      headerShown: false,
    }} 
    />
    <Stack.Screen name="followers" options={{
      title: "Post",
      headerShown: false,
      presentation: "modal",
    }}/>
    <Stack.Screen name="editProfile" options={{
      title: "Profile",
      headerShown: false,
      
      
    }}/>
    <Stack.Screen name="userSettings" options={{
      title: "Settings",
      headerShown: false,
      
    }}/>




   

      

 
  
  
  
  </Stack>
}