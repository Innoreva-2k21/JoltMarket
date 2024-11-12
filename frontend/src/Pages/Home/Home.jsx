import { div } from 'framer-motion/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center'}} className='flex flex-col items-center justify-center h-screen gap-4'>
      <div className='w-72'>
      <img src="jolt_logo.png" alt="logo"  className='w-full object-contain object-center'/>
      </div>
      <p className='text-slate-700 font-medium text-lg'>Select an option to get started:</p>
      
      <div className='flex gap-16 mt-5'>
        {/* Buy Button */}
        <button 
          style={{
            padding: '20px 50px',
            fontSize: '20px',
            backgroundColor: '#3b1c80',
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
            padding: '20px 50px',
            fontSize: '20px',
            backgroundColor: '#3b1c80',
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
