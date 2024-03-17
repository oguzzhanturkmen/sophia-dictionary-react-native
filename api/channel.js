import { apiCallAuthorized, apiPostCall, apiCallUnauthorized } from "./requests";

const baseURL = 'http://192.168.111.3:8084/channel';

// For GET request to get all topics
const getAllChannels = () => `${baseURL}/getChannels`;




//Make requests

export const getChannels = () => apiCallAuthorized(getAllChannels());

