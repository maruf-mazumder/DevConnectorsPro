import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Layout/spinner'
import { getPost } from '../../actions/post'
import { connect } from 'react-redux'
import PostItem from '../posts/PostItem'
import CommentItem from '../post/CommentItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
const Post = ({getPost , post :{ post  , loading} , match }) => {
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost,post])
    console.log("ccc",post);
    if(post !== null){
        console.log('acche')
    }else{
        console.log('nai')
    }
    // if(post.comments !== null){
    //     let comments = post.comments
    // }
    return (
        loading || post === null  ? <Spinner /> :<Fragment>
            <Link to='/posts' className='btn' >
                Back to Post
            </Link>
            <PostItem post={post.post} showActions={false} />
            
            {post._id === undefined? (<CommentForm postId={post.post._id} />) : (<CommentForm postId={post._id} />) }
          {post._id === undefined ? (<Fragment>
            <div className="comments">
                {post.post.comments.map(comment => (
                    // console.log("vv", comment)
                    <CommentItem key = {comment._id} comment = {comment} postId={post.post._id} />
                ))}
            </div>
              </Fragment>) : (
                <Fragment>
                     {post.comments.map(comment => (
                    // console.log("vv", comment)
                    <CommentItem key = {comment._id} comment = {comment} postId={post._id} />
                ))}
                </Fragment>
              )}
        </Fragment> 
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post : PropTypes.object.isRequired,

}
const mapStateToProps = state =>({
    post :state.post
})
export default connect(mapStateToProps , {getPost})(Post);
