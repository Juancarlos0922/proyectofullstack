import React, { Component } from 'react'
import AuthServices from '../../services/auth.services'

import { Link } from 'react-router-dom'

import {Toast} from 'react-bootstrap'

class ProfSignup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '', email: '', job: '', description: '', localities: '', imageUrl: 'https://res.cloudinary.com/dfevkaska/image/upload/v1566726933/handy/default-user.png.png',
    error: null,
    showToast: false }
    this.authServices = new AuthServices()
  }

  handleChangeInput = e => {

    let {name, value} = e.target
    
    this.setState({ [name]: value })
  }


  handleFormSubmit = e => {
    e.preventDefault()

    const {username, email, password, job, description, localities, imageUrl} = this.state

    this.authServices.signupProf({username, email, password, job, description, localities, imageUrl})
    .then((theNewUser) => {

      this.setState({username:'', password: '', email: '', job: '', description: '', localities: '', imageUrl: 'https://res.cloudinary.com/dfevkaska/image/upload/v1566726933/handy/default-user.png.png' })
      this.props.setUser(theNewUser)
      this.props.history.push('/professional/profile')
    
    })
    .catch((err) => {console.log('error al mandar la info de registro al back', {err})
      this.setState({username:'', password: '', email: '', job: '', description: '', localities: '', imageUrl: 'https://res.cloudinary.com/dfevkaska/image/upload/v1566726933/handy/default-user.png.png', error: err.response.data.message})
      this.handleToastOpen()})
  }


  handleFileUpload = e => {

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    this.authServices.handleUpload(uploadData)
        .then(response => {
          this.setState({ imageUrl: response.data.secure_url })
        })
        .catch(err => console.log(err))
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

              <div className="col-md-8 login-form">

                <h3>¿Eres nuev@? Regístrate:</h3>
                  <div className="row justify-content-center">
                    
                          <form className="col-md-10" onSubmit={this.handleFormSubmit}>
                            <div className="row">

                              <div className="col-md-6"> 

                                  <div className="form-group">
                                      <label htmlFor="input-username">Nombre: </label>
                                      <input type="text" className="form-control form-control-sm" name="username" id="input-username" value={this.state.username} onChange={this.handleChangeInput}></input>
                                  </div>

                                  <div className="form-group">
                                      <label htmlFor="input-email">Email: </label>
                                      <input type="text" className="form-control form-control-sm" name="email" id="input-email" value={this.state.email} onChange={this.handleChangeInput}></input>
                                  </div>

                                  <div className="form-group">
                                      <label htmlFor="input-password">Contraseña: </label>
                                      <input className="form-control form-control-sm" type="password"  name="password" id="input-password" value={this.state.password} onChange={this.handleChangeInput}></input>
                                  </div>

                                  <div className="form-group">
                                      <label htmlFor="input-localities">Selecciona una provincia:</label>
                                      <select className="form-control form-control-sm" name="localities" id="input-localities" selected={this.state.localities} onChange={this.handleChangeInput}>
                                          <option>selecciona</option>
                                          <option value='Albacete'>Albacete</option>
                                          <option value='Alicante/Alacant'>Alicante/Alacant</option>
                                          <option value='Almería'>Almería</option>
                                          <option value='Araba/Álava'>Araba/Álava</option>
                                          <option value='Asturias'>Asturias</option>
                                          <option value='Ávila'>Ávila</option>
                                          <option value='Badajoz'>Badajoz</option>
                                          <option value='Barcelona'>Barcelona</option>
                                          <option value='Bizkaia'>Bizkaia</option>
                                          <option value='Burgos'>Burgos</option>
                                          <option value='Cáceres'>Cáceres</option>
                                          <option value='Cádiz'>Cadiz</option>
                                          <option value='Cantabria'>Cantabria</option>
                                          <option value='Castellón/Castelló'>Castellón/Castelló</option>
                                          <option value='Ciudad Real'>Ciudad Real</option>
                                          <option value='Córdoba'>Córdoba</option>
                                          <option value='Coruña, A'>Coruña, A</option>
                                          <option value='Cuenca'>Cuenca</option>
                                          <option value='Gipuzkoa'>	Gipuzkoa</option>
                                          <option value='Girona'>Girona</option>
                                          <option value='Granada'>Granada</option>
                                          <option value='Guadalajara'>Guadalajara</option>
                                          <option value='Huelva'>Huelva</option>
                                          <option value='Huesca'>Huesca</option>
                                          <option value='Jaén'>Jaén</option>
                                          <option value='León'>León</option>
                                          <option value='Lleida'>Lleida</option>
                                          <option value='Lugo'>Lugo</option>
                                          <option value='Madrid'>Madrid</option>
                                          <option value='Málaga'>Málaga</option>
                                          <option value='Murcia'>Murcia</option>
                                          <option value='Navarra'>Navarra</option>
                                          <option value='Ourense'>Ourense</option>
                                          <option value='Palencia'>	Palencia</option>
                                          <option value='Pontevedra'>Pontevedra</option>
                                          <option value='Rioja, La'>Rioja, La</option>
                                          <option value='Salamanca'>Salamanca</option>
                                          <option value='Segovia'>Segovia</option>
                                          <option value='Sevilla'>Sevilla</option>
                                          <option value='Soria'>Soria</option>
                                          <option value='Tarragona'>Tarragona</option>
                                          <option value='Teruel'>Teruel</option>
                                          <option value='Toledo'>Toledo</option>
                                          <option value='Valencia/València'>Valencia/València</option>
                                          <option value='Valladolid'>Valladolid</option>
                                          <option value='Zamora'>Zamora</option>
                                          <option value='Zaragoza'>	Zaragoza</option>
                                      </select>
                                  </div>
                                </div>

                                <div className="col-md-6">

                                  <div className="form-group">
                                      <label htmlFor="input-job">¿Qué trabajo realizas?:</label>
                                      <select className="form-control form-control-sm" name="job" id="input-job" selected={this.state.job} onChange={this.handleChangeInput} >
                                          <option>selecciona</option>
                                          <option value='albañilería'>albañilería</option>
                                          <option value='animador sociocultural'>animador sociocultural</option>
                                          <option value='catering'>catering</option>
                                          <option value='clases particulares'>clases particulares</option>
                                          <option value='costura'>costura</option>
                                          <option value='cuidado de mascotas'>cuidado de mascotas</option>
                                          <option value='cuidado de personas'>cuidado de personas</option>
                                          <option value='electricidad'>electricidad</option>
                                          <option value='fisioterapia'>fisioterapia</option>
                                          <option value='fontanería'>fontanería</option>
                                          <option value='guía turístico'>guía turístico</option>
                                          <option value='informática'>informática</option>
                                          <option value='jardinería'>jardinería</option>
                                          <option value='limpieza del hogar'>limpieza del hogar</option>
                                          <option value='maquillaje profesional'>maquillaje profesional</option>
                                          <option value='música y espectáculos'>música y espectáculos</option>
                                          <option value='peluquería y estética'>peluquería y estética</option>
                                          <option value='personal shopper'>personal shopper</option>
                                          <option value='pintura'>pintura</option>
                                          <option value='reformas'>reformas</option>
                                      </select>
                                  </div>

                                  <div className="form-group">
                                      <label htmlFor="input-description">Describe tu trabajo brevemente:</label>
                                      <input className="form-control form-control-sm" type="textaera" name="description" id="input-description" value={this.state.description} onChange={this.handleChangeInput}></input>
                                  </div>

                                  <div className="form-group">
                                      <label htmlFor="input-img">Por último, añade una foto de perfil:</label>
                                      <div className="file-input-wrapper">
                                          <button className="btn-file-input">Upload File</button>
                                          <input className="custom-style" name="imageUrl" type="file" id="input-img" onChange={this.handleFileUpload} />
                                      </div>
                                  </div>
                                  <div className="prof-signup">
                                      <button className="btn btn-light" type="submit">Enviar</button>
                                  </div>
                              </div>  
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

export default ProfSignup
