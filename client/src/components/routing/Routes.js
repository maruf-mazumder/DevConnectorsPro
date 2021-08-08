import React from 'react'
import PropTypes from 'prop-types'
import {Route , Switch} from 'react-router-dom';

import Alert from '../Layout/alert';
import Login from '../auth/login';
import Register from '../auth/register';


import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../Profile/Profile';
import Posts from '../posts/Posts'
import Post from '../post/Post'
import NotFound from '../Layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute';



const Routes = props => {
    return (
        <section className="container">
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />

          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute exact path='/add-experience' component={AddExperience} />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
          <PrivateRoute exact path='/posts' component={Posts} />
          <PrivateRoute exact path='/post/:id' component={Post} />
          <Route  component={NotFound} />
        </Switch>
      </section>
    )
}

Routes.propTypes = {

}

export default Routes
