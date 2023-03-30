import React, { useState, useEffect } from 'react'
import { Nav } from "react-bootstrap";
import { Link} from 'react-router-dom'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import PDFFile from './PDFFile'
import { PDFDownloadLink } from '@react-pdf/renderer'
import './administratorDashboard.css';
import CentralLogo from "../imgs/central-m-logo.png";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


export default function AdministratorDashboard() {

    const [users, setUsers] = useState([])
    const [comment, setComment] = useState("");
    const [price, setPrice] = useState("");
    const [numToShow, setNumToShow] = useState(5);
    const [incrementBy] = useState(5);
    const [searchPhone, setSearchPhone] = useState("");
    const [searchDate, setSearchDate] = useState("");
    
    const usersCollectionRef = collection(db, "reservations")
    


    useEffect(() => {

        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          setUsers(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id
          })))
        }
        getUsers()
      }, [])

    const updateUser = async (id, comment, price) => {
      const userDoc = doc(db, "reservations", id)
      const newFields = {comment: comment, price: price}
      await updateDoc(userDoc, newFields)
    }
      const handleCommentChange = (event) => {
        setComment(event.target.value);
      };
    
      const handlePriceChange = (event) => {
        setPrice(event.target.value);
      };

  

  return (
    <>

<style>{`
  body {
    background-color: #b0b3b750;
    font-family: 'Roboto Slab', serif;
  }
`}</style>

  
<>
      {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
        <Navbar style={{ borderBottom: "3px solid #28a745", height: "80px" }} fixed='top' key={expand} bg="light" variant="light" expand={expand} className="mb-3 navtop">
          <Container fluid>
            <Navbar.Brand href="#"><img className='logoimg' src={CentralLogo}alt="logoimg"></img></Navbar.Brand>
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Central-M
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                
                <Nav.Link>
                  <input
                    className="form-control mt-3"
                    type="text"
                    placeholder="Traži po broju telefona"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                  />
                  </Nav.Link>
                  <Nav.Link>
                          <input
                    className="form-control mt-3"
                    type="text"
                    placeholder="Traži po datumu"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                  />
                  </Nav.Link>
                  <Link style={{right: "33%"}} to="/login" className="btn btn-outline-secondary mt-4"> Nazad na početnu </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
    
  <div style={{marginTop: "120px", maxWidth: "500px", margin: "120px auto"}} className="user-div">
    {users
      .filter(
        (user) =>
          user.phone &&
          user.phone.toLowerCase().includes(searchPhone.toLowerCase()) &&
          user.date &&
          user.date.toLowerCase().includes(searchDate.toLowerCase())
      )
      .slice(0, numToShow)
      .map((user) => {
        return (
          <div style={{background: "white"}}
            key={user.id}
            className="p-3 mb-3 rounded border border-secondary"
          >
            <div className="row">
              <div className="col-12 col-sm-6">
                <h5 className="text-danger font-weight-bold mb-3">
                  Date: {user.date}
                </h5>
                <h5 className="mb-3">
                  Vehicle: {user.vehicle} - {user.model} ({user.year})
                </h5>
                <h6>kW: {user.kW}</h6>
                <h6>Reason: {user.reason}</h6>
                <h6>Phone: {user.phone}</h6>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor="comment">Comment:</label>
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={comment}
                    onChange={handleCommentChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    onChange={handlePriceChange}
                    className="form-control"
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <PDFDownloadLink
                    document={<PDFFile userData={{ ...user, comment, price }} />}
                    fileName="FORM"
                  >
                    {({ loading }) =>
                      loading ? (
                        <button
                          style={{ color: "white" }}
                          className="btn btn-secondary"
                        >
                          Loading document...
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            updateUser(user.id, comment, price);
                          }}
                          style={{ color: "white" }}
                          className="btn btn-secondary"
                        >
                          Download
                        </button>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          </div>
        );
      })}
  </div>
      
      <button className="btn btn-light w-20 mt-3 mb-3" onClick={() => setNumToShow(numToShow + incrementBy)}>Load more</button>
      </>
  )
}
