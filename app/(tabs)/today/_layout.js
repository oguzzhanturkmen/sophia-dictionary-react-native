import { Stack } from "expo-router";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

export default function HomeLayout() {
  const { user } = useContext(AuthContext);

  return (
  
  <Stack 
  screenOptions={{
    headerShown: false,
  }}
  
  >

    </Stack>)
}