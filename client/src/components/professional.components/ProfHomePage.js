import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import Agenda from './Agenda'
import AuthServices from '../../services/auth.services'
import EventsServices from '../../services/events.services'

class ProfHomePage extends Component {

  constructor({props}){
    super(props)
    this.state = {
      showModal: false
    }
    this.authServices = new AuthServices()
    this.eventsServices = new EventsServices()

  }

  handleModalOpen = () =>  this.setState({ showModal: true})
  handleModalClose = () => this.setState({ showModal: false})


  logout = () => {
    this.authServices.logout()
    .then(x => {
      this.props.setUser(null)
        })
        .catch(err => console.log(err))
  }

  render = ()=> {

    return(
      <div className="prof-home-page">

        <header>
            <h2>Hola de nuevo {this.props.loggedInUser.data.username}</h2>
        </header>

        <div className="agenda-div">
            <Link to="#" onClick={this.handleModalOpen}><img src="../../../images/agenda.png" alt="agenda"></img></Link>
        </div>

        <Modal show={this.state.showModal} onHide={this.handleModalClose}>

            <Modal.Header closeButton>
                <Modal.Title>Estas son las citas de tu agenda:</Modal.Title>
            </Modal.Header>

            <Modal.Body>              
                <Agenda profId={this.props.loggedInUser.data._id}></Agenda>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={this.handleModalClose}>Cerrar</Button>
            </Modal.Footer>

        </Modal>
      </div>
    )
  }

}

export default ProfHomePage