import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, User } from 'lucide-react';
const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'skills', 'projects', 'experience', 'certifications', 'blogs', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return React.createElement(
    'header',
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-green-500/20' : 'bg-transparent'
      }`,
      style: {
        borderBottom: isScrolled ? '1px solid #00FF41' : 'none'
      }
    },
    React.createElement(
      'nav',
      { className: 'container mx-auto px-4 sm:px-6 py-4' },
      React.createElement(
        'div',
        { className: 'flex items-center justify-between' },
        React.createElement(
          'div',
          {
            className: 'flex items-center space-x-2 cursor-pointer z-50',
            onClick: () => scrollToSection('hero')
          },
          React.createElement(
            'span',
            {
              className: 'text-white font-bold text-lg sm:text-xl',
              style: { fontFamily: 'Orbitron, monospace' }
            },
            'Vishnu_MK'
          )
        ),
        React.createElement(
          'div',
          { className: 'hidden md:flex items-center space-x-8' },
          ...navItems.map(item =>
            React.createElement(
              'button',
              {
                key: item.id,
                onClick: () => scrollToSection(item.id),
                className: `nav-link transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-white hover:text-green-400'
                }`,
                style: { fontFamily: 'Orbitron, monospace' }
              },
              item.label
            )
          ),
          React.createElement(
            'button',
            {
              onClick: toggleDarkMode,
              className: 'p-2 rounded-full bg-green-500/20 hover:bg-green-500/40 transition-all duration-300',
              style: { boxShadow: '0 0 10px #00FF41' }
            },
            React.createElement(darkMode ? Sun : Moon, { size: 20, color: '#00FF41' })
          )
        ),
        React.createElement(
          'button',
          {
            onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
            className: 'md:hidden p-2 text-white z-50 relative',
            style: { zIndex: 60 }
          },
          React.createElement(isMobileMenuOpen ? X : Menu, { size: 24 })
        )
      ),
      isMobileMenuOpen && React.createElement(
        'div',
        {
          className: 'md:hidden fixed top-0 left-0 right-0 bottom-0 bg-black/95 backdrop-blur-md z-40',
          style: { 
            animation: 'slideDown 0.3s ease-out',
            paddingTop: '80px'
          }
        },
        React.createElement(
          'div',
          { className: 'flex flex-col space-y-6 p-6 h-full overflow-y-auto' },
          ...navItems.map(item =>
            React.createElement(
              'button',
              {
                key: item.id,
                onClick: () => scrollToSection(item.id),
                className: `text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-green-400 bg-green-500/20' 
                    : 'text-white hover:text-green-400 hover:bg-green-500/10'
                }`,
                style: { 
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '1.1rem'
                }
              },
              item.label
            )
          ),
          React.createElement(
            'div',
            { className: 'pt-6 border-t border-green-500/30' },
            React.createElement(
              'button',
              {
                onClick: () => {
                  toggleDarkMode();
                  setIsMobileMenuOpen(false);
                },
                className: 'flex items-center gap-3 py-3 px-4 rounded-lg bg-green-500/20 hover:bg-green-500/40 transition-all duration-300 text-green-400',
                style: { fontFamily: 'Orbitron, monospace' }
              },
              React.createElement(darkMode ? Sun : Moon, { size: 20 }),
              darkMode ? 'Light Mode' : 'Dark Mode'
            )
          )
        )
      )
    )
  );
};

export default Header;