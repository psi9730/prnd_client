import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from 'components/App'
import { HomePage } from 'components'
import loginView  from './modules/login/loginViewContainer'
import CardView  from './modules/main_page/mainPageViewContainer'

const routes = (
  <Router basename="/">
    <switch>
    <Route path="/login" component={loginView}/>
    <Route path="/homePage" component={CardView}/>
    <Route exact path="/" component={loginView}/>
  </Router>
)

export default routes
