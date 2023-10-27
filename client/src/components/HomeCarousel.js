import React from 'react'

import Carousel from 'react-bootstrap/Carousel'

const HomeCarousel = () => {

  return (

    <Carousel
      className="col-md-6"
      controls={false}
      fade={false}
      indicators={false}
    >
        <Carousel.Item className="carousel-item">
            <Carousel.Caption className="carousel-text">
              <h5 >"Si quieres llegar rápido, camina solo. Si quieres llegar lejos, camina en grupo."</h5>
              <p>Proverbio africano</p>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carousel-item">
            <Carousel.Caption>
              <h5>"El pensamiento es la semilla de la acción."</h5>
              <p>Emerson</p>
            </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item className="carousel-item">
            <Carousel.Caption >
              <h5>"La comunicación humana es la clave del éxito personal y profesional."</h5>
              <p>Paul J. Meyer.</p>
            </Carousel.Caption>
        </Carousel.Item>

    </Carousel>
  )
}

export default HomeCarousel