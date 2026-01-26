import React, { useState, useEffect } from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  const calculateTimeLeft = () => {
    const eventDate = new Date('2026-01-30T21:00:00');
    const difference = +eventDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]}
        {interval.charAt(0)}{' '}
      </span>
    );
  });

  return (
    <div className="promo-banner-container">
      <div className="promo-banner">
        <div className="promo-text">
          <p>🔥 ESTE VIERNES EN VIVO 🔥</p>
          <p className="promo-details">
            Docta Boss | 30 de Enero | Cordoba | Santa Calma
          </p>
        </div>
        <div className="promo-countdown">
          {timerComponents.length ? timerComponents : <span>Este viernes!</span>}
        </div>
        <a
          href="http://wa.me/+5493518522222"
          target="_blank"
          rel="noopener noreferrer"
          className="promo-button"
        >
          QUIERO IR
        </a>
      </div>
    </div>
  );
};

export default PromoBanner;
