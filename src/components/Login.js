import React , { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CentralLogo from "../imgs/central-m-logo.png";
import CentralOnly from "../imgs/centralm-only-logo.png"
import CalendarImg from "../imgs/calendar-img.png";
import HistoryImg from "../imgs/history-img.png";
import OffersImg from "../imgs/offers-img.png";
import LoginImg from "../imgs/login-img.png"
import Modal from 'react-bootstrap/Modal';
import Cards from './Cards';
import MyCarousel from './MyCarousel';
import Features from './Features';
import './administratorDashboard.css';
import BackgroundGif from "../imgs/background-gif.gif"
import Offers from './Offers';
import WhatsAppButton from './WhatsAppChat';
import FbImg from "../imgs/facebook-img.png"





export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } =  useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const [show, setShow] = useState(false);
    /*const [fullscreen] = useState(true);*/

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [shake, setShake] = useState(false);

    const handleShake = () => {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
    };

    async function handleSubmit(e) {
        e.preventDefault()
      try {
          setError("")
          setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/')
          } catch {
          setError("Failed to log in")
          }

            setLoading(false) 
          }
    return (
   
      
      <>
        <style>{`
          body {
            font-family: 'Roboto Slab', serif;
            background-color: #b0b3b750;
          }
        `}</style>

      
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
                <Nav.Link className={`iconimg ${shake ? 'shake' : ''}`} variant="primary" onClick={handleShow}><img  src={LoginImg} alt="loginimg"></img> PRIJAVA
                </Nav.Link>
                <Nav.Link onClick={handleShake}><img className='iconimg' src={CalendarImg} alt="calendarimg"></img> REZERVIŠI TERMIN</Nav.Link>
                <Nav.Link onClick={handleShake}><img className='iconimg' src={HistoryImg} alt="historyimg"></img> MOJE VOZILO</Nav.Link>
                <Nav.Link><img className='iconimg' src={OffersImg} alt="offersimg"></img> AKTUELNE PONUDE</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <div style={{ position: "fixed", bottom: "10px", right: "30px", zIndex: "999" }}>
      <WhatsAppButton/>
      </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{border: "none"}} closeButton></Modal.Header>
      <Card style={{border: "none"}}>
        <Card.Body>
        <Modal.Title><h2 className='text-center mb-4'>PRIJAVA</h2></Modal.Title>
            
            {error && <Alert variant='danger'>{error}</Alert>}
            <Modal.Body style={{maxWidth: "400px", margin: "0 auto"}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email' ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Šifra:</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-4' type='submit'>Prijavi se</Button>
            </Form>
            </Modal.Body>
            <div className='w-100 text-center mt-3'>
                <Link to="/forgot-password">Zaboravili ste lozinku?</Link>
            </div>
        </Card.Body>
        <div className='w-100 text-center mt-2'>
        Trebate račun? <Link to="/signup">Napravi račun</Link>
      </div>
        <div className='w-100 text-center mt-5'>
        <Link to="/administratorlogin">Prijavi se</Link> kao Administrator
        </div>  
        
      </Card>
      <Modal.Footer style={{border: "none"}}>
      <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          </Modal.Footer>
      </Modal>
    
      <div style={{ marginTop: "90px"}} className="container vw-90">
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1">Dobrodošli u Central-M Servisni Centar</h1>
        <p className="lead">Rezervišite termin u našem servisu i vodite evidenciju svih promjena na Vašem vozilu. Sve što je potrebno jeste da se <strong>prijavite/napravite račun</strong> i možete krenuti sa jednostavnom i efikasnom brigom za Vašim ljubimcem na četiri točka.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <button onClick={handleShow} type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Prijavi se</button>
        </div>
      </div>
      <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img className="rounded-lg-3" src={BackgroundGif} alt="" width="720"></img>
      </div>
    </div>
  </div>


      <Cards />


      <MyCarousel />

      <Features />

      <Offers />

      

      <footer className="text-center" style={{backgroundColor: "#b0b3b750", position: "absolute", left: "0", right: "0"}}>
        <div className="container p-4 pb-0">
        
          <section>
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Napravi rezervaciju</span>
              <button onClick={handleShow} type="button" className="btn btn-success btn-rounded">
                Prijava
              </button>
            </p>
          </section>
          
        </div>
        <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2"}}>
        <a href='https://www.facebook.com/profile.php?id=100087568357765' target="_blank" rel="noopener noreferrer">
        <img src={FbImg} alt="fbimg"></img>
        </a>
             © 2023 Copyright: Central-M Zenica
        </div>
      </footer>
    </>
    
  )
}
