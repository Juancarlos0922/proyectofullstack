import React, {Component} from 'react'

import {Toast} from 'react-bootstrap'

import PartServices from '../../services/part.services'

import Star from './Star'
import ProfRating from './ProfRating'

class FCard extends Component  {
  constructor (props) {
    super(props)
    this.state = {
      prof: {},
      showToast: false 
    }
    this.partServices = new PartServices()

  }


  componentDidMount() {
    this.partServices.getOneProfessional(this.props.prof)
    .then(response => {
      console.log(response.data)
      this.setState({prof: response.data})
  
  })
    .catch(err => console.log('err', err))
  }

  

  handleToastOpen = () => this.setState({ showToast: true })
  handleToastClose = () => this.setState({ showToast: false })

  render() {
    console.log(this.props)

    return(
      <>
        <Toast onClose={this.handleToastClose} show={this.state.showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 9999 }}>
            <Toast.Header>
                <strong className="mr-auto">Listo!</strong>
            </Toast.Header>
            <Toast.Body>Acaban de actualizarse tus favoritos</Toast.Body>
        </Toast>


          <div className="row justify-content-around prof-card-content">

              <div className="col-sm-4">

                  <img width="100%" src={this.state.prof.imageUrl} alt={this.state.prof.username}></img>
                     
                      <div className="favourite-star">
                         {this.state.prof._id && <Star showToast={this.handleToastOpen} prof={this.state.prof._id} part={this.props.part} setUser={this.props.setUser} ></Star>}
                      </div>

                      {this.state.prof._id && <ProfRating prof={this.state.prof._id} rating={this.state.prof.rating} part={this.props.part} showProfs={this.props.showProfs}/>}
              
              </div>

              <div className="col-sm-6">
                  <h5>Mi nombre es {this.state.prof.username}</h5>
                  <p>Mi dedico a {this.state.prof.job}</p>
                  <p>'{this.state.prof.description}'</p>
                  <p>Trabajo en la provincia de {this.state.prof.localities}</p>
                  <button className="btn-light" value={this.state.prof._id} onClick={this.props.openModal}>Solicita presupuesto</button>
              </div>
          </div>        
        
      </>
    )  
  }


}

export default FCard