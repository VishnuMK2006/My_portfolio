import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const certificationsRef = useRef(null);
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardsRef = useRef([]);

  // Default data in case API fails
  const defaultCertifications = [
    {
      id: 1,
      title: 'Galactic JavaScript Mastery',
      issuer: 'Intergalactic Coding Academy',
      date: '2023',
      description: 'Advanced JavaScript concepts including alien algorithms and cosmic data structures',
      credentialUrl: '#',
      icon: '🟨',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 2,
      title: 'React Omnitrix Certification',
      issuer: 'Ben 10 Tech Institute',
      date: '2023',
      description: 'Expert-level React development with component transformation abilities',
      credentialUrl: '#',
      icon: '⚛️',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://vishnu-api.onrender.com/api/certifications/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        
        // Handle both array and single object responses
        if (Array.isArray(json)) {
          setCertifications(json.length > 0 ? json : defaultCertifications);
        } else if (json && typeof json === 'object') {
          // If single object, wrap it in an array
          setCertifications([json]);
        } else {
          setCertifications(defaultCertifications);
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
        setCertifications(defaultCertifications);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading || !certifications.length) return;

    // Wait for the next tick to ensure DOM is updated
    const timer = setTimeout(() => {
      // Get all cert-card elements
      const certCards = gsap.utils.toArray('.cert-card');
      
      if (certCards.length === 0) return;

      gsap.fromTo(certCards,
        { 
          rotateY: 180,
          opacity: 0,
          scale: 0.8
        },
        {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: certificationsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, certifications]);

  if (isLoading) {
    return (
      <section 
        id="certifications" 
        ref={certificationsRef} 
        className="py-20 relative"
        style={{
          background: 'linear-gradient(135deg, #0F3460 0%, #16213E 50%, #1A1A2E 100%)'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">Loading certifications...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="certifications"
      ref={certificationsRef}
      className="py-20 relative"
      style={{
        background: 'linear-gradient(135deg, #0F3460 0%, #16213E 50%, #1A1A2E 100%)'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            style={{
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(45deg, #00FF41, #FFFFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
           Certifications🏆
          </h2>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Certifications earned
          </p>
        </div>
        
        {certifications.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.id || index}
                className="cert-card group perspective-1000"
                ref={el => cardsRef.current[index] = el}
              >
                <div
                  className="relative transform-style-3d transition-transform duration-700 group-hover:rotate-y-12"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 relative overflow-hidden"
                    style={{
                      boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)',
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 46, 0.4))'
                    }}
                  >
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${cert.color || 'from-yellow-400 to-yellow-600'} opacity-20 rounded-bl-full`}
                    />
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${cert.color || 'from-yellow-400 to-yellow-600'} rounded-full flex items-center justify-center text-2xl`}
                        style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' }}
                      >
                        {cert.icon || '🟨'}
                      </div>
                      <a
                        href={cert.credentialUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 hover:bg-green-500 rounded-lg transition-all duration-300 group opacity-0 group-hover:opacity-100"
                      >
                        <ExternalLink 
                          size={16} 
                          className="text-green-400 group-hover:text-black transition-colors" 
                        />
                      </a>
                    </div>
                    <h3
                      className="text-xl font-bold text-white mb-3"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {cert.title || 'Untitled Certification'}
                    </h3>
                    <h4
                      className="text-lg text-green-400 mb-4"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {cert.issuer || 'Unknown Issuer'}
                    </h4>
                    <p
                      className="text-gray-300 mb-6 text-sm leading-relaxed"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {cert.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={16} />
                      <span
                        className="text-sm"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        {cert.date || 'Unknown Date'}
                      </span>
                    </div>
                    <div
                      className="absolute bottom-4 right-4 opacity-10 text-6xl"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      <Award size={60} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-300">
            No certifications found.
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;