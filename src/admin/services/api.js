import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const SERVER_ROOT_URL = API_BASE_URL.replace(/\/api$/, "");

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, 
});

// Placeholder for the function registered by AdminRoutes
let onUnauthorizedCallback = () => {};

// Function exported to allow AdminRoutes to register the redirect logic
export const setUnauthorizedRedirectCallback = (callback) => {
    onUnauthorizedCallback = callback;
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Trigger the registered redirect callback in AdminRoutes
            onUnauthorizedCallback();
        }
        return Promise.reject(error);
    }
);

// Correctly export required variables
export { SERVER_ROOT_URL };

export default api;