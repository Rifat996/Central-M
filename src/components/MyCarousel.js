import React from 'react'
import './administratorDashboard.css';
import { Carousel } from 'react-bootstrap';
import servis1 from "../imgs/autoservis11.jpg";
import servis2 from "../imgs/autoservis2.jpg";
import servis3 from "../imgs/autoservis33.jpg";




export default function MyCarousel() {



  
  return (
    <div>
      <Carousel className='carousel' style={{ marginTop: "20px"}}>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={servis1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={servis2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image"
          src={servis3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>


    </div>
  )
}
