import React from 'react';
import { useState, useEffect } from 'react';
import WhatsAppImg from "../imgs/whatsapp-img.png";
import './administratorDashboard.css';

const WhatsAppButton = () => {
  const phoneNumber = '+38761297225'; // replace with your phone number
  const message = 'Poštovani Central-M uposlenici, imam sljedeće pitanje: '; // replace with your default message
  
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }
  

  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div style={{ maxWidth: "80px", cursor: "pointer" }} onClick={handleClick} className='text-center'>
    <img className={shake ? "shake" : ""} src={WhatsAppImg} alt="whatsappimg"></img><p style={{ color: "#28a945" }}>Upitaj nas</p>
    </div>
  );
}

export default WhatsAppButton;
