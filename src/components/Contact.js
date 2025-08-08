import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.fromTo('.contact-content',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        stagger: 0.2
      }
    );

    gsap.fromTo('.contact-form',
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create Gmail URL with pre-filled content
    const email = 'vishnumanikandan654@gmail.com';
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');

    // Reset form and state
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Animation feedback
    gsap.to(formRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'vishnumanikandan654@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=vishnumanikandan654@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Erode, Tamilnadu',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/VishnuMK2006', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/vishnumanikandant', label: 'LinkedIn' },
    // { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return React.createElement(
    'section',
    {
      id: 'contact',
      ref: contactRef,
      className: 'py-20 relative',
      style: {
        background: 'linear-gradient(135deg, #0F3460 0%, #16213E 50%, #1A1A2E 100%)'
      }
    },
    React.createElement(
      'div',
      { className: 'container mx-auto px-6' },
      React.createElement(
        'div',
        { className: 'text-center mb-16 contact-content' },
        React.createElement(
          'h2',
          {
            className: 'text-4xl lg:text-5xl font-bold mb-6',
            style: {
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(45deg, #00FF41, #FFFFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }
          },
          'CONTACT ME📡'
        ),
        React.createElement(
          'p',
          {
            className: 'text-xl text-gray-300 max-w-2xl mx-auto',
            style: { fontFamily: 'Rajdhani, sans-serif' }
          },
          'Ready to collaborate on your next project? Let\'s transform ideas into reality!'
        )
      ),
      React.createElement(
        'div',
        { className: 'grid lg:grid-cols-2 gap-16' },
        React.createElement(
          'div',
          { className: 'contact-content space-y-8' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'h3',
              {
                className: 'text-3xl font-bold text-white mb-6',
                style: { fontFamily: 'Orbitron, monospace' }
              },
              'Get In Touch'
            ),
            React.createElement(
              'p',
              {
                className: 'text-gray-300 text-lg leading-relaxed mb-8',
                style: { fontFamily: 'Rajdhani, sans-serif' }
              },
              'Just contact with me!'
            )
          ),
          React.createElement(
            'div',
            { className: 'space-y-6' },
            ...contactInfo.map(({ icon: Icon, label, value, href }) =>
              React.createElement(
                'a',
                {
                  key: label,
                  href,
                  className: 'flex items-center gap-4 p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-green-500/30 hover:border-green-500/60 transition-all duration-300 group',
                  style: { boxShadow: '0 5px 15px rgba(0, 255, 65, 0.1)' }
                },
                React.createElement(
                  'div',
                  {
                    className: 'w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform',
                    style: { boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)' }
                  },
                  React.createElement(Icon, { size: 20, className: 'text-black' })
                ),
                React.createElement(
                  'div',
                  null,
                  React.createElement(
                    'h4',
                    {
                      className: 'text-white font-semibold mb-1',
                      style: { fontFamily: 'Orbitron, monospace' }
                    },
                    label
                  ),
                  React.createElement(
                    'p',
                    {
                      className: 'text-gray-300',
                      style: { fontFamily: 'Rajdhani, sans-serif' }
                    },
                    value
                  )
                )
              )
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'h4',
              {
                className: 'text-xl font-bold text-white mb-4',
                style: { fontFamily: 'Orbitron, monospace' }
              },
              'Follow me'
            ),
            React.createElement(
              'div',
              { className: 'flex gap-4' },
              ...socialLinks.map(({ icon: Icon, href, label }) =>
                React.createElement(
                  'a',
                  {
                    key: label,
                    href,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'w-12 h-12 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110',
                    style: { boxShadow: '0 0 15px rgba(0, 255, 65, 0.2)' }
                  },
                  React.createElement(Icon, { 
                    size: 20, 
                    className: 'text-green-400 hover:text-black transition-colors' 
                  })
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'contact-form' },
          React.createElement(
            'form',
            {
              ref: formRef,
              onSubmit: handleSubmit,
              className: 'bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/30',
              style: {
                boxShadow: '0 20px 40px rgba(0, 255, 65, 0.1)',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 46, 0.4))'
              }
            },
            React.createElement(
              'h3',
              {
                className: 'text-2xl font-bold text-white mb-6 text-center',
                style: { fontFamily: 'Orbitron, monospace' }
              },
              'Send'
            ),
            React.createElement(
              'div',
              { className: 'grid md:grid-cols-2 gap-6 mb-6' },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  {
                    className: 'block text-green-400 font-semibold mb-2',
                    style: { fontFamily: 'Orbitron, monospace' }
                  },
                  'Name'
                ),
                React.createElement('input', {
                  type: 'text',
                  name: 'name',
                  value: formData.name,
                  onChange: handleInputChange,
                  required: true,
                  className: 'w-full px-4 py-3 bg-gray-900/60 border border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-all duration-300',
                  style: { 
                    fontFamily: 'Rajdhani, sans-serif',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                  },
                  placeholder: 'Your name'
                })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  {
                    className: 'block text-green-400 font-semibold mb-2',
                    style: { fontFamily: 'Orbitron, monospace' }
                  },
                  'Email'
                ),
                React.createElement('input', {
                  type: 'email',
                  name: 'email',
                  value: formData.email,
                  onChange: handleInputChange,
                  required: true,
                  className: 'w-full px-4 py-3 bg-gray-900/60 border border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-all duration-300',
                  style: { 
                    fontFamily: 'Rajdhani, sans-serif',
                    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                  },
                  placeholder: 'abc@gmail.com'
                })
              )
            ),
            React.createElement(
              'div',
              { className: 'mb-6' },
              React.createElement(
                'label',
                {
                  className: 'block text-green-400 font-semibold mb-2',
                  style: { fontFamily: 'Orbitron, monospace' }
                },
                'Subject'
              ),
              React.createElement('input', {
                type: 'text',
                name: 'subject',
                value: formData.subject,
                onChange: handleInputChange,
                required: true,
                className: 'w-full px-4 py-3 bg-gray-900/60 border border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-all duration-300',
                style: { 
                  fontFamily: 'Rajdhani, sans-serif',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                },
                placeholder: 'Subject'
              })
            ),
            React.createElement(
              'div',
              { className: 'mb-8' },
              React.createElement(
                'label',
                {
                  className: 'block text-green-400 font-semibold mb-2',
                  style: { fontFamily: 'Orbitron, monospace' }
                },
                'Message'
              ),
              React.createElement('textarea', {
                name: 'message',
                value: formData.message,
                onChange: handleInputChange,
                required: true,
                rows: 6,
                className: 'w-full px-4 py-3 bg-gray-900/60 border border-green-500/30 rounded-lg text-white focus:border-green-500 focus:outline-none transition-all duration-300 resize-none',
                style: { 
                  fontFamily: 'Rajdhani, sans-serif',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                },
                placeholder: 'Content'
              })
            ),
            React.createElement(
              'button',
              {
                type: 'submit',
                disabled: isSubmitting,
                className: `w-full py-4 px-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`,
                style: {
                  fontFamily: 'Orbitron, monospace',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
                }
              },
              isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION',
              React.createElement(Send, { 
                size: 20, 
                className: `${isSubmitting ? 'animate-pulse' : ''}` 
              })
            )
          )
        )
      )
    )
  );
};

export default Contact;