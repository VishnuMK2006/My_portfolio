import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default data in case API fails
  const defaultSkills = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'JavaScript', level: 90, icon: '🟨' },
        { name: 'TypeScript', level: 85, icon: '🔷' },
        { name: 'CSS/SCSS', level: 88, icon: '🎨' },
        { name: 'HTML5', level: 92, icon: '🌐' }
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 87, icon: '🟢' },
        { name: 'Python', level: 83, icon: '🐍' },
        { name: 'Express', level: 85, icon: '🚀' },
        { name: 'MongoDB', level: 80, icon: '🍃' },
        { name: 'PostgreSQL', level: 82, icon: '🐘' }
      ]
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git', level: 90, icon: '🌿' },
        { name: 'Docker', level: 75, icon: '🐳' },
        { name: 'AWS', level: 70, icon: '☁️' },
        { name: 'Firebase', level: 85, icon: '🔥' },
        { name: 'GraphQL', level: 78, icon: '📊' }
      ]
    }
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://vishnu-api.onrender.com/api/skills/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        
        // Handle both array and single object responses
        if (Array.isArray(json)) {
          setSkillCategories(json.length > 0 ? json : defaultSkills);
        } else if (json && typeof json === 'object') {
          setSkillCategories([json]);
        } else {
          setSkillCategories(defaultSkills);
        }
      } catch (error) {
        console.error('Failed to fetch skills:', error);
        setSkillCategories(defaultSkills);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (isLoading || !skillCategories.length) return;

    // Animate skill bars
    gsap.fromTo('.skill-bar-fill',
      { width: '0%' },
      {
        width: (i, target) => target.getAttribute('data-level') + '%',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        stagger: 0.2
      }
    );
  }, [isLoading, skillCategories]);

  if (isLoading) {
    return (
      <section 
        id="skills" 
        ref={skillsRef} 
        className="py-20 relative"
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="py-20 relative"
      style={{
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)'
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
            TECH SKILLS 🖥️
          </h2>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Mastering various technologies with continuous learning and innovation
          </p>
        </div>

        {/* Rolling Title Cards */}
        {skillCategories.length > 0 && (
          <div 
            className="rolling-cards-container overflow-hidden relative"
            style={{
              width: '100%',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div 
              className="rolling-cards-track"
              style={{
                display: 'flex',
                animation: 'rollCards 50s linear infinite',
                gap: '0',
                willChange: 'transform'
              }}
            >
              {/* First set of cards */}
              <div 
                className="rolling-cards-set"
                style={{
                  display: 'flex',
                  gap: '0',
                  flexShrink: '0'
                }}
              >
                {skillCategories.map((category, categoryIndex) => (
                  <div
                    key={`${category.title}-${categoryIndex}`}
                    className="skill-card-container group"
                    style={{
                      perspective: '1200px',
                      height: '300px',
                      width: '280px',
                      margin: '0 20px',
                      flexShrink: 0,
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <div 
                      className="skill-card-inner w-full h-full relative transition-transform duration-700 transform-style-preserve-3d"
                    >
                      {/* Front Side - Title Card */}
                      <div
                        className="skill-card-front absolute inset-0 bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/30 flex flex-col items-center justify-center backface-hidden"
                        style={{
                          boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
                        }}
                      >
                        <div className="text-center">
                          <div 
                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 204, 51, 0.1))',
                              border: '2px solid rgba(0, 255, 65, 0.3)'
                            }}
                          >
                            {categoryIndex === 0 ? '⚛️' : categoryIndex === 1 ? '🚀' : categoryIndex === 2 ? '🛠️' : '💻'}
                          </div>
                          <h3
                            className="text-xl font-bold text-green-400 mb-3"
                            style={{ fontFamily: 'Orbitron, monospace' }}
                          >
                            {category.title || 'Skills Category'}
                          </h3>
                          <p 
                            className="text-gray-300 text-sm mb-4"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            {(category.skills || []).length} Skills
                          </p>
                          <div className="w-full h-1 bg-gray-700 rounded">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded animate-pulse"
                              style={{ width: '70%' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Back Side - Skills Progress */}
                      <div
                        className="skill-card-back absolute inset-0 bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-green-500/60 backface-hidden"
                        style={{
                          boxShadow: '0 10px 30px rgba(0, 255, 65, 0.2)',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <h3
                          className="text-lg font-bold text-green-400 mb-4 text-center"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {category.title}
                        </h3>

                        <div className="space-y-3 overflow-y-auto max-h-60">
                          {(category.skills || []).map((skill, skillIndex) => (
                            <div key={skill.name || skillIndex} className="skill-item">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    {skill.icon || '💻'}
                                  </span>
                                  <span
                                    className="text-white font-medium text-xs"
                                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                                  >
                                    {skill.name || 'Skill'}
                                  </span>
                                </div>
                                <span
                                  className="text-green-400 font-bold text-xs"
                                  style={{ fontFamily: 'Orbitron, monospace' }}
                                >
                                  {skill.level || 0}%
                                </span>
                              </div>

                              <div
                                className="skill-bar h-1.5 bg-gray-700 rounded-full overflow-hidden"
                                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
                              >
                                <div
                                  className="skill-bar-fill h-full rounded-full transition-all duration-1000 delay-300"
                                  data-level={skill.level || 0}
                                  style={{
                                    background: 'linear-gradient(90deg, #00FF41, #00CC33)',
                                    boxShadow: '0 0 6px #00FF41',
                                    width: `${skill.level || 0}%`
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div 
                className="rolling-cards-set"
                style={{
                  display: 'flex',
                  gap: '0',
                  flexShrink: '0',
                  marginLeft: '40px' // Add space between sets
                }}
              >
                {skillCategories.map((category, categoryIndex) => (
                  <div
                    key={`${category.title}-duplicate-${categoryIndex}`}
                    className="skill-card-container group"
                    style={{
                      perspective: '1200px',
                      height: '300px',
                      width: '280px',
                      margin: '0 20px',
                      flexShrink: 0,
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <div 
                      className="skill-card-inner w-full h-full relative transition-transform duration-700 transform-style-preserve-3d"
                    >
                      {/* Front Side - Title Card */}
                      <div
                        className="skill-card-front absolute inset-0 bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/30 flex flex-col items-center justify-center backface-hidden"
                        style={{
                          boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
                        }}
                      >
                        <div className="text-center">
                          <div 
                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 204, 51, 0.1))',
                              border: '2px solid rgba(0, 255, 65, 0.3)'
                            }}
                          >
                            {categoryIndex === 0 ? '⚛️' : categoryIndex === 1 ? '🚀' : categoryIndex === 2 ? '🛠️' : '💻'}
                          </div>
                          <h3
                            className="text-xl font-bold text-green-400 mb-3"
                            style={{ fontFamily: 'Orbitron, monospace' }}
                          >
                            {category.title || 'Skills Category'}
                          </h3>
                          <p 
                            className="text-gray-300 text-sm mb-4"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            {(category.skills || []).length} Skills
                          </p>
                          <div className="w-full h-1 bg-gray-700 rounded">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded animate-pulse"
                              style={{ width: '70%' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Back Side - Skills Progress */}
                      <div
                        className="skill-card-back absolute inset-0 bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-green-500/60 backface-hidden"
                        style={{
                          boxShadow: '0 10px 30px rgba(0, 255, 65, 0.2)',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <h3
                          className="text-lg font-bold text-green-400 mb-4 text-center"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {category.title}
                        </h3>

                        <div className="space-y-3 overflow-y-auto max-h-60">
                          {(category.skills || []).map((skill, skillIndex) => (
                            <div key={`duplicate-${skill.name}-${skillIndex}`} className="skill-item">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    {skill.icon || '💻'}
                                  </span>
                                  <span
                                    className="text-white font-medium text-xs"
                                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                                  >
                                    {skill.name || 'Skill'}
                                  </span>
                                </div>
                                <span
                                  className="text-green-400 font-bold text-xs"
                                  style={{ fontFamily: 'Orbitron, monospace' }}
                                >
                                  {skill.level || 0}%
                                </span>
                              </div>

                              <div
                                className="skill-bar h-1.5 bg-gray-700 rounded-full overflow-hidden"
                                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
                              >
                                <div
                                  className="skill-bar-fill h-full rounded-full transition-all duration-1000 delay-300"
                                  data-level={skill.level || 0}
                                  style={{
                                    background: 'linear-gradient(90deg, #00FF41, #00CC33)',
                                    boxShadow: '0 0 6px #00FF41',
                                    width: `${skill.level || 0}%`
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Third set for extra smooth loop */}
              <div 
                className="rolling-cards-set"
                style={{
                  display: 'flex',
                  gap: '0',
                  flexShrink: '0',
                  marginLeft: '40px' // Add space between sets
                }}
              >
                {skillCategories.map((category, categoryIndex) => (
                  <div
                    key={`${category.title}-third-${categoryIndex}`}
                    className="skill-card-container group"
                    style={{
                      perspective: '1200px',
                      height: '300px',
                      width: '280px',
                      margin: '0 20px',
                      flexShrink: 0,
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <div 
                      className="skill-card-inner w-full h-full relative transition-transform duration-700 transform-style-preserve-3d"
                    >
                      {/* Front Side - Title Card */}
                      <div
                        className="skill-card-front absolute inset-0 bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/30 flex flex-col items-center justify-center backface-hidden"
                        style={{
                          boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
                        }}
                      >
                        <div className="text-center">
                          <div 
                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 204, 51, 0.1))',
                              border: '2px solid rgba(0, 255, 65, 0.3)'
                            }}
                          >
                            {categoryIndex === 0 ? '⚛️' : categoryIndex === 1 ? '🚀' : categoryIndex === 2 ? '🛠️' : '💻'}
                          </div>
                          <h3
                            className="text-xl font-bold text-green-400 mb-3"
                            style={{ fontFamily: 'Orbitron, monospace' }}
                          >
                            {category.title || 'Skills Category'}
                          </h3>
                          <p 
                            className="text-gray-300 text-sm mb-4"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            {(category.skills || []).length} Skills
                          </p>
                          <div className="w-full h-1 bg-gray-700 rounded">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded animate-pulse"
                              style={{ width: '70%' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Back Side - Skills Progress */}
                      <div
                        className="skill-card-back absolute inset-0 bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-green-500/60 backface-hidden"
                        style={{
                          boxShadow: '0 10px 30px rgba(0, 255, 65, 0.2)',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <h3
                          className="text-lg font-bold text-green-400 mb-4 text-center"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {category.title}
                        </h3>

                        <div className="space-y-3 overflow-y-auto max-h-60">
                          {(category.skills || []).map((skill, skillIndex) => (
                            <div key={`third-${skill.name}-${skillIndex}`} className="skill-item">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    {skill.icon || '💻'}
                                  </span>
                                  <span
                                    className="text-white font-medium text-xs"
                                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                                  >
                                    {skill.name || 'Skill'}
                                  </span>
                                </div>
                                <span
                                  className="text-green-400 font-bold text-xs"
                                  style={{ fontFamily: 'Orbitron, monospace' }}
                                >
                                  {skill.level || 0}%
                                </span>
                              </div>

                              <div
                                className="skill-bar h-1.5 bg-gray-700 rounded-full overflow-hidden"
                                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
                              >
                                <div
                                  className="skill-bar-fill h-full rounded-full transition-all duration-1000 delay-300"
                                  data-level={skill.level || 0}
                                  style={{
                                    background: 'linear-gradient(90deg, #00FF41, #00CC33)',
                                    boxShadow: '0 0 6px #00FF41',
                                    width: `${skill.level || 0}%`
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gradient fade edges */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to right, rgba(26, 26, 46, 1), rgba(26, 26, 46, 0.8), transparent)'
              }}
            />
            <div 
              className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to left, rgba(26, 26, 46, 1), rgba(26, 26, 46, 0.8), transparent)'
              }}
            />
            
            {/* Custom CSS for smooth rolling animation */}
            <style jsx>{`
              @keyframes rollCards {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-33.333% - 26.67px));
                }
              }
              
              .skill-card-container:hover {
                transform: scale(1.05);
                z-index: 10;
              }
              
              .rolling-cards-container:hover .rolling-cards-track {
                animation-play-state: paused;
              }
              
              .skill-card-container:hover .skill-card-inner {
                transform: rotateY(180deg);
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
