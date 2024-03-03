import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiCallAuthorized = async (endpoint, params) => {
    const token = await AsyncStorage.getItem("userToken");
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
 export const apiPostCall = async (endpoint, data) => {
    const token = await AsyncStorage.getItem("userToken");
    const options = {
      method: "POST",
      url: endpoint,
      data: data,
    };
    if (token) {
      options.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  export const apiCallUnauthorized = async (endpoint, params) => {
    const options = {
      method: "GET",
      url: endpoint,
      params: params ? params : {},
    };
  
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error);
      return {};
    }
    };