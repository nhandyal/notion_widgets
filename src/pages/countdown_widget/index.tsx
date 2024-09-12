import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // For Next.js, you can use window.location.search in plain React

const CountdownWidget: React.FC = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  // Function to parse the query parameter for the date
  const getTargetDateFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const dateParam = searchParams.get('date');
    if (dateParam) {
      return new Date(dateParam);
    }
    
    // Default date if none is provided
    return new Date('2024-12-31T23:59:59');
  };

  // Function to calculate the time left
  const calculateTimeLeft = (targetDate: Date) => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

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

  useEffect(() => {
    // Set the target date from the URL on component mount
    const date = getTargetDateFromUrl();
    setTargetDate(date);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!targetDate) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', fontSize: '2rem', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '10px' }}>
      <h2>Countdown to {targetDate.toDateString()}</h2>
      <div>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </div>
    </div>
  );
};

export default CountdownWidget;
