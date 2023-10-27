import React, {Component} from 'react'

import EventsServices from '../../services/events.services'

class Agenda extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: []
    }
    this.eventsServices = new EventsServices()
    
  }
  

  componentDidMount() {
    this.eventsServices.getProfEvents(this.props.profId)
    .then(response => {
      this.setState({ events: response.data })
    })
    .catch(err => console.log(err))
  }


  render() {
  
    return (
      <div className="agenda">
      {
        this.state.events.reverse().map(elm => {
          return (
            <article key={elm._id}>
              <div>
                  <header className="main">
                      <p>Fecha:</p>
                  </header>
                  <body>
                      <p>{elm.date}</p>
                  </body>
              </div>

              <div>
                  <header>
                      <p>Solicitante:</p>
                  </header>
                  <body>
                      <p>{elm.particularName}</p>
                  </body>
              </div>

              <div>
                  <header>
                      <p>Teléfono de contacto:</p>
                  </header>
                  <body>
                      <p>{elm.particularPhone}</p>
                  </body>
              </div>

              <div>
                  <header>
                      <p>Datos del trabajo solicitado:</p>
                  </header>
                  <body>
                      <p>{elm.event}</p>
                  </body>
              </div>

          </article> 
            
            )
        })
      }
      </div>
    )
  }

}
export default Agenda