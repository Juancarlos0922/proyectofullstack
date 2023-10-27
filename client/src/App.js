import React, {Component} from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom'

import AuthServices from './services/auth.services'
import ProtectedRoute from './components/routes/ProtectedRoute'

import Home from './components/Home'

import PartSignup from './components/particular.components/PartSignup'
import PartLogin from './components/particular.components/PartLogin'
import NavBarPart from './components/particular.components/Navbar.Part'
import PartHomePage from './components/particular.components/PartHomePage'
import ParticularCard from './components/particular.components/ParticularCard'
import MyFavourites from './components/particular.components/myFavourites'
import PartEdit from './components/particular.components/PartEdit'

import ProfSignup from './components/professional.components/ProfSignup'
import ProfLogin from './components/professional.components/ProfLogin'
import NavBarProf from './components/professional.components/Navbar.Prof'
import ProfHomePage from './components/professional.components/ProfHomePage'
import ProfEdit from './components/professional.components/ProfEdit'
import Agenda from './components/professional.components/Agenda'


class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this.authServices = new AuthServices()

  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
    console.log("Un componente ha cambiado el usuario en App:", this.state.loggedInUser)
  }


  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authServices.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }

  logout = () => {

    this.authServices.logout()
        .then(x => {
            this.setTheUser(null)
        })
        .catch(err => console.log(err))
}

  render() {

    this.fetchUser()
    
    if (this.state.loggedInUser && this.state.loggedInUser.data.role === 'PROF') {
      return (
        <>
            <NavBarProf  setUser={this.setTheUser} userInSession={this.state.loggedInUser} />

            <Switch>
                <Route path="/" exact render={() => <Home setUser={this.setTheUser}></Home>} />
                <Route path="/edit-professional-profile" exact render={match => <ProfEdit {...match} userInSession={this.state.loggedInUser} setUser={this.setTheUser} />}/>
                <Route path="/deleteProfessional/:id" component={Home}/>
                <ProtectedRoute path='/professional/profile' user={this.state.loggedInUser} setUser={this.setTheUser} component={ProfHomePage} />   
            </Switch>
        </>
      ) 
      } else if (this.state.loggedInUser && this.state.loggedInUser.data.role === 'PART') {
    
          return (
            <>
              <NavBarPart setUser={this.setTheUser} userInSession={this.state.loggedInUser} />

              <Switch>
                    <Route path="/" exact render={() => <Home setUser={this.setTheUser}></Home>} />
                    <Route path='/search/:job' render={match => <ParticularCard {...match} user={this.state.loggedInUser} setUser={this.setTheUser} />} />
                    <Route path='/favourites' render={match => <MyFavourites {...match} user={this.state.loggedInUser} setUser={this.setTheUser} />}/>
                    <Route path='/postEvents' />
                    <Route path='getProfEvents/:profId' render={match => <Agenda {...match}/>} />
                    <Route path="/edit-particular-profile" exact render={match => <PartEdit {...match} userInSession={this.state.loggedInUser} setUser={this.setTheUser} />}/>
                    <Route path="/deleteParticular/:id" component={Home}/>
                    <ProtectedRoute path='/particular/profile' user={this.state.loggedInUser} setUser={this.setTheUser} component={PartHomePage} />   
              </Switch>
          </>
          )
      }
      else {
          return (
            <>
              <Switch>
                  <Route path="/" exact render={() => <Home setUser={this.setTheUser}></Home>} />
                  <ProtectedRoute path='/particular/profile' user={this.state.loggedInUser} setUser={this.setTheUser} component={PartHomePage} />   
                  <ProtectedRoute path='/professional/profile' user={this.state.loggedInUser} setUser={this.setTheUser} component={ProfHomePage} />   
                  <Route exact path='/particular/login'  render={match => <PartLogin {...match}  setUser={this.setTheUser} />} />
                  <Route exact path='/particular/signup' render={match => <PartSignup {...match} setUser={this.setTheUser} />} /> 
                  <Route exact path='/professional/login'  render={match => <ProfLogin {...match}  setUser={this.setTheUser} />} />
                  <Route exact path='/professional/signup' render={match => <ProfSignup {...match} setUser={this.setTheUser} />} /> 
              </Switch>
            </>
          )
      }
  }
}


export default App;
