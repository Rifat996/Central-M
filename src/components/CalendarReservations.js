import React, { useState } from 'react'
import Calendar from 'react-calendar';
import { useAuth } from '../contexts/AuthContext'
import 'react-calendar/dist/Calendar.css';
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import './CalendarReservations.css'
import moment from 'moment';


export default function CalendarWithReservations() {
    const [selectedDate, setSelectedDate] = useState(null);
    const { currentUser } = useAuth();
    const [newVehicleName, setNewVehicleName] = useState("")
    const [newVehicleYear, setNewVehicleYear] = useState(0)
    const [newVehicleModel, setNewVehicleModel] = useState("")
    const [newVehiclekW, setNewVehiclekW] = useState(0)
    const [newVehicleReason, setNewVehicleReason] = useState("")
    const [newPhoneNumber, setNewPhoneNumber] = useState("")
  

    const usersCollectionRef = collection(db, "reservations");
  
  
    async function handleDateClick(date) {
      const utcDate = moment(date).format('YYYY-MM-DD');
      const reservationsQuery = query(usersCollectionRef, where('date', '==', utcDate));
      const reservationsSnapshot = await getDocs(reservationsQuery);
      const numReservations = reservationsSnapshot.size;
  
      if (numReservations >= 5) {
        alert('Sorry, the maximum number of reservations for this day has been reached.');
        return;
      }
  
      setSelectedDate(date);
    }
    
    const createReservation = async () => {
      const localDate = moment(selectedDate).format('YYYY-MM-DD');
      await addDoc(usersCollectionRef, {
        vehicle: newVehicleName,
        year: newVehicleYear,
        model: newVehicleModel,
        kW: newVehiclekW,
        reason: newVehicleReason,
        date: localDate,
        phone: newPhoneNumber,
        comment: '',
        price: '',
        email: currentUser.email,
      });

      const confirmationMessage = `Your reservation for ${moment(localDate).format('MMMM Do, YYYY')} has been made. It's a pleasure to work with you, Yours, Central-M.`;
    if (window.confirm(confirmationMessage)) {
    }
  };
    

    return (
      <div>
        <div>
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-0 align-items-center rounded-3 border shadow-lg">
        <div style={{margin: "0 auto"}} className="col-lg-6">
            <Calendar className={"calendar-wrapper"} onClickDay={handleDateClick} minDate={new Date()} tileDisabled={({date}) => {
              return date.getDay() === 6 || date.getDay() === 0;
              }}/>
          </div>
          <div className="col-lg-4">
          <strong>Rezervacija na dan: <p style={{color: "blue"}}>{selectedDate && moment(selectedDate).format('Do MMMM, YYYY')}</p></strong>
          
          <h4 style={{color: "#28a745"}}>{currentUser.email}</h4>
          <label>Marka vozila: </label>
          <input placeholder='vehicle name' onChange={(event) => {
            setNewVehicleName(event.target.value);
          }}></input>
          
          <label>Model vozila: </label>
          <input placeholder='vehicle model' onChange={(event) => {
            setNewVehicleModel(event.target.value);
          }}></input>

          <label>Godište: </label>
          <input type="number" placeholder='vehicle year' onChange={(event) => {
            setNewVehicleYear(event.target.value);
          }}></input>

          <label>Kilovati: </label>
          <input type="number" placeholder='vehicle kW' onChange={(event) => {
            setNewVehiclekW(event.target.value);
          }}></input>
          <label>Svrha rezervacije: </label>
          <select onChange={(event) => {
            setNewVehicleReason(event.target.value);
            }}>
              
              <option value="vehicle service">Servis vozila</option>
              <option value="vehicle repair">Popravka vozila</option>
              <option value="vehicle inspection">Pregled vozila</option>
          </select>

          <label>Broj telefona: </label>
          <input placeholder='uključujući +387' onChange={(event) => {
            setNewPhoneNumber(event.target.value);
          }}></input>

          <button className='btn1 mb-2' onClick={createReservation} type="submit">Napravi Rezervaciju</button>
        
          </div>
        </div>
      </div>
    </div>
    );
  }
