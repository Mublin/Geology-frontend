import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'https://localhost:7073/api', // Replace with your API URL
    withCredentials: true
});
// Request interceptor to attach the access token to every request
api.interceptors.request.use(
    async (config) => {
        const user =  JSON.parse(localStorage.getItem('userDetail') as string)
        if (user && user.accessToken) {
            config.headers['Authorization'] = `Bearer ${user.accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 (Unauthorized) responses and refresh token
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        let userDetails = JSON.parse(localStorage.getItem("userDetail") as string)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Get the refresh token from the cookie
            if (userDetails) {
                try {
                    if (error.response.status === 401 && error.response.data === "") {
                        const {data} = await api.post('/users/access-token/' + userDetails.id, {});
                        if (data && userDetails) {
                            userDetails.accessToken = data.accessToken
                            localStorage.removeItem("userDetail")
                            localStorage.setItem("userDetail", JSON.stringify(userDetails))
                            originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                            return axios(originalRequest)
                        } else {
                            throw Error("Unable to generate token")
                        }
                    }
                        // Retry the original request with the new token
                        return axios(originalRequest);    
                    // Call the refresh token endpoint to get a new access token
                    
                } catch (err) {
                    console.error('Token refresh failed:', err);
                    localStorage.removeItem("userDetail")
                    window.location.href = "/"
                    return Promise.reject(err);
                }
            } else {
                    
                    return Promise.reject();
            }
        }

        return Promise.reject(error);
    }
);

export default api;