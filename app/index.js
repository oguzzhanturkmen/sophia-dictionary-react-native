import { Redirect } from 'expo-router';
import { Text } from 'react-native';
import { AuthProvider } from '../context/AuthContext';

export default function Page() {

  return  (
  <AuthProvider>
  <Redirect href={"/(tabs)/trending"} />
  </AuthProvider>
  );
}