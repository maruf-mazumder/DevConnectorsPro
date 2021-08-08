//Checks to see if there is a token. If it is , add it to the request header.If not, delete from the header


import axios from 'axios';
const setAuthToken =(token)=>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token ; 
    }
    else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken ; 