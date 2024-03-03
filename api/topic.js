import { apiCallAuthorized, apiPostCall, apiCallUnauthorized } from "./requests";

const baseURL = 'http://192.168.111.7:8084/topic';

// For GET request to get all topics
const getAllTopics = (page) => `${baseURL}?page=${page}`;

// For POST request to save a topic
const saveTopicEndpoint = `${baseURL}/post`;

// For GET request to get trending topics,
const getTrendingTopics = (page) => `${baseURL}/trending?page=${page}`;


//Make requests

export const getTopics = (page ) => apiCallAuthorized(getAllTopics(page));

export const postTopic = (data) => apiPostCall(saveTopicEndpoint, data);

export const getTrending = (page) => apiCallAuthorized(getTrendingTopics(page));
