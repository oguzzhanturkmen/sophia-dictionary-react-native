import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Replace 'YOUR_BACKEND_REGISTER_ENDPOINT' with your actual registration endpoint URL
const loginEndpoint = 'http://192.168.111.7:8084/auth/login';
const registerEndpoint = 'http://192.168.111.7:8084/auth/register';


export const authenticateUser = async (username, password) => {
  try {
    const response = await axios.post(loginEndpoint, {
      username,
      password,
    });
    const { token } = response.data;
    const  usernameX  = response.data.username;
    console.log('User token:', token);
    console.log('Username:', usernameX);
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('username', usernameX);

    return true;
    // Navigate to your app's main flow here. For example:
    // navigation.navigate('Home');
  } catch (error) {
    console.error('Login error:', error);
    return false;
    // Handle registration failure (e.g., show an error message)
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('username');
    // Navigate to your app's login flow here. For example:
    // navigation.navigate('Login');
    console.log('User logged out');
    
  } catch (error) {
    console.error('Logout error:', error);
    // Handle logout failure (e.g., show an error message)
  }
}

// authenticate user , check if token is valid

export const checkUser = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token !== null) {
      console.log('User is logged in');
      return true;
    } else {
      console.log('User is not logged in');
      return false;
    }
  } catch (error) {
    console.error('Check user error:', error);
    // Handle error
  }
};

export const registerUser = async (username, password, email) => {
  try {
    const response = await axios.post(registerEndpoint, {
      "username": username,
      "password" : password,
      "email" : email
    });
    if (response.status === 200) {
      console.log('User registered');
      return true;
      // Navigate to your app's login flow here. For example:
      // navigation.navigate('Login');
    }
    else {
      console.log('User not registered');
      return false;
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    return false;
    // Handle registration failure (e.g., show an error message)
  }
}



