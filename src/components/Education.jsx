import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, BookOpen, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const educationRef = useRef(null);
  const [education, setEducation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default data in case API fails
  const defaultEducation = [
    {
      id: 1,
      degree: 'Master of Galactic Engineering',
      institution: 'Galvan Prime University',
      location: 'Galvan B',
      period: '2019 - 2021',
      description: 'Specialized in interdimensional computing and alien technology integration. Graduated summa cum laude.',
      achievements: [
        'Thesis on "Omnitrix Architecture and Alien DNA Sequencing"',
        'Published 5 research papers on intergalactic communication',
        'Led team of 20 students in building functional Plumber communicator'
      ],
      gpa: '4.0/4.0',
      icon: '🎓',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 2,
      degree: 'Bachelor of Computer Science',
      institution: 'Bellwood Tech Institute',
      location: 'Earth',
      period: '2015 - 2019',
      description: 'Foundation in computer science with focus on software engineering and alien technology adaptation.',
      achievements: [
        'Valedictorian of graduating class',
        'President of Coding Club for 3 consecutive years',
        'Winner of Intergalactic Programming Olympiad'
      ],
      gpa: '3.9/4.0',
      icon: '💻',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://vishnu-api.onrender.com/api/education/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        
        // Handle both array and single object responses
        if (Array.isArray(json)) {
          setEducation(json.length > 0 ? json : defaultEducation);
        } else if (json && typeof json === 'object') {
          // If single object, wrap it in an array
          setEducation([json]);
        } else {
          setEducation(defaultEducation);
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
        setEducation(defaultEducation);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading || !education.length) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: educationRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate the timeline line
    timeline.fromTo('.education-timeline',
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: 'power2.out' }
    );

    // Animate education items
    timeline.fromTo('.education-item',
      { x: (i) => i % 2 === 0 ? -100 : 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
      0.5
    );
  }, [isLoading, education]);

  if (isLoading) {
    return (
      <section 
        id="education" 
        ref={educationRef} 
        className="py-12 sm:py-16 lg:py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 50%, #0F3460 100%)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-300">Loading education history...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="education"
      ref={educationRef}
      className="py-12 sm:py-16 lg:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #16213E 0%, #1A1A2E 50%, #0F3460 100%)'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
            style={{
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(45deg, #00FF41, #FFFFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
             EDUCATION 🎓
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Academic journey across the universe, mastering knowledge from different worlds
          </p>
        </div>
        
        <div className="relative">
          <div
            className="education-timeline hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400 to-green-600 origin-top"
            style={{
              boxShadow: '0 0 20px #00FF41',
              scaleX: 0
            }}
          />
          
          {education.length > 0 ? (
            <div className="space-y-8 sm:space-y-12 lg:space-y-16">
              {education.map((edu, index) => (
                <div
                  key={edu.id || index}
                  className={`education-item flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-6 lg:gap-8`}
                >
                  <div
                    className={`flex-1 w-full ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}
                  >
                    <div
                      className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-green-500/30 hover:border-green-500/60 transition-all duration-300"
                      style={{
                        boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)',
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 46, 0.4))'
                      }}
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                        <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} flex-1`}>
                          <h3
                            className="text-xl sm:text-2xl font-bold text-white mb-2"
                            style={{ fontFamily: 'Orbitron, monospace' }}
                          >
                            {edu.degree || 'Degree Not Specified'}
                          </h3>
                          <h4
                            className="text-lg sm:text-xl text-green-400 mb-2"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            {edu.institution || 'Unknown Institution'}
                          </h4>
                          <p
                            className="text-sm sm:text-base text-gray-400 mb-2"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            {edu.location ? `${edu.location} • ${edu.period || ''}` : edu.period || ''}
                          </p>
                        </div>
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${edu.color || 'from-gray-400 to-gray-600'} rounded-full flex items-center justify-center text-xl flex-shrink-0`}
                          style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' }}
                        >
                          {edu.icon || '🎓'}
                        </div>
                      </div>
                      
                      <p
                        className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        {edu.description || 'No description available'}
                      </p>
                      
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Award size={18} className="text-green-400" />
                          <h5
                            className="text-base sm:text-lg font-semibold text-green-400"
                            style={{ fontFamily: 'Orbitron, monospace' }}
                          >
                            {(edu.achievements!=null)? "Key Achievements" : " "}
                          </h5>
                        </div>
                        <ul className="space-y-2">
                          {(edu.achievements || []).map((achievement, achIndex) => (
                            <li
                              key={achIndex}
                              className={`flex items-start gap-3 text-sm sm:text-base text-gray-300 ${
                                index % 2 === 0 ? 'lg:text-right lg:justify-end' : 'lg:text-left lg:justify-start'
                              }`}
                              style={{ fontFamily: 'Rajdhani, sans-serif' }}
                            >
                              {index % 2 === 0 && (
                                <span className="text-green-400 mt-1 hidden lg:inline">◀</span>
                              )}
                              <span className="lg:hidden text-green-400 mt-1">▶</span>
                              <span className="flex-1">{achievement}</span>
                              {index % 2 !== 0 && (
                                <span className="text-green-400 mt-1 hidden lg:inline">▶</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div
                        className={`flex items-center gap-2 ${
                          index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                        }`}
                      >
                        <GraduationCap size={16} className="text-yellow-400" />
                        <span
                          className="text-yellow-400 font-bold text-sm sm:text-base"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {edu.gpa ? `GPA: ${edu.gpa}` : `Percent: ${edu.percent}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center relative z-10 hidden lg:flex"
                    style={{
                      boxShadow: '0 0 30px #00FF41'
                    }}
                  >
                    <span className="text-2xl sm:text-3xl">
                      {edu.icon || '🎓'}
                    </span>
                  </div>
                  
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-300">
              No education history found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;