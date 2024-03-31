import axios from 'axios';

//Get Token from session storage
let token=sessionStorage.getItem('token');

export const axiosWithToken=axios.create({
    headers:{Authorization: `Bearer ${token}`}
})

