import React from 'react'
import { query, where, collection, getDocs } from "firebase/firestore"
import { db } from '../firebase'
import { useEffect, useState } from "react"
import { useAuth } from '../contexts/AuthContext'

export default function vehicleHistory() {

    const [reservations, setReservations] = useState([]);
    
  const { currentUser } = useAuth()


    useEffect(() => {
        const reservationsCollectionRef = collection(db, 'reservations');
        const reservationsQuery = query(
          reservationsCollectionRef,
          where('email', '==', currentUser.email)
        );
        const fetchReservations = async () => {
          const reservationsSnapshot = await getDocs(reservationsQuery);
          const reservationsData = reservationsSnapshot.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id; // add a unique identifier to each reservation object
            return data;
          });
          setReservations(reservationsData);
        };
        fetchReservations();
      }, [currentUser.email]);


  return (
    
    <div style={{ maxWidth: "500px" }} className="container ">
  {reservations.map((reservation) => (
    <div className="card my-3 rounded-3 border shadow-lg" key={reservation.id}>
      <div className="card-body">
        <h5 className="card-title">{reservation.vehicle} {reservation.model} {reservation.year} {reservation.kW} kW</h5>
        <p className="card-subtitle mb-2 text-danger">{reservation.date}</p>
        <p className="card-text">{reservation.reason}</p>
        <p className="card-text">{reservation.comment}</p>
        <p className="card-text">Price: {reservation.price}</p>
      </div>
    </div>
  ))}
</div>
  )
}
