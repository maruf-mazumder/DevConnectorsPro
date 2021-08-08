import React, { Fragment , useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes'

//Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth'


if(localStorage.token){
  setAuthToken(localStorage.token);
  console.log("now 1");
}


const App = () =>{
  useEffect(()=>{
    console.log("now 2");
    store.dispatch(loadUser())
  },[]);
  return (
    
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route component={Routes}/>
      </Switch>

    </Fragment>
  </Router>
</Provider>

  )
}

export default App;
