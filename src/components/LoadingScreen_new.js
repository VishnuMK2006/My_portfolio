import React from 'react';

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
          className: 'professional-loader mb-8 mx-auto relative',
          style: {
            width: '80px',
            height: '80px',
            position: 'relative'
          }
        },
        // Outer ring
        React.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '3px solid rgba(0, 255, 65, 0.2)',
              borderRadius: '50%',
              borderTop: '3px solid #00FF41',
              animation: 'spin 1.2s linear infinite'
            }
          }
        ),
        // Inner ring
        React.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '50px',
              height: '50px',
              border: '2px solid rgba(0, 204, 51, 0.3)',
              borderRadius: '50%',
              borderTop: '2px solid #00CC33',
              animation: 'spin-reverse 0.8s linear infinite'
            }
          }
        ),
        // Center dot
        React.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '8px',
              height: '8px',
              backgroundColor: '#00FF41',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'pulse-dot 1.5s ease-in-out infinite'
            }
          }
        )
      ),
      React.createElement(
        'h2',
        {
          className: 'text-xl font-semibold text-white mb-4',
          style: { 
            fontFamily: 'Orbitron, monospace',
            letterSpacing: '2px'
          }
        },
        'VISHNU MANIKANDAN'
      ),
      React.createElement(
        'p',
        {
          className: 'text-sm text-gray-400 mb-6',
          style: { 
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '1px'
          }
        },
        'Portfolio Loading...'
      ),
      React.createElement(
        'div',
        {
          className: 'loading-bar mx-auto',
          style: {
            width: '250px',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
            position: 'relative'
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
              animation: 'loading-slide 2s ease-in-out infinite',
              borderRadius: '1px'
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
      
      @keyframes pulse-dot {
        0%, 100% { 
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        50% { 
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 0.7;
        }
      }
      
      @keyframes loading-slide {
        0% { transform: translateX(-100%); }
        50% { transform: translateX(0%); }
        100% { transform: translateX(100%); }
      }
      
      .professional-loader {
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
      }
      `
    )
  );
};

export default LoadingScreen;
