import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const portNumber = 8084;
const baseUrl = `192.168.111.7:${portNumber}`;



const apiCallUnauthorized = async (endpoint, params) => {
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
  apiCall("http://192.168.111.7:8084/main?page=" + page);
export const getEntries = (topicId) =>
  apiCallAuthorized(`http://192.168.111.7:8084/topic/${topicId}`);
export const postTopic = (data) =>
  apiPostCall("http://192.168.111.7:8084/main/post", data);
export const postEntry = (data, postId) =>
  apiPostCall("http://192.168.111.7:8084/topic/" + postId + "/post", data);
export const getUserDataForProfile = () =>
  apiCallAuthorized(`http://192.168.111.7:8084/auth/user`);
export const getUserDataForOtherProfiles = (id) =>
  apiCallAuthorized(`http://192.168.111.7:8084/user/get/${id}`);
export const getFollowers = (id) =>
  apiCallAuthorized(`http://192.168.111.7:8084/user/get/${id}/followers`);
export const getFollowings = (id) =>
  apiCallAuthorized(`http://192.168.111.7:8084/user/get/${id}/following`);
export const getIsFollowed = (id) =>
  apiCallAuthorized(`http://192.168.111.7:8084/profile/get/isFollowed/${id}`);

export const getFollowUser = (id) =>
  apiCallAuthorized(`http://192.168.111.7:8084/profile/follow/${id}`);

export const getCreatedTopicsByUser = (id) =>
  apiCallAuthorized(`http://192.168.111.7:8084/profile/get/${id}/createdTopics`);

export const likeAnEntry = (topicId, entryId ) =>
  apiCallAuthorized(`http://192.168.111.7:8084/topic/${topicId}/${entryId}/likeEntry`);


export const dislikeAnEntry = (topicId, entryId) =>
  apiCallAuthorized(`http://localhost:8084/topic/${topicId}/${entryId}/dislikeEntry`);

  export const getLikedEntries = (userId) => apiCallAuthorized(`http://localhost:8084/profile/get/${userId}/likedEntries`);
