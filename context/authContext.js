import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context
export const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when no user is logged in

  // Function to log in the user
  const logIn = async (credentials) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://192.168.111.3:8084/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (data.token) {
          await AsyncStorage.setItem('userToken', data.token);
          await AsyncStorage.setItem('username', data.username);
          setUser({ token: data.token }); // Assuming you're storing the user token in the state
          resolve(); // Resolve the promise on successful login
        } else {
          reject(new Error('Login failed')); // Reject the promise if login wasn't successful
        }
      } catch (error) {
        reject(error); // Reject the promise on errors
      }
    });
  };

  // Function to log out the user
  const logOut = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
  };

  // Check token existence on app launch
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const username = await AsyncStorage.getItem('username');
      if (token) {
        setUser({ token , username });
      }
    };
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
