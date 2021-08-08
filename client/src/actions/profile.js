import axios from 'axios';
import { setAlert } from './alert';
import { ACCOUNT_DELETED, GET_PROFILE, PROFILE_ERROR , UPDATE_PROFILE ,CLEAR_PROFILE, GET_PROFILES, GET_REPOS } from './types';

//GET Current User's Profile
export const getCurrentProfile = () =>async dispatch=>{
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : error.response.statusText , status : error.response.statusText}
        });
    }
}

//Get All Profiles
export const getProfiles = () =>async dispatch=>{
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILES,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : error.response.statusText , status : error.response.statusText}
        });
    }
}

//Get Profile By Id
export const getProfileById = (userId) =>async dispatch=>{
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : error.response.statusText , status : error.response.statusText}
        });
    }
}

//Get Github Repos
export const getGithubRepos = userName =>async dispatch=>{
    try {
        const res = await axios.get(`/api/profile/github/${userName}`);
        dispatch({
            type:GET_REPOS,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : error.response.statusText , status : error.response.statusText}
        });
    }
}


//Create or Update Profile
export const createProfile = (formData , history , edit=false) => async dispatch =>{
    console.log(formData);
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
      const res = await axios.post('/api/profile',formData,config);
      dispatch({
        type:GET_PROFILE,
        payload: res.data
    });
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created' ,'success' ));

    if(!edit){
        history.push('/dashboard')
    }
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }

        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : error.response.statusText , status : error.response.statusText}
        });
    }
}

//ADD Experience
export const addExperience =(formData , history)=>async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
      const res = await axios.put('/api/profile/experience',formData,config);
      dispatch({
        type:UPDATE_PROFILE,
        payload: res.data
    });
    dispatch(setAlert('Experience Added' ,'success' ));
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }

        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : error.response.statusText , status : error.response.statusText}
        });
    }
} 



//ADD Education
export const addEducation =(formData , history)=>async dispatch =>{
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
      const res = await axios.put('/api/profile/education',formData,config);
      dispatch({
        type:UPDATE_PROFILE,
        payload: res.data
    });
    dispatch(setAlert('Education Added' ,'success' ));
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }

        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : error.response.statusText , status : error.response.statusText}
        });
    }
} 

//DELETE experience

export const deleteExperience = id =>async dispatch=>{
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Experience Removed' ,'success' ));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : err.response.statusText , status : err.response.statusText}
        });
    }
}



//DELETE education

export const deleteEducation = id =>async dispatch=>{
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Education Removed' ,'success' ));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg : err.response.statusText , status : err.response.statusText}
        });
    }
}

//DELETE account & profile

export const deleteAccount = (history) =>async dispatch=>{
    if(window.confirm('Are you sure? This cannot be undone!')){
        try {
             await axios.delete(`/api/profile/`);
            dispatch({type : CLEAR_PROFILE});
            dispatch({type : ACCOUNT_DELETED});
            dispatch(setAlert('Your account has been permanently deleted' ));
            // history.push('/dashboard');
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload:{msg : err.response.statusText , status : err.response.statusText}
            });
        }
    }

}