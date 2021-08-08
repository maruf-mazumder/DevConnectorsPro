import axios from "axios";
import { setAlert } from "./alert";
import * as T from './types'


//GET POSTS
export const getPosts = () => async dispatch =>{
    try {
        const res  = await axios.get('/api/posts');
        dispatch({
            type:T.GET_POSTS,
            payload:res.data
        })
    } catch (err) { 
        dispatch({
            type:T.POST_ERROR,
            payload:{msg:err.response.statusText ,status:err.response.status}
        })
    }
}

//ADD LIKE
export const addLike = postid  => async dispatch =>{
    try {
        const res  = await axios.put(`/api/posts/like/${postid}`);
        console.log("zzzz", res,"postid=",postid);
        dispatch({
            type:T.UPDATE_LIKES,
            payload:{ id : postid , likes:res.data }
        })
    } catch (err) {
        console.log("zzzz", err);
        dispatch({
            type:T.POST_ERROR,
            payload:{msg:err.response.statusText ,status:err.response.status}
        })
    }
}
//REMOVE LIKE
export const removeLike = postid  => async dispatch =>{
    try {
        const res  = await axios.put(`/api/posts/unlike/${postid}`);
        console.log("zzzz", res);
        dispatch({
            type:T.UPDATE_LIKES,
            payload:{ id : postid , likes:res.data }
        })
    } catch (err) { 
        console.log("zzzz", err);
        dispatch({
            type:T.POST_ERROR,
            payload:{msg:err.response.statusText ,status:err.response.status}
        })
    }
}


//DELETE POST
export const deletePost = id  => async dispatch =>{
    try {
        const res  = await axios.delete(`/api/posts/${id}`);
        console.log("zzzz", res);
        dispatch({
            type:T.DELETE_POST,
            payload: id
        });
        dispatch(setAlert('Post Removed','success'));
    } catch (err) { 
        console.log("zzzz", err);
        dispatch({
            type:T.POST_ERROR,
            payload:{msg:err.response.statusText ,status:err.response.status}
        })
    }
}




//ADD POST
export const addPost = formData  => async dispatch =>{
    console.log(formData);
    const config  = {
        headers : {
            'Content-Type':"application/json"
        }
    }
    try {
        const res  = await axios.post(`/api/posts`, formData , config);
        console.log("zzzz", res);
        dispatch({
            type:T.ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Post Created','success'));
    } catch (err) { 
        console.log("zzzz", err);
        dispatch({
            type:T.POST_ERROR,
            payload:{msg:err.response.statusText ,status:err.response.status}
        })
    }
}


//GET POSTS
export const getPost = id => async dispatch =>{
    try {
        const res  = await axios.get(`/api/posts/${id}`);
        dispatch({
            type:T.GET_POST,
            payload:res.data
        })
    } catch (err) { 
        dispatch({
            type:T.POST_ERROR,
            payload:{msg:err.response.statusText ,status:err.response.status}
        })
    }
}



//ADD COMMENT
export const addComment = (postId , formData)  => async dispatch =>{
    console.log(formData);
    const config  = {
        headers : {
            'Content-Type':"application/json"
        }
    }
    try {
        const res  = await axios.post(`/api/posts/comment/${postId}`, formData , config);
        console.log("zzzz", res);
        dispatch({
            type:T.ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment Added','success'));
    } catch (err) { 
        console.log("zzzz", err);
        dispatch({
            type:T.POST_ERROR,
            payload:{msg:err.response.statusText ,status:err.response.status}
        })
    }
}





//DELETE COMMENT
export const deleteComment = (postId , commentId)  => async dispatch =>{
 
    try {
        const res  = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        console.log("zzzz", res);
        dispatch({
            type:T.REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Removed','success'));
    } catch (err) { 
        console.log("zzzz", err);
        dispatch({
            type:T.POST_ERROR,
            payload:{msg:err.response.statusText ,status:err.response.status}
        })
    }
}
