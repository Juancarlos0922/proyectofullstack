import React, {Component} from 'react'

import {Toast} from 'react-bootstrap'

import Star from './Star'
import ProfRating from './ProfRating'

class Card extends Component  {
  constructor (props) {
    super(props)
    this.state = {
      showToast: false 
    }

  }

  handleToastOpen = () => this.setState({ showToast: true })
  handleToastClose = () => this.setState({ showToast: false })


  render() {

    // console.log(this.props.showProfs)

    return(
      <>
        <Toast onClose={this.handleToastClose} show={this.state.showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 9999 }}>
            <Toast.Header>
                <strong className="mr-auto">¡Listo!</strong>
            </Toast.Header>
            <Toast.Body>Acaban de actualizarse tus favoritos</Toast.Body>
        </Toast>

        { 
          this.props.professionals.map(prof => {  
            return (

                <div className="col-md-5 prof-card" key={prof._id}>

                  <div className="row justify-content-around prof-card-content">

                      <div className="col-sm-4">
                        
                          <img width="100%" src={prof.imageUrl} alt={prof.username}></img>
                           
                            <div className="favourite-star">
                                <Star showToast={this.handleToastOpen} prof={prof._id} part={this.props.part} setUser={this.props.setUser}></Star>
                            </div>
                            
                             <ProfRating prof={prof._id} rating={prof.rating} part={this.props.part} showProfs={this.props.showProfs}/> 
                      </div>

                      <div className="col-sm-6">
                          <h5>Mi nombre es {prof.username}</h5>
                          <p>Mi dedico a {prof.job}</p>
                          <p>'{prof.description}'</p>
                          <p>Trabajo en la provincia de {prof.localities}</p>
                          <button className="btn-light" value={prof._id} onClick={this.props.openModal}>Solicita presupuesto</button>
                      </div>
                  </div>

                </div>
            )
          })
        }
      </>
    )  
  }


}

export default Card