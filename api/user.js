import { apiCallAuthorized, apiPostCall, apiCallUnauthorized } from "./requests";

const baseURL = 'http://192.168.111.3:8084/user';

// Get user profile by ID
const getUserProfileById = (id) => `${baseURL}/profile/${id}`;

// Get user's profile (for the logged-in user)
const getUsersProfile = () => `${baseURL}/profile`;

// Get followers of the user
const getUserFollowers = (id) => id ? `${baseURL}/profile/${id}/followers` : `${baseURL}/profile/followers`;

// Get users the user is following
const getUserFollowings = (id) => id ? `${baseURL}/profile/${id}/following` : `${baseURL}/profile/following`;

// Follow or unfollow a user
const followUser = (id) => `${baseURL}/follow/${id}`;

// Check if a user is followed
const isFollowed = (id) => `${baseURL}/isFollowed/${id}`;

// Get created topics by user
const getCreatedTopics = (id) => id ? `${baseURL}/profile/${id}/createdTopics` : `${baseURL}/profile/createdTopics`;

// Get entries liked by user
const getLikedEntries = (id) => id ? `${baseURL}/profile/${id}/likedEntries` : `${baseURL}/profile/likedEntries`;

const getEntriesCreatedByUser = (id) => id ? `${baseURL}/profile/${id}/createdEntries` : `${baseURL}/profile/createdEntries`;

// Make requests

export const getUserProfile = (id) => apiCallAuthorized(getUserProfileById(id));

export const getUsersProfileData = () => apiCallAuthorized(getUsersProfile());

export const getFollowers = (id) => apiCallAuthorized(getUserFollowers(id));

export const getFollowings = (id) => apiCallUnauthorized(getUserFollowings(id));

export const followOrUnfollowUser = (id) => apiCallAuthorized(followUser(id));

export const checkIfFollowed = (id) => apiCallAuthorized(isFollowed(id));

export const getCreatedTopicsByUser = (id) => apiCallAuthorized(getCreatedTopics(id));

export const getLikedEntriesByUser = (id) => apiCallAuthorized(getLikedEntries(id));

export const getFollowUser = (id) => apiCallAuthorized(followUser(id));

export const getIsFollowed = (id) => apiCallAuthorized(isFollowed(id));

export const getFollowersOfUser = (id) => apiCallAuthorized(getUserFollowers(id));

export const getFollowingsOfUser = (id) => apiCallAuthorized(getUserFollowings(id));

export const followOrUnfollow = (id) => apiCallAuthorized(followUser(id));

export const checkIfFollowedUser = (id) => apiCallAuthorized(isFollowed(id));

export const getCreatedEntriesByUser = (id) => apiCallAuthorized(getEntriesCreatedByUser(id));


