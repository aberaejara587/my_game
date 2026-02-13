import { useState, useEffect } from 'react'

function App() {
  const [coins, setCoins] = useState(0)

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, [])

  return (
    <div style={{
      textAlign: 'center', backgroundColor: '#1a1a1a', color: 'white',
      height: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', color: 'gold' }}>💰 {coins}</h1>
      <img 
        src="https://cryptologos.cc/logos/toncoin-ton-logo.png" 
        onClick={() => setCoins(coins + 1)}
        style={{ width: '200px', cursor: 'pointer', borderRadius: '50%', boxShadow: '0 0 30px gold' }} 
      />
      <p style={{ marginTop: '20px' }}>Kooinii walitti qabuuf fakkii tuqi!</p>
    </div>
  )
}
export default App
