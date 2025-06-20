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
          // If single object, wrap it in an array
          setSkillCategories([json]);
        } else {
          setSkillCategories(defaultSkills);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        setSkillCategories(defaultSkills);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (isLoading || !skillCategories.length) return;

    const skills = skillsRef.current;
    
    // Animate skill bars
    gsap.fromTo('.skill-bar-fill', 
      { width: '0%' },
      {
        width: (i, el) => el.dataset.level + '%',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skills,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        stagger: 0.1
      }
    );

    // Animate skill cards
    gsap.fromTo('.skill-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: skills,
          start: 'top 85%',
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
            Mastering various technologies like Ben 10 masters different alien forms
          </p>
        </div>

        {skillCategories.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title || categoryIndex}
                className="skill-card bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/30 hover:border-green-500/60 transition-all duration-300"
                style={{
                  boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)',
                  transform: 'translateZ(0)'
                }}
              >
                <h3
                  className="text-2xl font-bold text-green-400 mb-6 text-center"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  {category.title || 'Skills Category'}
                </h3>

                <div className="space-y-6">
                  {(category.skills || []).map((skill, skillIndex) => (
                    <div key={skill.name || skillIndex} className="skill-item">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {skill.icon || '💻'}
                          </span>
                          <span
                            className="text-white font-medium"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            {skill.name || 'Skill'}
                          </span>
                        </div>
                        <span
                          className="text-green-400 font-bold"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {skill.level || 0}%
                        </span>
                      </div>

                      <div
                        className="skill-bar h-3 bg-gray-700 rounded-full overflow-hidden"
                        style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)' }}
                      >
                        <div
                          className="skill-bar-fill h-full rounded-full transition-all duration-300"
                          data-level={skill.level || 0}
                          style={{
                            background: 'linear-gradient(90deg, #00FF41, #00CC33)',
                            boxShadow: '0 0 10px #00FF41',
                            width: '0%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
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