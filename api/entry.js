import { apiCallAuthorized, apiPostCall, apiCallUnauthorized } from "./requests";

const baseURL = 'http://192.168.111.7:8084/entry';

// For GET request to get all entries by topic
const getAllEntriesByTopic = (topicId, page) => `${baseURL}/${topicId}?page=${page}`;

// For POST request to save an entry
const saveEntry = (topicId) => `${baseURL}/${topicId}/post`;

// For GET request to like an entry
const likeEntry = (entryId) => `${baseURL}/${entryId}/likeEntry`;

// For GET request to dislike an entry
const dislikeEntry = (entryId) => `${baseURL}/${entryId}/dislikeEntry`;

//Make requests 

export const getEntries = (topicId) => apiCallAuthorized(getAllEntriesByTopic(topicId , page=0));

export const postEntry = (topicId, data) => apiPostCall(saveEntry(topicId), data);

export const likeAnEntry = (entryId) => apiCallAuthorized(likeEntry(entryId));

export const dislikeAnEntry = (entryId) => apiCallAuthorized(dislikeEntry(entryId));






