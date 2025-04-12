import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/api/client';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : '',
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                localStorage.clear();
                return Promise.reject(error);
            }

            try {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    originalRequest._retry = true;

                    const response = await axios.post(`${baseURL}/login/refresh`, {
                        refresh_token: refreshToken
                    });

                    const { access_token, refresh_token: newRefreshToken } = response.data;

                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', newRefreshToken);

                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${access_token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                    return axiosInstance(originalRequest);
                } else {
                    console.log("Refresh token expired");
                    localStorage.clear();
                    window.location.replace('/MyAccountSignIn');
                }
            } catch (err) {
                console.error("Refresh failed", err);
                localStorage.clear();
                window.location.replace('/MyAccountSignIn');
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
