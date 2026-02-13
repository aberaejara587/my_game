import { useState, useEffect } from 'react'

function App() {
  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(100)
  const [perClick, setPerClick] = useState(1) 
  const [autoIncome, setAutoIncome] = useState(0)
  const [view, setView] = useState('game') // 'game', 'task', 'invite', 'withdraw'

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, [])

  // Energy & Auto-Income Logic
  useEffect(() => {
    const interval = setInterval(() => setEnergy((prev) => Math.min(prev + 1, 100)), 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (autoIncome > 0) {
      const interval = setInterval(() => setCoins((prev) => prev + autoIncome), 1000);
      return () => clearInterval(interval);
    }
  }, [autoIncome]);

  const handleClick = () => {
    if (energy >= perClick) {
      setCoins(coins + perClick);
      setEnergy(energy - perClick);
    }
  };

  // UI Components
  const MainGame = () => (
    <>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '3rem', color: 'gold', margin: '0' }}>💰 {coins}</h1>
        <p style={{ color: '#4caf50' }}>+ {autoIncome}/sec</p>
      </div>
      <img src="https://cryptologos.cc/logos/toncoin-ton-logo.png" onClick={handleClick} style={coinStyle} />
      <div style={{ marginTop: '20px', width: '80%' }}>
        <span>⚡ {energy} / 100</span>
        <div style={energyBase}><div style={{...energyFill, width: `${energy}%`}}></div></div>
      </div>
    </>
  );

  const TaskView = () => (
    <div style={contentPage}>
      <h2>📋 Tasks</h2>
      <div style={cardStyle} onClick={() => {setCoins(coins + 1000); alert("1000 Coins earned!")}}>
        Join Telegram Channel (+1000 💰)
      </div>
      <div style={cardStyle} onClick={() => {setCoins(coins + 500); alert("500 Coins earned!")}}>
        Follow on X (+500 💰)
      </div>
    </div>
  );

  const InviteView = () => (
    <div style={contentPage}>
      <h2>👥 Invite Friends</h2>
      <p>Invite friends and get 10% of their earnings!</p>
      <button style={btnStyle} onClick={() => alert("Link Copied!")}>Copy Invite Link</button>
    </div>
  );

  const WithdrawView = () => (
    <div style={contentPage}>
      <h2>💸 Withdraw</h2>
      <p>Minimum: 1,000,000 Coins</p>
      <input type="text" placeholder="Enter TON Wallet Address" style={inputStyle} />
      <button style={btnStyle} onClick={() => alert("Insufficient balance!")}>Withdraw Now</button>
    </div>
  );

  return (
    <div style={containerStyle}>
      {view === 'game' && <MainGame />}
      {view === 'task' && <TaskView />}
      {view === 'invite' && <InviteView />}
      {view === 'withdraw' && <WithdrawView />}

      {/* Navigation Bar */}
      <div style={navBar}>
        <button onClick={() => setView('game')} style={navBtn}>🎮 Tap</button>
        <button onClick={() => setView('task')} style={navBtn}>📋 Tasks</button>
        <button onClick={() => setView('invite')} style={navBtn}>👥 Friends</button>
        <button onClick={() => setView('withdraw')} style={navBtn}>💰 Payout</button>
      </div>
    </div>
  );
}

// Styles
const containerStyle = { textAlign: 'center', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: '0', left: '0' };
const coinStyle = { width: '180px', cursor: 'pointer', borderRadius: '50%', boxShadow: '0 0 30px gold' };
const energyBase = { width: '100%', height: '10px', backgroundColor: '#333', borderRadius: '5px', marginTop: '5px' };
const energyFill = { height: '100%', backgroundColor: '#ffeb3b', borderRadius: '5px', transition: 'width 0.3s' };
const navBar = { position: 'fixed', bottom: '0', width: '100%', display: 'flex', justifyContent: 'space-around', backgroundColor: '#222', padding: '15px 0', borderTop: '1px solid #444' };
const navBtn = { background: 'none', border: 'none', color: 'white', fontSize: '0.9rem', cursor: 'pointer' };
const contentPage = { padding: '20px', width: '100%' };
const cardStyle = { backgroundColor: '#333', padding: '15px', borderRadius: '10px', margin: '10px', border: '1px solid gold' };
const btnStyle = { backgroundColor: 'gold', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '10px', fontWeight: 'bold' };
const inputStyle = { padding: '10px', width: '80%', borderRadius: '5px', marginBottom: '10px' };

export default App;