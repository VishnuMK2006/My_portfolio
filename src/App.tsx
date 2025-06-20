import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Blogs from './components/Blogs';
import Education from './components/Education';
import Contact from './components/Contact';
import FloatingEmojis from './components/FloatingEmojis';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';
import './styles/app.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return React.createElement(LoadingScreen);
  }

  return React.createElement(
    'div',
    {
      className: `app ${darkMode ? 'dark' : 'light'} relative overflow-x-hidden`,
      style: { fontFamily: 'Rajdhani, sans-serif' }
    },
    React.createElement(ParticleBackground),
    React.createElement(FloatingEmojis),
    React.createElement(Header, { darkMode, toggleDarkMode }),
    React.createElement(Hero),
    React.createElement(Skills),
    React.createElement(Projects),
    React.createElement(Experience),
    React.createElement(Certifications),
    React.createElement(Blogs),
    React.createElement(Education),
    React.createElement(Contact)
  );
}

export default App;