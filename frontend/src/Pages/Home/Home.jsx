import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to My eCommerce Store</h1>
      <p>Select an option to get started:</p>
      
      <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
        {/* Buy Button */}
        <button 
          style={{
            padding: '20px 40px',
            fontSize: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            animation: 'bounce 2s infinite',
            transition: 'transform 0.3s'
          }}
          onClick={() => navigate('/Byer')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Buy
        </button>

        {/* Sell Button */}
        <button 
          style={{
            padding: '20px 40px',
            fontSize: '20px',
            backgroundColor: '#FF5733',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            animation: 'bounce 2s infinite',
            transition: 'transform 0.3s'
          }}
          // Add onClick event to navigate to a sell page if needed
          onClick={() => navigate('/Seller')}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Sell
        </button>
      </div>

      {/* Keyframe animation for bouncing effect */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
