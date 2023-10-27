import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import AuthServices from '../../services/auth.services'

class PartHomePage extends Component {

  constructor({props}){
    super(props)
    this.state = {}
    this.authServices = new AuthServices()

  }

  
  logout = () => {
    this.authServices.logout()
    .then(x => {
      this.props.setUser(null)
        })
        .catch(err => console.log(err))
  }


  render() {

    return(
      <div className="part-home-page">

        <div className="container">
          <header>
            <h2>Encuentra lo que necesitas:</h2>
          </header>
          <section className="section">

              <div className="row justify-content-around">

                  <div className="col-md-5 section-card one">
                    <Link to="/search/hogar"><img src="../../../images/home.png" alt="home"></img></Link>
                  </div>
                  <div className="col-md-5 section-card one">
                    <Link to="/search/salud"><img src="../../../images/health.png" alt="salud y belleza"></img></Link>
                  </div>
                  
              </div>

              <div className="row justify-content-around">

                  <div className="col-md-5 section-card two">
                    <Link to="/search/eventos"><img src="../../../images/event.png" alt="eventos"></img></Link>
                  </div>

                  <div className="col-md-5 section-card two">
                    <Link to="/search/cultura"><img src="../../../images/theatre.png" alt="cultura y ocio"></img></Link>
                  </div>

              </div>
              
              
          </section>
        </div>
      </div>
    )
  }

}

export default PartHomePage