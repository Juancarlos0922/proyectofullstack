import React, {Component} from 'react'
import Calendar from 'react-calendar'

import EventsServices from '../services/events.services'

import Modal from 'react-bootstrap/Modal'


class CalendarComp extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: '',
      event: '',
      particularId: '',
      particularName: '',
      particularEmail: '',
      particularPhone: '',
      professionalId: '',
      showModal: false
    }
    this.eventsServices = new EventsServices()

  }

  handleModalOpen = () => this.setState({ showModal: true })
  handleModalClose = () => this.setState({ showModal: false })


  onClickDay = (value) => {

    const year = value.getFullYear()
    const month = value.getMonth()
    const day = value.getDate()+1
    
    let thisDate = new Date(year, month, day)
    let finalDate= thisDate.toUTCString().slice(0,16)
    console.log(thisDate)

    this.setState({date: finalDate}, ()=> console.log(this.state))
  }
  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value })
  

  handleFormSubmit = e => {
    e.preventDefault()

    this.setState({
      professionalId: this.props.profId,
      particularName: this.props.part.username,
      particularPhone: this.props.part.phoneNumber,
      particularEmail: this.props.part.email,
      particularId: this.props.part._id
    }, ()=> {

      const {date, event, particularId, particularName, particularEmail, particularPhone, professionalId} = this.state
     
      this.eventsServices.postEvents({date, event, particularId, particularName, particularEmail, particularPhone, professionalId})
      .then(() => {

        this.setState({      
          date: '',
          event: '',
          particularId: '',
          particularName: '',
          particularEmail: '',
          particularPhone: '',
          professionalId: '',
          showModal: false})
      })
      .catch((err) => console.log(err))
    })
  }

  onChange = () => {
    this.handleModalOpen()
  }
 

  render() {
    return (
      <>
        <Calendar onChange={(e)=>this.onChange(e)} onClickDay={(value) => this.onClickDay(value)}></Calendar>


        <Modal show={this.state.showModal} onHide={this.handleModalClose}>

            <Modal.Header closeButton>
                <Modal.Title>Describe brevemente qué necesitas:</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form className="form-inline" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="input-event"></label>
                    <input className="form-control" type="textarea" name="event" id="input-event" value={this.state.event} onChange={this.handleChangeInput}></input>
                    <button className="submit-btn btn-light event" type="submit" onClick={this.handleModalClose}>Enviar</button>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <p>Enviaremos una notificación por email con tus datos a este profesional para que contacte conigo en el menor plazo posible.</p>
            </Modal.Footer>

        </Modal>
      </>
    )
  }
}

export default CalendarComp