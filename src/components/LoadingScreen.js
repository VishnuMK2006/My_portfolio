import React from 'react';
import ben10 from './logo/ben10.svg';

const LoadingScreen = () => {
  return React.createElement(
    'div',
    {
      className: 'fixed inset-0 bg-black flex items-center justify-center z-50',
      style: {
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)'
      }
    },
    React.createElement(
      'div',
      { className: 'text-center' },
      React.createElement(
        'div',
        {
          className: 'omnitrix-loader mb-8 mx-auto relative',
          style: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            animation: 'spin 1.5s linear infinite, glow 2s ease-in-out infinite alternate',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '6px solid #00FF41',
            borderTopColor: 'transparent',
          }
        },
        React.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              width: '70%',
              height: '70%',
              animation: 'spin-reverse 1.5s linear infinite', // Counter-rotation
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          },
          React.createElement('img', {
            src: ben10,
            alt: 'Ben 10',
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none'
            }
          })
        )
      ),
      React.createElement(
        'h2',
        {
          className: 'text-2xl font-bold text-white mb-2',
          style: { fontFamily: 'Orbitron, monospace' }
        },
        'ULTIMATE FORM -> DESKTOP MODE!...'
      ),
      React.createElement(
        'div',
        {
          className: 'loading-bar mx-auto',
          style: {
            width: '200px',
            height: '4px',
            backgroundColor: '#333',
            borderRadius: '2px',
            overflow: 'hidden'
          }
        },
        React.createElement(
          'div',
          {
            className: 'loading-progress',
            style: {
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, #00FF41, #00CC33)',
              animation: 'loading 4s ease-in-out infinite'
            }
          }
        )
      )
    ),
    React.createElement(
      'style',
      null,
      `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes spin-reverse {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
      
      @keyframes glow {
        0% { box-shadow: 0 0 10px #00FF41; }
        100% { box-shadow: 0 0 30px #00FF41; }
      }
      
      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      `
    )
  );
};

export default LoadingScreen;