  
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthServices from '../services/auth.services'

import HomeCarousel from './HomeCarousel'

class Home extends Component {

  constructor () {
    super()
    this.state = {}
    this.authServices = new AuthServices()
  }

  render () {
    return (
      <div className="home-page">

        <header className="container hero">
          <div className="row ">
              <div className="col-md-3">
                  <img className="home-big-logo" src="../../images/Handy-logo.png" alt="Handy logo"></img>  
              </div>
              <div className="col-md-5">
                  <h1>Conectando personas para la solución de problemas.</h1>
              </div>
          </div>
        </header>

        
        <div className="container">     

          <div className="row justify-content-start">
            <section className="col-sm-3 home-cards">
              
              <header>
                 <h2>Si eres un particular, encuentra al profesional que buscas:</h2>
              </header>

              <div className="access">
                  <Link className="button" to="/particular/login">Accede a tu cuenta</Link>
                  <p>¿Aún no eres usuario?</p>

                  <Link className="button" to="/particular/signup">Sign up</Link>
              </div>

            </section>


            <section className="col-sm-3 home-cards">

                <header>
                    <h2>Si eres un profesional y quieres darte a conocer, este es tu sitio:</h2>
                </header>

                <div className="access">
                    <Link as="div" className="button" to="/professional/login">Accede a tu cuenta</Link>
                    <p>¿Aún no eres usuario?</p>

                    <Link as="div" className="button" to="/professional/signup">Sign up</Link>
                </div>

            </section>
          </div>

        </div>

            <div className="row justify-content-start home-carousel">
               <HomeCarousel></HomeCarousel>
            </div>

      </div>  
    )
  }
}

export default Home


