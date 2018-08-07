import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import loginView  from './modules/login/loginViewContainer'
import homePageView  from './modules/main_page/mainPageViewContainer'

const routes = (
  <Router basename="/">
    <switch>
    <Route path="/login" component={loginView}/>
    <Route path="/homePage" component={homePageView}/>
    <Route exact path="/" component={loginView}/>
    </switch>
  </Router>
)

export default routes
