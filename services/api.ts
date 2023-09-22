import axios, {AxiosError} from 'axios';
import {parseCookies} from 'nookies'

let cookies = parseCookies();

export const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        Authorization: `Bearer ${cookies['nextauth.token']}`
    } 
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response.status === 401) {
        if(error.response.data?.code === 'token.expired') {
           cookies = parseCookies();

           const { 'nextauth.refreshToken': refreshToken } = cookies;

           api.post('/refresh', {
                refreshToken,
              }).then(response => {
                const { token } = response.data;
    
                cookies = parseCookies();
    
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                cookies['nextauth.token'] = token;
    
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                cookies['nextauth.refreshToken'] = response.data.refreshToken;
    
              }).catch(err => {
                console.log(err);
           })

        } else {
        }
    }

    return Promise.reject(error);
})

