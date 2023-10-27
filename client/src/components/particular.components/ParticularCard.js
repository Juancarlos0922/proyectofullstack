import React, { Component } from 'react'

import Card from './Card'

import Modal from 'react-bootstrap/Modal'

import PartServices from '../../services/part.services'
import CalendarComp from '../CalendarComp'



class ParticularCard extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      professionals: [],
      origin: [],
      showModal: false,
      localities: '',
      description: '',
      professionalId: ''
      }
    this.partServices = new PartServices()
  }

  componentDidMount() {
    this.showProfessionals()
  }
  
  showProfessionals() {
    this.partServices.getProfessionals(this.props.match.params.job)
        .then(response => this.setState({ professionals: response.data, origin: response.data }))
        .catch(err => console.log('err', err))
  }

  handleModalOpen = (e) => this.setState({ showModal: true, professionalId: e.target.value })
  handleModalClose = () => this.setState({ showModal: false, professionalId: '' })


  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })


  handleFormSubmit = e => {
    e.preventDefault()

    const {localities} = this.state
    const job = this.props.match.params.job

    this.partServices.getLocalProfessionals (job, localities)
    .then(response => this.setState({ professionals: response.data }))
    .catch((err) => console.log('error al mandar la búsqueda al back', err.response.data.message))
  }

  handleSearchInput = e => {
    this.setState({ [e.target.name]: e.target.value })
    this.searchDescription(this.state.description)
    this.setState({ [e.target.name]: e.target.value })
  }


  searchDescription = (word) => {
    console.log(word)
    let results = []
    this.state.professionals.find(elm => {
      console.log(elm)
      if (elm.description.toLowerCase().includes(word.toLowerCase())) {
        results.push(elm)
        console.log(results)
      }
      this.setState({professionals: results})
    })
  }

  clearAll = () => this.setState({professionals: this.state.origin})

  render() {
  
    return (
      <div className="part-card">

          <div className="container"> 

            <div className="row justify-content-around search">

                <div className="col-md-5">
                    <form className="form-inline" onSubmit={this.handleFormSubmit}>   
                        <label className="label" htmlFor="input-localities">Filtra por provincia: </label>
                        <select className="form-control form-control-sm localities" name="localities" id="input-localities" selected={this.state.localities} onChange={this.handleChangeInput}>
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
                        <button className="submit-btn btn-light ver" type="submit">Ver</button>
                    </form>
                </div>

                <div className="col-md-4">
                    <form className="form-inline">
                        <label className="label" htmlFor="input-openSearch">Afina tu búsqueda: </label>
                        <input className="form-control form-control-sm" type="text" name="description" id="input-openSearch" value={this.state.description} onChange={this.handleSearchInput}></input>
                    </form>
                </div>

                <div className="col-md-3">
                  <button onClick={this.clearAll} className="submit-btn btn-light" type="submit">Refrescar las búsquedas</button>
                </div>
            </div>
              

              <div className="row justify-content-around card-rows">

              
                  <Card openModal={this.handleModalOpen} closeModal={this.handleModalClose} professionals={this.state.professionals} part={this.props.user.data} setUser={this.props.setUser} showProfs={this.showProfessionals}/>


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
          </div>
      </div>
    )
  }
}

export default ParticularCard
