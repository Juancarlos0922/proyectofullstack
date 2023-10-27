import React, { Component } from 'react'
import AuthServices from '../../services/auth.services'

import { Link } from 'react-router-dom'

import {Toast} from 'react-bootstrap'

class PartSignup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', email: '', phoneNumber: '',
    error: null,
    showToast: false }
    this.authServices = new AuthServices()
  }

  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })
  

  handleFormSubmit = e => {
    e.preventDefault()
    const {username, email, phoneNumber, password} = this.state
    this.authServices.signupPart(username, email, phoneNumber, password)
    .then((theNewUser) => {
      this.setState({username:'', password: '', email: '', phoneNumber: '' })
      this.props.setUser(theNewUser)
      this.props.history.push('/particular/profile')
    
    })
    .catch((err) => {
      console.log('error al mandar la info de registro al back', {err})
      this.setState({username: '', password: '', email: '', phoneNumber: '', error: err.response.data.message})
      this.handleToastOpen()
    })
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

                <h3>¿Eres nuev@? Regístrate:</h3>
                  <div className="row justify-content-center">
                    
                          <form className="col-md-10" onSubmit={this.handleFormSubmit}>

                            <div className="form-group">
                                <label htmlFor="input-username">Nombre: </label>
                                <input type="text" className="form-control" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="input-email">Email: </label>
                                <input type="text" className="form-control" name="email" id="input-email" value={this.state.email} onChange={this.handleChangeInput}></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="input-phone">Teléfono: </label>
                                <input type="text" className="form-control" name="phoneNumber" id="input-phone" value={this.state.phoneNumber} onChange={this.handleChangeInput}></input>  
                            </div>

                            <div className="form-group">
                                <label htmlFor="input-password">Contraseña: </label>
                                <input type="password" className="form-control" name="password" id="input-password" value={this.state.password} onChange={this.handleChangeInput}></input>
                            </div>

                            <button className="btn btn-light" type="submit">Enviar</button>
                          
                          </form>
            
                  </div>
                </div>
            </div>
        </div>
      </div>

    )
  }
}

export default PartSignup;

