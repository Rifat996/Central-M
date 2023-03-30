import React from 'react'
import './administratorDashboard.css';
import BackgroundGif from "../imgs/background-gif.gif"

export default function Hero() {
  return (
    <div style={{ marginTop: "90px"}} className="container vw-90">
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1">Dobrodošli u Central-M Servisni Centar</h1>
        <p className="lead">Izvršavajte rezervacije i vodite evidenciju servisa i popravki Vašeg vozila. Sve što je potrebno jeste da se prijavite/napravite račun i možete krenuti sa jednostavnom i efikasnom brigom za Vašim ljubimcem na četiri točka.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
        </div>
      </div>
      <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img className="rounded-lg-3" src={BackgroundGif} alt="" width="720"></img>
      </div>
    </div>
  </div>
    
  )
}
