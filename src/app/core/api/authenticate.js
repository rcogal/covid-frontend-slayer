import axios from 'axios';

const endpoint = 'https://covid-slayer.herokuapp.com';
// const endpoint = 'http://localhost:5000';


const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};


export const authenticate = (email, password) => {
  return axios.post(`${endpoint}/api/login`, {email, password}, config)
    .then( (response) => {
      
      window.localStorage.setItem('authToken', console.log(response.data.token));

      return response.data.token;
    });
}

export const isAuthenticated = () => {
  return window.localStorage.getItem('authToken');
}


export const logout = () => {
  return new Promise( resolve => {
    resolve(window.localStorage.clear());
  });
}