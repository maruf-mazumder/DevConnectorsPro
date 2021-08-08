import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import Spinner from '../Layout/spinner';
import { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';




const Dashboard = ({getCurrentProfile,deleteAccount , history, auth:{user} , profile :{profile , loading} })=> {
 
    console.log("Profile",profile , "loading", loading );

    useEffect(() => {
       getCurrentProfile();
    }, [getCurrentProfile]);


    return (
        loading && profile===null ? <Spinner/> : <Fragment> 
            <h1 className="large text-primary"> Dashboard </h1>
            <p className="leaad">
                <i className="fas fa-user"></i>
                Welcome {user && user.name}
            </p>
            {
                profile!==null ? <Fragment> <DashboardActions/>
                 <Experience experience={profile.experience}/> 
                 <Education education={profile.education}/> 
                 <div className="my-2">
                     <button className="btn btn-danger" onClick={()=>{deleteAccount(history)}}>
                         <i className="fas fas-user-minus"></i> Delete My Account
                     </button>
                 </div>
                 </Fragment>:
                (<Fragment>
                    <p>You have not yet setup a profile, Please add some info</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                   
                </Fragment>)
            }
        </Fragment>   
    );
};

Dashboard.propTypes = {
    profile : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired, 
    getCurrentProfile : PropTypes.func.isRequired ,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    profile:state.profile,
    auth : state.authReducer
});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(withRouter(Dashboard));
