import React, { Component } from 'react'

import FCard from './FCard'

import PartServices from '../../services/part.services'

import Modal from 'react-bootstrap/Modal'
import CalendarComp from '../CalendarComp'


class MyFavourites extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      professionalsIds: [],
      showModal: false,
      professionalId: ''
      }
    this.partServices = new PartServices()
  }

  componentDidMount() {
    let userId
        if(this.props.user.data) { userId = this.props.user.data._id} else {
          userId = this.props.location.state
        }

        this.partServices.getMyFavourites(userId)
        .then(response =>  {
          this.setState({ professionalsIds: response.data.favourites })
        })
        .catch(err => console.log('err', err))
  }

  componentWillReceiveProps() {
    let userId
        if(this.props.user.data) { userId = this.props.user.data._id} else {
          userId = this.props.location.state
        }

        this.partServices.getMyFavourites(userId)
        .then(response =>  {
          this.setState({ professionalsIds: response.data.favourites })
        })
        .catch(err => console.log('err', err))
  }

  handleModalOpen = (e) => this.setState({ showModal: true, professionalId: e.target.value })
  handleModalClose = () => this.setState({ showModal: false, professionalId: '' })

  render() {

    return this.state.professionalsIds.length>=1 ? 
    
      <div className="part-card">
        <div className="container"> 

            <header>
                <h2>Estos son tus favorit@s:</h2>
            </header>

            <div  className="row justify-content-around card-rows">
      
            {
              this.state.professionalsIds.map((elm) => {
                return (
                  <div key={elm} className="col-md-5 prof-card">
                      <FCard  openModal={this.handleModalOpen} closeModal={this.handleModalClose} part={this.props.user.data} prof={elm} setUser={this.props.setUser}/>
          
          
                      <Modal show={this.state.showModal} onHide={this.handleModalClose}>
          
                          <Modal.Header closeButton>
                              <Modal.Title>Selecciona un día:</Modal.Title>
                          </Modal.Header>
                          
                          <Modal.Body>
                              <CalendarComp profId={this.state.professionalId} part={this.props.user.data} closeModal={this.handleModalClose} ></CalendarComp>
                          </Modal.Body>
          
                          <Modal.Footer>
                              <p>Dinos por favor la fecha aproximada de comienzo del trabajo.</p>
                          </Modal.Footer>
          
                      </Modal>
                  </div>
        
                )
              })
            }
          </div>
      </div> 
    </div>
      
  : 
     (
       <div className="part-card">

          <div className="container">

            <header>
                <h2>Aún no has añadido profesionales a tus favoritos</h2>
            </header>

          </div>
       </div>
      )
    
  }
}

export default MyFavourites
