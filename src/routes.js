import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import LoginView from './modules/login/loginViewContainer'
import HomePageView from './modules/main_page/mainPageViewContainer'
import CarDetailView from './modules/car_detail/carDetailViewContainer'
import {getToken} from './utils/Storage';
const routes = (
  <Router basename="/">
    <switch>
      <Route exact path="/" render={() => (
        !getToken() ? <LoginView/> : <Redirect to="/homePage" />
      )}/>
      <Route exact path="/login" render={() => (
        !getToken() ? <LoginView/> : <Redirect to="/homePage" />
      )}/>
      <Route exact path="/homePage" render={() => (
        getToken() ? <HomePageView/> : <Redirect to="/login" />
      )}/>
      <Route exact path="/cars/:id" render={() => (
        getToken() ? <CarDetailView/> : <Redirect to="/login" />
      )} />
    </switch>
  </Router>
)

export default routes
