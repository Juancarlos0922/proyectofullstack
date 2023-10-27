import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link} from 'react-router-dom'


import AuthServices from '../../services/auth.services'
import PartServices from '../../services/part.services'

class PartEdit extends Component {
  constructor(props){
    super(props);
    this.state = { 
      actualUsername: '',
      actualEmail: '',
      actualPhone: '',

      username: '', 
      email: '',
      phoneNumber: '',  
      }
    this.authServices = new AuthServices()
    this.partServices = new PartServices()
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    console.log(this.props.userInSession.data._id)
    this.partServices.getOneParticular(this.props.userInSession.data._id)
    .then(thePart => {

      this.setState(
      {
        actualUsername: thePart.data.username,
        actualEmail: thePart.data.email,
        actualPhone: thePart.data.phoneNumber
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
    const {username, email, phoneNumber} = this.state

    this.partServices.updateParticular(id, username, email, phoneNumber)
    .then((thePart) => {

      this.setState(
        {username:'', email: '', phoneNumber: '',
        actualUsername: thePart.data.username,
        actualEmail: thePart.data.email,
        actualPhone: thePart.data.phoneNumber
      })
    })
    .catch((err) => console.log('error al mandar tus datos actualizados a la base de datos', err.response.data.message))
  }


  deletePart = () => {

    const id = this.props.userInSession.data._id

    this.partServices.deleteParticular(id)
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

                <header>
                  <h5>{this.state.actualUsername}</h5>
                </header>
                
                <body>

                  <article>
                    <p>{this.state.actualEmail}</p>
                  </article>

                  <article>
                    <p>{this.state.actualPhone}</p>
                  </article>

                </body>

              </div>

            </section>
            


            <section className="col-md-4 login-form">

              <h3>Puedes actualizarlos aquí:</h3>

                <form onSubmit={this.handleFormUpdate}>

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
                      
                    <div className="flex">
                        <button className="btn btn-light" type="submit">Actualizar</button>
                        <Link className="to-signup-or-delete" as="div" to="#"><p onClick={this.deletePart}>Darse de baja</p></Link>
                    </div>  

                </form>
            </section>

          </div>
        </div>
      </div>
    )
  }
}

export default PartEdit
