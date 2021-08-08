import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Layout/spinner'
import { getProfileById } from '../../actions/profile'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({getProfileById ,profile:{  profile ,  loading },auth,   match}) => {
    useEffect(()=>{
        getProfileById(match.params.id)
    },[getProfileById , match.params.id ])
    return (
        <Fragment>
            {profile == null  ||  loading ? <Spinner/> :
            <Fragment>
                <Link to="/profiles" className="btn btn-light">Back to Profies</Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark" >Edit Profile</Link>)}

            <div class="profile-grid my-1">

                <ProfileTop newprofile = {profile} />
                <ProfileAbout newprofile = {profile} />

                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {console.log("bbb",profile)}
                    {profile.experience.length>0?(<Fragment>
                        {profile.experience.map(experience=>( <ProfileExperience key={experience._id} newExperience={experience} /> ) )}
                    </Fragment>):( <h4>No Experience Credentials </h4> )}
                </div>

                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {console.log("bbb",profile.education)}
                    {profile.education.length>0?(<Fragment>
                        {profile.education.map(education=>( <ProfileEducation key={education._id} newEducation={education} /> ) )}
                    </Fragment>):( <h4>No Experience Credentials </h4> )}
                </div>
                
                {profile.githubusername && (
                    <ProfileGithub username = {profile.githubusername} />
                )}


            </div>


            </Fragment>}
           
           
        </Fragment>
      
    )
}

Profile.propTypes = {
    getProfileById : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps  = state =>({
    profile : state.profile,
    auth : state.authReducer
})

export default connect(mapStateToProps , {getProfileById})(Profile);
