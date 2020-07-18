import axios from 'axios';

const endpoint = 'https://covid-slayer.herokuapp.com';
// const endpoint = 'http://localhost:5000';


const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};


export const register = (user = {}) => {
  return axios.post(`${endpoint}/api/user`, user, config);
}
