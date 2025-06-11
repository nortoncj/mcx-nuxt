import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    axios.defaults.baseURL = 'http:localhost:8888';
    axios.defaults.withCredentials = true;

    return {
        provide: {
            axios: axios
        }
    };
})