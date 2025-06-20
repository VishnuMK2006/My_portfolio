import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const experienceRef = useRef(null);
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default data in case API fails
  const defaultExperiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Galactic Tech Solutions',
      location: 'Remote Galaxy',
      period: '2023 - Present',
      description: 'Leading development of intergalactic communication systems using alien technologies. Mastered Heat Blast for server optimization and XLR8 for lightning-fast deployments.',
      achievements: [
        'Reduced server response time by 75% using alien cooling technology',
        'Built scalable architecture serving 1M+ alien species',
        'Mentored junior developers across 12 different planets'
      ],
      icon: '🚀'
    },
    {
      id: 2,
      title: 'Frontend Architect',
      company: 'Omnitrix Innovations',
      location: 'Bellwood HQ',
      period: '2022 - 2023',
      description: 'Architected user interfaces for the Omnitrix control system. Utilized Diamond Head precision for pixel-perfect designs and Brain Storm intelligence for complex state management.',
      achievements: [
        'Redesigned Omnitrix UI increasing user satisfaction by 90%',
        'Implemented real-time alien transformation tracking',
        'Optimized performance for 10,000+ concurrent transformations'
      ],
      icon: '🕰️'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://vishnu-api.onrender.com/api/experience/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        
        // Handle both array and single object responses
        if (Array.isArray(json)) {
          setExperiences(json.length > 0 ? json : defaultExperiences);
        } else if (json && typeof json === 'object') {
          // If single object, wrap it in an array
          setExperiences([json]);
        } else {
          setExperiences(defaultExperiences);
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
        setExperiences(defaultExperiences);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading || !experiences.length) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: experienceRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    timeline.fromTo('.experience-item',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    );

    timeline.fromTo('.experience-line',
      { height: '0%' },
      { height: '100%', duration: 1.5, ease: 'power2.out' },
      0
    );
  }, [isLoading, experiences]);

  if (isLoading) {
    return (
      <section 
        id="experience" 
        ref={experienceRef} 
        className="py-20 relative"
        style={{
          background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 50%, #0F3460 100%)'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">Loading experience...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={experienceRef}
      className="py-20 relative"
      style={{
        background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 50%, #0F3460 100%)'
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
            EXPERIENCE 🛡️
          </h2>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Practical exposure through real-time, industry-level work
          </p>
        </div>
        
        <div className="relative">
          <div
            className="experience-line absolute left-8 top-0 w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-full"
            style={{
              height: '0%',
              boxShadow: '0 0 10px #00FF41'
            }}
          />
          
          {experiences.length > 0 ? (
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id || index}
                  className="experience-item relative flex items-start gap-8"
                >
                  <div
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      boxShadow: '0 0 20px #00FF41'
                    }}
                  >
                    <span className="text-2xl">
                      {exp.icon || '💼'}
                    </span>
                  </div>
                  
                  <div
                    className="flex-1 bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/30 hover:border-green-500/60 transition-all duration-300"
                    style={{
                      boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div>
                        <h3
                          className="text-2xl font-bold text-white mb-2"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {exp.title || 'Position Not Specified'}
                        </h3>
                        <h4
                          className="text-xl text-green-400 mb-3"
                          style={{ fontFamily: 'Rajdhani, sans-serif' }}
                        >
                          {exp.company || 'Unknown Company'}
                        </h4>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <Calendar size={16} />
                          <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            {exp.period || 'Unknown Period'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin size={16} />
                          <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            {exp.location || 'Unknown Location'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p
                      className="text-gray-300 mb-6 leading-relaxed"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {exp.description || 'No description available'}
                    </p>
                    
                    <div>
                      <h5
                        className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        <Award size={18} />
                        Key Achievements
                      </h5>
                      
                      <ul className="space-y-2">
                        {(exp.achievements || []).map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-3 text-gray-300"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            <span className="text-green-400 mt-1">▶</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-300">
              No experience found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;