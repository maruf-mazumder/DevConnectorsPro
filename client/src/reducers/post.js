import * as T from '../actions/types';


const initialState ={
     posts:[],
     post:null,
     loading:true,
     error:{

     }
 }

 export default function(state=initialState, action){
     const {type , payload} = action ;
     console.log("post state is : ", state.post );
     console.log("payload is : ", payload );

     if(state !== null && state.post){
         console.log('---',state.post.post)
     }
   
     switch(type){
         case T.GET_POSTS:
             return{
                 ...state,
                 posts:payload.posts,
                 loading:false
             }
        case T.GET_POST:
            return {
                ...state,
                post : payload,
                loading: false
            }
        case T.ADD_POST:
            return {
                ...state,
                posts:[payload, ...state.posts ],
                loading : false
            }
        case T.DELETE_POST:
            return {
                ...state,
                posts:state.posts.filter(post => post._id != payload),
                loading: false
            }
         case T.POST_ERROR:
             return{
                 ...state,
                 error:payload,
                 loading:false
             }
         case T.UPDATE_LIKES:
             console.log(state.posts.posts,"xxmm");
             return {
                 ...state,
                 posts:state.posts.map(post => post._id === payload.id ?{...post,likes:payload.likes}:post ),
                 loading:false
             }
        case T.ADD_COMMENT:
            return {
                ...state,
                comments:{...state.post.post.comments, payload},
                loading:false
            }
        case T.REMOVE_COMMENT:
            return {
                ...state,
                comments:state.post.post.comments.filter(comment => comment._id === payload),
                loading:false
            }
         default :
         return state;
       
     }

 }