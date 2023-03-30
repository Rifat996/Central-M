import React from 'react'
import CarJack from "../imgs/carfix-img.jpg"
import CentralOnly from "../imgs/centralm-only-logo.png"
import CheckEngine from "../imgs/checkengine-img.gif";
import CarElectric from "../imgs/carelectric-img.jpg";



export default function Cards() {
  return (
    <div>
      
      <div className="container px-4 py-5" id="custom-cards">
    <h2 className="pb-1 border-bottom">Naše usluge</h2>

    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
      <div className="col">
        <div className="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg" style={{ backgroundImage: `url(${CarJack})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="d-flex flex-column h-100 p-4 pb-3 text-white text-shadow-1">
            <h2 style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)" }} className="pt-5 mb-5 display-6 lh-1 fw-bold">Mehanika</h2>
            <ul className="d-flex list-unstyled mt-auto">
              <li className="me-auto">
                <img src={CentralOnly} alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"></img>
              </li>
              <li className="d-flex align-items-center me-3">
                <svg className="bi me-2" width="1em" height="1em"></svg>
                <small>Central-M</small>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg" style={{ backgroundImage: `url(${CheckEngine})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="d-flex flex-column h-100 p-4 pb-3 text-white text-shadow-1">
            <h2 style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)" }} className="pt-5 mb-5 display-6 lh-1 fw-bold">Servis</h2>
            <ul className="d-flex list-unstyled mt-auto">
              <li className="me-auto">
                <img src={CentralOnly} alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"></img>
              </li>
              <li className="d-flex align-items-center me-3">
                <svg className="bi me-2" width="1em" height="1em"></svg>
                <small>Central-M</small>
              </li>
              
            </ul>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: `url(${CarElectric})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="d-flex flex-column h-100 p-4 pb-3 text-white text-shadow-1">
            <h2 style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)" }} className="pt-5 mb-5 display-6 lh-1 fw-bold">Elektronika</h2>
            <ul className="d-flex list-unstyled mt-auto">
              <li className="me-auto">
                <img src={CentralOnly} alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white"></img>
              </li>
              <li className="d-flex align-items-center me-3">
                <svg className="bi me-2" width="1em" height="1em"></svg>
                <small>Central-M</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>


    </div>
  )
}
