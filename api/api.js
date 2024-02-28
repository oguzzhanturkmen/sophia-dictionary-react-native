import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const portNumber = 8084;
const baseUrl = `http://localhost:${portNumber}`;

const loginUrl = `${baseUrl}/auth/login`;
const registerUrl = `${baseUrl}/auth/register`;

const aa = "http://localhost:8084/main";
const entryScreenUrl = `${baseUrl}/topic`;

const apiCall = async (endpoint, params) => {
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
const apiCallAuthorized = async (endpoint, params) => {
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
const apiPostCall = async (endpoint, data) => {
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

export const getAllTopics = (page) =>
  apiCall("http://localhost:8084/main?page=" + page);
export const getEntries = (topicId) =>
  apiCall(`http://localhost:8084/topic/${topicId}`);
export const postTopic = (data) =>
  apiPostCall("http://localhost:8084/main/post", data);
export const postEntry = (data, postId) =>
  apiPostCall("http://localhost:8084/topic/" + postId + "/post", data);
export const getUserDataForProfile = () =>
  apiCallAuthorized(`http://localhost:8084/auth/user`);
export const getUserDataForOtherProfiles = (id) =>
  apiCallAuthorized(`http://localhost:8084/user/get/${id}`);
export const getFollowers = (id) =>
  apiCallAuthorized(`http://localhost:8084/user/get/${id}/followers`);
export const getFollowings = (id) =>
  apiCallAuthorized(`http://localhost:8084/user/get/${id}/following`);
export const getIsFollowed = (id) =>
  apiCallAuthorized(`http://localhost:8084/profile/get/isFollowed/${id}`);

export const getFollowUser = (id) =>
  apiCallAuthorized(`http://localhost:8084/profile/follow/${id}`);

export const getCreatedTopicsByUser = (id) =>
  apiCallAuthorized(`http://localhost:8084/profile/get/${id}/createdTopics`);
