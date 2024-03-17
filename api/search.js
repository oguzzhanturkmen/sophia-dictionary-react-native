import { apiCallAuthorized, apiPostCall, apiCallUnauthorized } from "./requests";

const baseURL = 'http://192.168.111.3:8084/search';


const searchTopics = (query, page) => `${baseURL}?query=${query}&page=${page}`;

//Make requests 

export const getSearch = async (query, page) => apiCallAuthorized(searchTopics(query, page));








