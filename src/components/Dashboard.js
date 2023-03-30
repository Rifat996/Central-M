import React, { useState} from 'react'
import { Alert, Button, ModalBody } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CalendarWithReservations from './CalendarReservations'
import CentralLogo from "../imgs/central-m-logo.png";
import CentralOnly from "../imgs/centralm-only-logo.png"
import CalendarImg from "../imgs/calendar-img.png";
import HistoryImg from "../imgs/history-img.png";
import LogOutImg from "../imgs/log-out-img.png";
import OffersImg from "../imgs/offers-img.png";
import UpdateProfileImg from "../imgs/update-profile-img.png";
import AccountImg from "../imgs/account-img.png"
import VehicleHistory from "./VehicleHistory"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Hero from './Hero';
import Cards from './Cards';
import MyCarousel from './MyCarousel';
import Features from './Features';
import Modal from 'react-bootstrap/Modal';
import Offers from './Offers';
import WhatsAppButton from './WhatsAppChat';
import FbImg from "../imgs/facebook-img.png"


export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [fullscreen] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowCalendar = () => setShowCalendar(true);
  const handleCloseCalendar = () => setShowCalendar(false);
 


  async function handleLogout() {
    setError("")
 
    try {
      await logout()
      navigate('/login')

    } catch {
      setError("Failed to log out")
    }
  }


 


  return (
    <>
  <style>{`
  body {
    background-color: #b0b3b750;
    font-family: 'Roboto Slab', serif;
  }
`}</style>
    
    
    <>
    {[false, 'sm', 'md', 'lg'].map((expand) => (
        <Navbar style={{ borderBottom: "3px solid #28a745", height: "70px" }} fixed='top' key={expand} bg="light" variant="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#"><img src={CentralLogo} style={{width: "200px"}} alt="logoimg"></img></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}><img className='iconimg' src={CentralOnly} alt="onlylogo"></img>  CENTRAL-M
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link><img className='iconimg' src={AccountImg} alt="accountimg"></img>
                {error && <Alert variant='danger'>{error}</Alert>}
                <strong style={{color: "#28a745"}}> Email: {currentUser.email}</strong>
                </Nav.Link>
                <Nav.Link onClick={handleShowCalendar}><img className='iconimg' src={CalendarImg} alt="calendarimg"></img> REZERVIŠI TERMIN</Nav.Link>
                <Nav.Link onClick={handleShow}><img className='iconimg' src={HistoryImg} alt="historyimg"></img> MOJE VOZILO</Nav.Link>
                <Nav.Link><img className='iconimg' src={OffersImg} alt="offersimg"></img> AKTUELNE PONUDE</Nav.Link>
                
                <Nav.Link onClick={handleLogout}><img style={{marginLeft: "3px"}} className='iconimg3' src={LogOutImg} alt="logoutimg"></img> ODJAVI SE 
                </Nav.Link>
                
                <Link style={{color: "#596161", textDecoration: "none"}} className='mt-2' to="/update-profile"><img className='iconimg2' src={UpdateProfileImg} alt="updateprofileimg"></img> AŽURIRAJ PROFIL</Link>
  
                
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      <div style={{ position: "fixed", bottom: "10px", right: "30px", zIndex: "999" }}>
        <WhatsAppButton/>
      </div>

      <Modal fullscreen={fullscreen} show={show} onHide={handleClose}>
        <Modal.Header closeButton><p style={{ margin: "0 auto"}}>SERVISNA HISTORIJA VOZILA ZA: <strong style={{color: "#28a745"}}>{currentUser.email}</strong></p></Modal.Header>
        <ModalBody>
        <VehicleHistory />
        </ModalBody>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>


      <Modal fullscreen={fullscreen} show={showCalendar} onHide={handleCloseCalendar}>
        <Modal.Header closeButton>IZABERITE DATUM REZERVACIJE</Modal.Header>
        
        <ModalBody>
        <CalendarWithReservations />
        </ModalBody>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCalendar}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>

    
      <Hero />

      <Cards />

      <MyCarousel />

      <Features />

      <Offers />


      <footer className="text-center" style={{backgroundColor: "#b0b3b750", position: "absolute", left: "0", right: "0"}}>
        <div className="container p-4 pb-0">
        
          <section>
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Napravi rezervaciju: </span>
              <button onClick={handleShowCalendar} type="button" className="btn btn-success btn-rounded">
                Rezervacija
              </button>
            </p>
          </section>
          
        </div>
        <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2"}}>
        <a href='https://www.facebook.com/profile.php?id=100087568357765'>
        <img src={FbImg} alt="fbimg"></img>
        </a>
            © 2023 Copyright: Central-M Zenica
        </div>
      </footer>
    </>
    </>
  )
}
