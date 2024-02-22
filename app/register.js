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

import { Dimensions } from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    // todo !!!! Validation and registration logic here
    
    alert(`Username: ${username}, Password: ${password}, Email: ${email}`); // Placeholder for now
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image source={require('../assets/images/splash.png')} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>

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
        <TextInput
          style={styles.textInput}
          color="white"
          placeholder="Email"
          placeholderTextColor={'#e8e8e8'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
<View style={styles.button}>
      <Button
        title="Register"
        color="white"
        onPress={handleRegister}
        
      />
      </View>

      <Text style={styles.textLink} onPress={() => router.replace('/login')}>Already have an account? Log in</Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
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
    marginVertical: 10,
    
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

export default Register;
