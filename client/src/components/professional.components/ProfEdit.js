import React, { Component } from 'react'

import { Link} from 'react-router-dom'

import AuthServices from '../../services/auth.services'
import ProfServices from '../../services/prof.services'
import PartServices from '../../services/part.services'

class ProfEdit extends Component {
  constructor(props){
    super(props);
    this.state = { 
      actualUsername: '',
      actualEmail: '',
      actualJob: '',
      actualDescription: '',
      actualLocalities: '',
      actualImageUrl: '',

      username: '', 
      email: '', job: '', 
      description: '', 
      localities: '', 
      imageUrl: 'https://res.cloudinary.com/dfevkaska/image/upload/v1566726933/handy/default-user.png.png' }
    this.authServices = new AuthServices()
    this.profServices = new ProfServices()
    this.partServices = new PartServices()
  }


  componentDidMount() {
    this.profServices.getOneProfessional(this.props.userInSession.data._id)
    .then(theProf => {

      this.setState(
      {
        actualUsername: theProf.data.username,
        actualEmail: theProf.data.email,
        actualJob: theProf.data.job,
        actualDescription: theProf.data.description,
        actualLocalities: theProf.data.localities,
        actualImageUrl: theProf.data.imageUrl
      }
    )})
  
    .catch((err) => console.log('err', err))
  }


  handleChangeInput = e => {

    let {name, value} = e.target
    
    this.setState({ [name]: value })
  }


  handleFormUpdate = e => {
    e.preventDefault()

    const id = this.props.userInSession.data._id
    const {username, email, job, description, localities, imageUrl} = this.state

    this.profServices.updateProfessional(id, username, email, job, description, localities, imageUrl)
    .then((theProf) => {

      this.setState(
        {username:'', email: '', job: '', description: '', localities: '', imageUrl: 'https://res.cloudinary.com/dfevkaska/image/upload/v1566726933/handy/default-user.png.png',
        actualUsername: theProf.data.username,
        actualEmail: theProf.data.email,
        actualJob: theProf.data.job,
        actualDescription: theProf.data.description,
        actualLocalities: theProf.data.localities,
        actualImageUrl: theProf.data.imageUrl})
    
    })
    .catch((err) => console.log('error al mandar tus datos actualizados a la base de datos', err.response.data.message))
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


  deleteProf = () => {

    const id = this.props.userInSession.data._id

    this.partServices.removeAllFavourites(id)

        this.profServices.deleteProfessional(id)
        .then(() => {
            this.props.setUser(null)
            this.props.history.push('/')
      
        }) 
        .catch(err => console.log('este ese el error',err))

  }


  render(){

    return(
      <div className="background-repeat">

          <div className="container">
            <div className="row justify-content-around edit-row">

              <section className="col-md-4 login-form">

                <h3>Estos son tus datos:</h3>

                <div className="actual-data">

                    <header className="prof-header">
                      <img src={this.state.actualImageUrl} alt={this.state.actualUsername}></img>
                      <h5>{this.state.actualUsername}</h5>
                    </header>
                    
                    <body>

                      <article>
                        <p>{this.state.actualEmail}</p>
                      </article>

                      <article>
                        <p>{this.state.actualJob}</p>
                      </article>

                      <article>
                        <p>{this.state.actualLocalities}</p>
                      </article>

                      <article>
                        <p>{this.state.actualDescription}</p>
                      </article>

                    </body>

              </div>
                
              </section>
              
              <section className="col-md-6 login-form">

                <h3>Puedes actualizarlos aquí:</h3>

                <form onSubmit={this.handleFormUpdate}>
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

                      </div>

                      <div className="col-md-6">

                        <div className="form-group">
                            <label htmlFor="input-description">Describe tu trabajo brevemente:</label>
                            <input className="form-control form-control-sm" type="textaera" name="description" id="input-description" value={this.state.description} onChange={this.handleChangeInput}></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="input-img">Por último, cambia tu foto de perfil:</label>
                            <div className="file-input-wrapper">
                                <button className="btn-file-input">Upload File</button>
                                <input className="custom-style" name="imageUrl" type="file" id="input-img" onChange={this.handleFileUpload} />
                            </div>
                        </div>

                        <div className="prof-signup">
                            <button className="btn btn-light" type="submit">Actualizar</button>
                        </div>  

                        <div className="prof-edit-leave">
                            <Link className="to-signup-or-delete" as="div" to="#"><p onClick={this.deleteProf}>Darse de baja</p></Link>
                        </div>
                   
                    </div>  
                  </div>
                </form>
              </section>

            </div>
          </div>
      </div>
    )
  }
}

export default ProfEdit
