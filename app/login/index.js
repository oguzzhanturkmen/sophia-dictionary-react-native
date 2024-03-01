import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {  router } from 'expo-router'
import { authenticateUser } from '../../api/auth';


import { Dimensions } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const handleLogin = async () => {
    const success = await authenticateUser(username, password);
    if (success) {
      console.log('Login successful');
      // Assuming you have a way to navigate using expo-router or another navigation solution
      router.push('/'); // Update this line to match your actual navigation logic
      
    } else {
      console.log('Login failed');
      setIsLoggingIn(false);
      // Handle login failure (e.g., display an error message)
    }
  };  

  

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : -10}
      style={styles.container}
    >
       <Image source={require('../../assets/images/splash.png')} style={styles.logo} />
      <Text style={styles.title}>Log In</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          color="white"
          placeholder="Username"
          placeholderTextColor={'#e8e8e8'}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          color="white"
          placeholderTextColor={'#e8e8e8'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
<View style={styles.button}>
      <Button title="Log In" color="white" onPress={() => handleLogin()}  />
      
</View>
{isLoggingIn ? null : <Text style={{color: 'red'}}>Login failed</Text>}
      <Text style={styles.textLink} onPress={() => router.replace('/register')}>Don't have an account? Register</Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#191919',
      alignItems: 'center',
      
      paddingTop: height * 0.17,
      
      
    },
    logo: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#e8e8e8',
    },
    inputContainer: {
      marginVertical: 0,
      
    },
    textInput: {
      backgroundColor: '#414142',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: width * 0.9,
      height: height * 0.05,
      
    },
    button: {
      borderRadius: 5,
      marginVertical: 10,
      backgroundColor: '#80c04e',
      width: width * 0.5,
      
      
    },
    textLink: {
      color: '#e8e8e8',
      textDecorationLine: 'underline',
      marginTop: 20,
    },
  });
  

export default Login;
