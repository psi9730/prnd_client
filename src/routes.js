import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from 'components/App'
import { HomePage } from 'components'
import loginView  from './modules/login/loginViewContainer'
import CardWriteView  from './modules/card_write/CardWriteViewContainer'
import CardView  from './modules/main_page/mainPageViewContainer'
import UserProfileView  from './modules/user_profile/UserProfileViewContainer'
import PetProfileView  from './modules/pet_profile/PetProfileViewContainer'
import CardDetailView from './modules/card_detail/CardDetailViewContainer'
import SignUpView from 'modules/login/SignUpViewContainer'
import SearchViewContainer from 'modules/search_page/SearchViewContainer'
import MemoContainer from 'modules/memo/memoViewContainer'

const routes = (
  <Router basename="/">
    <switch>
    <Route path="/login" component={loginView}/>
    <Route path="/homePage" component={CardView}/>
      <Route exact path="/" component={loginView}/>
      <switch>
    <Route exact path="/userProfile/:userEmail" component={UserProfileView}/>
    <Route exact path="/userProfile/" component={UserProfileView}/>
      </switch>
      <switch>
      <Route exact path="/petProfile/:id" component={PetProfileView}/>
      <Route exact path="/petProfile/" component={PetProfileView}/>
      </switch>
    <Route path="/cardWrite" component={CardWriteView}/>
    <Route path="/cardDetail/:id" component={CardDetailView}/>
    <Route path="/signUp" component={SignUpView}/>
    <Route path="/search" component={UserProfileView}/>
      <Route path="/memo" component={MemoContainer}/>
    </switch>
  </Router>
)

export default routes
