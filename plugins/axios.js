// plugins/axios.js
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    
    axios.defaults.baseURL = 'http://localhost:8000';
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    
    // CRITICAL: Add request interceptor for CSRF token
    axios.interceptors.request.use(
        (config) => {
            // Get CSRF token from cookie for all requests except initial CSRF fetch
            if (config.url !== '/sanctum/csrf-cookie') {
                const token = useCookie('XSRF-TOKEN');
                if (token.value) {
                    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token.value);
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Enhanced response interceptor
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 419) {
                console.error('CSRF token mismatch - attempting to refresh token');
                // Optionally retry with fresh token
                try {
                    await axios.get('/sanctum/csrf-cookie');
                    // Retry the original request
                    return axios.request(error.config);
                } catch (retryError) {
                    console.error('Failed to refresh CSRF token:', retryError);
                }
            }
            return Promise.reject(error);
        }
    );

    return {
        provide: {
            axios: axios
        }
    };
});
