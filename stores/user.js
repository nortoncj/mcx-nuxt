// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        theme_id: '',
        firstName: '',
        lastName: '',
        email: '',
        image: '',
        bio: '',
        theme_id: null,
        colors: null,
        allLinks: null,
        isMobile: false,
        updatedLinkId: 0,
        addLinkOverlay: false,
        isPreviewOverlay: false,
    }),
    
    actions: {
        async getTokens() {
            try {
                const { $axios } = useNuxtApp();
                
                // Clear any existing tokens first
                const xsrfCookie = useCookie('XSRF-TOKEN');
                xsrfCookie.value = null;
                
                await $axios.get('/sanctum/csrf-cookie');
                console.log('CSRF cookie refreshed');
                
                // Wait a brief moment for cookie to be set
                await new Promise(resolve => setTimeout(resolve, 100));
                
            } catch (error) {
                console.error('Error getting CSRF token:', error);
                throw error;
            }
        },
        
        async register(firstName, lastName, email, title, password, password_confirmation) {
            try {
                const { $axios } = useNuxtApp();
                
                // Ensure fresh CSRF token
                await this.getTokens();
                
                const response = await $axios.post('/register', {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    title: title,
                    password: password,
                    password_confirmation: password_confirmation,
                });
                
                return response;
            } catch (error) {
                console.error('Registration error:', error.response?.data);
                
                // If CSRF error, try once more with fresh token
                if (error.response?.status === 419) {
                    console.log('Retrying registration with fresh CSRF token...');
                    try {
                        await this.getTokens();
                        const retryResponse = await $axios.post('/register', {
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            title: title,
                            password: password,
                            password_confirmation: password_confirmation,
                        });
                        return retryResponse;
                    } catch (retryError) {
                        console.error('Retry failed:', retryError.response?.data);
                        throw retryError;
                    }
                }
                throw error;
            }
        },

        async login(email, password) {
            try {
                const { $axios } = useNuxtApp();
                
                // Get fresh CSRF token
                await this.getTokens();
                
                const response = await $axios.post('/login', {
                    email,
                    password
                });
                
                return response;
            } catch (error) {
                console.error('Login error:', error.response?.data);
                throw error;
            }
        },

        async getUser() {
            try {
                const { $axios } = useNuxtApp();
                let res = await $axios.get('/api/user');
                
                this.$state.id = res.data.id;
                this.$state.firstName = res.data.first_name;
                this.$state.lastName = res.data.last_name;
                this.$state.title = res.data.title;
                this.$state.email = res.data.email;
                this.$state.image = res.data.image;
                this.$state.bio = res.data.bio;
                this.$state.theme_id = res.data.theme_id;
            } catch (error) {
                console.error('Get user error:', error);
                throw error;
            }
        },

        async logout() {
            try {
                const { $axios } = useNuxtApp();
                await $axios.post('/logout');
                this.resetState();
            } catch (error) {
                console.error('Logout error:', error);
                // Reset state even if logout fails
                this.resetState();
            }
        },

        resetState() {
            this.$state.id = '';
            this.$state.firstName = '';
            this.$state.lastName = '';
            this.$state.title = '';
            this.$state.email = '';
            this.$state.image = '';
            this.$state.bio = '';
            this.$state.theme_id = null;
            this.$state.colors = null;
            this.$state.allLinks = null;
            this.$state.isMobile = false;
            this.$state.updatedLinkId = 0;
            this.$state.addLinkOverlay = false;
            this.$state.isPreviewOverlay = false;
            
            // Clear CSRF token on logout
            const xsrfCookie = useCookie('XSRF-TOKEN');
            xsrfCookie.value = null;
        }
    },
    persist: true
});
