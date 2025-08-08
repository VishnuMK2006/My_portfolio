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

        {/* Rolling Skills Banner */}
        <div className="mb-16">
          <h3 
            className="text-2xl font-bold text-center mb-8"
            style={{
              fontFamily: 'Orbitron, monospace',
              color: '#00FF41',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.3)'
            }}
          >
            ⚡ CONTINUOUS SKILLS SHOWCASE ⚡
          </h3>
          
          <div className="overflow-hidden relative">
            <div className="rolling-skills-container">
              <div className="rolling-skills-track">
                {/* First set of skills */}
                <div className="rolling-skills-set">
                  {skillCategories.flatMap(category => 
                    (category.skills || []).map((skill, index) => (
                      <div
                        key={`${skill.name}-${index}`}
                        className="rolling-skill-item"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 204, 51, 0.05))',
                          border: '1px solid rgba(0, 255, 65, 0.3)',
                          borderRadius: '25px',
                          padding: '12px 24px',
                          margin: '0 15px',
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          minWidth: 'fit-content'
                        }}
                      >
                        <span className="text-2xl">{skill.icon || '💻'}</span>
                        <span 
                          className="text-white font-medium"
                          style={{ fontFamily: 'Rajdhani, sans-serif' }}
                        >
                          {skill.name}
                        </span>
                        <span 
                          className="text-green-400 font-bold text-sm"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                    ))
                  )}
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="rolling-skills-set">
                  {skillCategories.flatMap(category => 
                    (category.skills || []).map((skill, index) => (
                      <div
                        key={`${skill.name}-duplicate-${index}`}
                        className="rolling-skill-item"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.1), rgba(0, 204, 51, 0.05))',
                          border: '1px solid rgba(0, 255, 65, 0.3)',
                          borderRadius: '25px',
                          padding: '12px 24px',
                          margin: '0 15px',
                          whiteSpace: 'nowrap',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          minWidth: 'fit-content'
                        }}
                      >
                        <span className="text-2xl">{skill.icon || '💻'}</span>
                        <span 
                          className="text-white font-medium"
                          style={{ fontFamily: 'Rajdhani, sans-serif' }}
                        >
                          {skill.name}
                        </span>
                        <span 
                          className="text-green-400 font-bold text-sm"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Gradient fade edges */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to right, rgba(26, 26, 46, 1), transparent)'
              }}
            />
            <div 
              className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to left, rgba(26, 26, 46, 1), transparent)'
              }}
            />
          </div>
        </div>

        {/* Flip Cards Section */}
        {skillCategories.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title || categoryIndex}
                className="skill-card-container group"
                style={{
                  perspective: '1000px',
                  height: '400px'
                }}
              >
                <div 
                  className="skill-card-inner w-full h-full relative transition-transform duration-700 transform-style-preserve-3d"
                >
                  {/* Front Side - Title */}
                  <div
                    className="skill-card-front absolute inset-0 bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/30 flex flex-col items-center justify-center backface-hidden"
                    style={{
                      boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
                    }}
                  >
                    <div className="text-center">
                      <div 
                        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 204, 51, 0.1))',
                          border: '2px solid rgba(0, 255, 65, 0.3)'
                        }}
                      >
                        {categoryIndex === 0 ? '⚛️' : categoryIndex === 1 ? '🚀' : categoryIndex === 2 ? '🛠️' : '💻'}
                      </div>
                      <h3
                        className="text-2xl font-bold text-green-400 mb-4"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        {category.title || 'Skills Category'}
                      </h3>
                      <p 
                        className="text-gray-300 text-sm"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        Hover to view skills
                      </p>
                      <div className="mt-4 w-full h-1 bg-gray-700 rounded">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded animate-pulse"
                          style={{ width: '60%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Back Side - Skills Progress */}
                  <div
                    className="skill-card-back absolute inset-0 bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-green-500/60 backface-hidden"
                    style={{
                      boxShadow: '0 10px 30px rgba(0, 255, 65, 0.2)',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <h3
                      className="text-lg font-bold text-green-400 mb-6 text-center"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {category.title || 'Skills'}
                    </h3>

                    <div className="space-y-4 overflow-y-auto max-h-80">
                      {(category.skills || []).map((skill, skillIndex) => (
                        <div key={skill.name || skillIndex} className="skill-item">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {skill.icon || '💻'}
                              </span>
                              <span
                                className="text-white font-medium text-sm"
                                style={{ fontFamily: 'Rajdhani, sans-serif' }}
                              >
                                {skill.name || 'Skill'}
                              </span>
                            </div>
                            <span
                              className="text-green-400 font-bold text-sm"
                              style={{ fontFamily: 'Orbitron, monospace' }}
                            >
                              {skill.level || 0}%
                            </span>
                          </div>

                          <div
                            className="skill-bar h-2 bg-gray-700 rounded-full overflow-hidden"
                            style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' }}
                          >
                            <div
                              className="skill-bar-fill h-full rounded-full transition-all duration-1000 delay-300"
                              data-level={skill.level || 0}
                              style={{
                                background: 'linear-gradient(90deg, #00FF41, #00CC33)',
                                boxShadow: '0 0 8px #00FF41',
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
        ) : (
          <div className="text-center text-gray-300">
            No skills data available.
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
