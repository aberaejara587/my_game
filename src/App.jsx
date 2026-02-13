import { useState, useEffect } from 'react'

function App() {
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [perClick, setPerClick] = useState(1) // Tuqaa tokkoon kooinii argamu
  const [autoIncome, setAutoIncome] = useState(0) // Ofumaan kooinii dabalamaa deemu

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, [])

  // 1. Humna (Energy) deebisanii guutuuf (Daqiiqaa 1.5 keessatti +1)
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(prev + 1, 100));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // 2. Auto-clicker kooinii akka dabaluuf (Sekondii hunda)
  useEffect(() => {
    if (autoIncome > 0) {
      const interval = setInterval(() => {
        setCoins((prev) => prev + autoIncome);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoIncome]);

  const handleClick = () => {
    if (energy >= perClick) {
      setCoins(coins + perClick);
      setEnergy(energy - perClick);
    }
  };

  const buyUpgrade = () => {
    if (coins >= 100) {
      setCoins(coins - 100);
      setPerClick(perClick + 1);
    }
  };

  const buyBot = () => {
    if (coins >= 500) {
      setCoins(coins - 500);
      setAutoIncome(autoIncome + 1);
    }
  };

  return (
    <div style={{
      textAlign: 'center', backgroundColor: '#1a1a1a', color: 'white',
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center