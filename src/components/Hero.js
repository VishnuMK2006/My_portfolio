import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import mypic from './logo/my_pic.png';
import resume from './resume/resume.pdf';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const profileRef = useRef(null);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const phrases = [
    "Hi there!",
    "I am",
    "VISHNU MANIKANDAN",
  ];

  useEffect(() => {
    // Typing animation logic
    const typingInterval = setInterval(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        // Deleting text
        setCurrentText(currentPhrase.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
        
        if (currentIndex === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      } else {
        // Typing text
        setCurrentText(currentPhrase.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        
        if (currentIndex === currentPhrase.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    }, isDeleting ? 50 : 150);
    
    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    // Cleanup intervals
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [currentIndex, currentPhraseIndex, isDeleting]);

  useEffect(() => {
    const hero = heroRef.current;
    const text = textRef.current;
    const profile = profileRef.current;

    // Initial animations with smoother transitions
    gsap.fromTo(text.children, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power2.out' }
    );

    gsap.fromTo(profile,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' }
    );

    // Subtle parallax effect for smoother interaction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 15;
      const y = (clientY / innerHeight - 0.5) * 15;

      gsap.to(profile, { x, y, duration: 0.8, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/VishnuMK2006', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/vishnumanikandant', label: 'LinkedIn' },
    { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=vishnumanikandan654@gmail.com', label: 'Email' }
  ];

  return React.createElement(
    'section',
    {
      id: 'hero',
      ref: heroRef,
      className: 'min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0',
      style: {
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%)',
        zIndex: 10
      }
    },
    React.createElement(
      'div',
      { className: 'container mx-auto px-6 z-10 relative' },
      React.createElement(
        'div',
        { className: 'grid lg:grid-cols-2 gap-12 items-center' },
        React.createElement(
          'div',
          { ref: textRef, className: 'text-center lg:text-left' },
          React.createElement(
            'div',
            {
              className: 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight min-h-[8rem] flex items-center justify-center lg:justify-start',
              style: {
                fontFamily: 'Orbitron, monospace',
                background: 'linear-gradient(45deg, #00FF41, #00CC33, #FFFFFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }
            },
            currentText,
            React.createElement(
              'span',
              {
                className: `inline-block w-0.5 h-12 bg-green-500 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`,
                style: { 
                  animation: 'blink 1s infinite',
                  boxShadow: '0 0 10px #00FF41'
                }
              }
            )
          ),
          React.createElement(
            'h2',
            {
              className: 'text-xl sm:text-2xl lg:text-3xl text-green-400 mb-6 font-medium',
              style: { fontFamily: 'Rajdhani, sans-serif' }
            },
            'Full Stack Developer'
          ),
          React.createElement(
            'p',
            {
              className: 'text-base sm:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0',
              style: { fontFamily: 'Rajdhani, sans-serif' }
            },
            'A dedicated and enthusiastic learner driven to build end-to-end products that contribute to impactful, scalable, and sustainable tech solutions for real-world challenges.'
          ),
          React.createElement(
            'div',
            { className: 'flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8' },
            React.createElement(
              'button',
              {
                className: 'professional-button px-6 sm:px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-all duration-500 transform hover:scale-105',
                style: {
                  boxShadow: '0 0 20px #00FF41',
                  fontFamily: 'Orbitron, monospace'
                },
                onClick: () => {
                  // Create a temporary link element
                  const link = document.createElement('a');
                  link.href = resume;
                  link.download = 'Vishnu_MK_Resume.pdf'; // Name of the downloaded file
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              },
              React.createElement(Download, { size: 20, className: 'inline mr-2' }),
              'DOWNLOAD RESUME'
            ),
            React.createElement(
              'button',
              {
                className: 'professional-button-outline px-6 sm:px-8 py-3 border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold rounded-lg transition-all duration-500',
                style: { fontFamily: 'Orbitron, monospace' },
                onClick: () => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              },
              'VIEW PROJECTS'
            )
          ),
          React.createElement(
            'div',
            { className: 'flex gap-4 sm:gap-6 justify-center lg:justify-start' },
            ...socialLinks.map(({ icon: Icon, href, label }) =>
              React.createElement(
                'a',
                {
                  key: label,
                  href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'social-link p-3 bg-gray-800 hover:bg-green-500 rounded-full transition-all duration-300 transform hover:scale-110',
                  style: { boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)' }
                },
                React.createElement(Icon, { size: 20, className: 'text-green-400 hover:text-black transition-colors sm:w-6 sm:h-6' })
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'flex lg:justify-end lg:mt-0' },
          React.createElement(
            'div',
            {
              ref: profileRef,
              className: 'relative w-full lg:w-auto',
              style: {
                animation: 'float 6s ease-in-out infinite'
              }
            },
            React.createElement(
              'div',
              {
                className: 'w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[800px] lg:w-[500px] rounded-lg lg:rounded-full  lg:overflow-hidden',
                style: {
                  position: 'relative'
                }
              },
              React.createElement(
                'div',
                {
                  className: 'w-full h-full',
                  style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }
                },
                React.createElement('img', {
                  src: mypic, 
                  alt: 'Profile Image',
                  className: 'w-full h-full object-contain',
                  style: {
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 65, 0.7))'
                  }
                })
              )
            )
          )
        )
      )
    ),
    React.createElement(
      'style',
      null,
      `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes pulse {
        0% { box-shadow: 0 0 20px #00FF41; }
        50% { box-shadow: 0 0 40px #00FF41; }
        100% { box-shadow: 0 0 20px #00FF41; }
      }

      @media (max-width: 768px) {
        .omnitrix-hero {
          width: 300px !important;
          height: 300px !important;
          border-radius: 50% !important;
        }
      }
      `
    )
  );
};

export default Hero;