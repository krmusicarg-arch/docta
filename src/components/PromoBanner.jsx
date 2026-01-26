import React, { useState, useEffect, useRef } from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const bannerRef = useRef(null); // Ref for the banner container

  const calculateTimeLeft = () => {
    const eventDate = new Date('2026-01-30T21:00:00');
    const difference = +eventDate - +new Date();
    let newTimeLeft = {};

    if (difference > 0) {
      newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return newTimeLeft;
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Measure banner height and set CSS variable
  useEffect(() => {
    const updateBannerHeight = () => {
      if (bannerRef.current) {
        document.documentElement.style.setProperty(
          '--actual-promo-banner-height',
          `${bannerRef.current.offsetHeight}px`
        );
      }
    };

    updateBannerHeight(); // Set height on mount
    window.addEventListener('resize', updateBannerHeight); // Update on resize

    return () => {
      window.removeEventListener('resize', updateBannerHeight); // Clean up
      document.documentElement.style.removeProperty('--actual-promo-banner-height'); // Clean up CSS variable
    };
  }, []);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval] === undefined || timeLeft[interval] < 0) {
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
    <div className="promo-banner-container" ref={bannerRef}>
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
