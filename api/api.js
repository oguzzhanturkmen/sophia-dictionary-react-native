import axios from 'axios';



const portNumber = 8084;
const baseUrl = `http://localhost:${portNumber}`;

const loginUrl = `${baseUrl}/auth/login`;
const registerUrl = `${baseUrl}/auth/register`;

const aa = "http://localhost:8084/main";
const entryScreenUrl = `${baseUrl}/topic`;

const apiCall = async (endpoint , params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
    }

        try {
            const response = await axios.request(options)
            return response.data
        } catch (error) {
            console.log(error)
            return {}
        }
    }

    export const getAllTopics = () => apiCall("http://localhost:8084/main");
    export const getEntries = (topicId) => apiCall(`http://localhost:8084/topic/${topicId}`);









