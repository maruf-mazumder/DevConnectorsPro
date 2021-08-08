import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const ProfileAbout = ({newprofile : {bio , skills , user :{name ,}}}) => 
     (
       <div class="profile-about bg-light p-2">
           {bio && (
           <Fragment>
        <h2 class="text-primary">{name.trim().split(' ')[0]}'s' Bio</h2>
        <p>
          {bio}
        </p>
               
           </Fragment>) }

        <div class="line"></div>
        <h2 class="text-primary">Skill Set</h2>
        <div class="skills">
            {skills.map((skill, index)=>(
                <div className="p-1"key={index}>
                    <i className="fas fa-check">{skills}</i>
                </div>
            ))}
        </div>
      </div>
    )


ProfileAbout.propTypes = {
    newprofile : PropTypes.object.isRequired,
}

export default ProfileAbout
