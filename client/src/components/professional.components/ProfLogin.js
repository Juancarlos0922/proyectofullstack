import React, { Component } from 'react';
import AuthServices from '../../services/auth.services';

import { Link } from 'react-router-dom'

import {Toast} from 'react-bootstrap'

class ProfLogin extends Component {
  constructor(props){
    super(props);
    this.state = { password: '', username: '',  
    error: null,
    showToast: false }
    this.authServices = new AuthServices()
  }

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })
  

  handleFormSubmit = e => {
    e.preventDefault()
    const {username, password} = this.state
    this.authServices.loginProf(username, password)
    .then(theLoggedUser => {
      this.setState({password: '', username: '' })
      this.props.setUser(theLoggedUser)
      this.props.history.push('/professional/profile')
    
    })
    .catch((err) => {
      console.log('error al mandar la info de logeo al back', err.response.data.message)
      this.setState({password: '', username: '', error: err.response.data.message})
      this.handleToastOpen()})
  }

  handleToastOpen = () => this.setState({ showToast: true })
  handleToastClose = () => this.setState({ showToast: false, err: null })


  render(){
    
    return(
      <div className="background-repeat">

      <Toast onClose={this.handleToastClose} show={this.state.showToast} delay={4000} autohide style={{ position: 'fixed', bottom: 350, right: 450, zIndex: 9999 }}>
          <Toast.Header>
              <strong className="mr-auto">¡Ups!Parece que ha habido un error:</strong>
          </Toast.Header>
          <Toast.Body>{this.state.error}</Toast.Body>
      </Toast>


      <div className="container">
        <Link to="/"><img src="/images/Handy-logo.png" alt="handy logo"></img></Link>  
        <div className="row justify-content-center">

          <div className="col-md-6 login-form">
            <h3>Hola de nuevo, entra en tu cuenta: </h3>
              <div className="row justify-content-center">
            
                  <form className="col-md-10" onSubmit={this.handleFormSubmit}>

                      <div className="form-group">
                          <label htmlFor="input-username">Nombre de usuario: </label>
                          <input type="text" className="form-control" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                      </div>

                      <div className="form-group">
                          <label htmlFor="input-password">Contraseña: </label>
                          <input type="password" className="form-control" name="password" id="input-password" value={this.state.password} onChange={this.handleChangeInput}></input>
                      </div>

                      <div className="flex">
                          <button className="btn btn-light" type="submit">Accede</button>
                          <Link className="to-signup-or-delete" to="/professional/signup">¿Aún no tienes cuenta?</Link>
                      </div>
                  </form>
        
              </div>

          </div>
        </div>
      </div>
    </div>  
    )
  }
}

export default ProfLogin;