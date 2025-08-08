import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

// Custom hook for parallax tilt effect
const useTiltEffect = () => {
  const tiltRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const element = tiltRef.current;
    if (!element) return;

    // Set initial 3D properties
    gsap.set(element, {
      transformPerspective: 1000,
      transformStyle: "preserve-3d"
    });

    const handleMouseMove = (e) => {
      // Cancel previous animation frame
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      requestRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Normalize mouse position (-1 to 1)
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        // Calculate tilt angles with reduced intensity for smoother effect
        const tiltX = deltaY * -12; // Reduced from -15
        const tiltY = deltaX * 12;  // Reduced from 15
        
        // Add subtle scale effect
        const scale = 1 + Math.min(Math.abs(deltaX), Math.abs(deltaY)) * 0.03;
        
        // Apply transform with immediate response
        gsap.to(element, {
          duration: 0.1, // Reduced from 0.6 for immediate response
          rotationX: tiltX,
          rotationY: tiltY,
          scale: scale,
          transformPerspective: 1000,
          ease: "none", // No easing for immediate response
          force3D: true // Hardware acceleration
        });
      });
    };

    const handleMouseEnter = () => {
      gsap.to(element, {
        duration: 0.15, // Reduced from 0.3 for faster response
        scale: 1.02,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      // Cancel any pending animation frame
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      // Reset to original position with smooth animation
      gsap.to(element, {
        duration: 0.4, // Reduced from 0.8 for faster reset
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "power2.out"
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return tiltRef;
};

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectsRef = useRef(null);

  // Default data in case API fails
  const defaultProjects = [
    {
      id: 1,
      name: 'vishnu-portfolio',
      description: 'Modern responsive portfolio website with advanced animations and interactive effects',
      html_url: 'https://github.com/username/vishnu-portfolio',
      homepage: 'https://vishnu-portfolio.vercel.app',
      language: 'JavaScript',
      stargazers_count: 42,
      forks_count: 8,
      topics: ['react', 'portfolio', 'animations', 'parallax', 'responsive']
    },
    {
      id: 2,
      name: 'modern-ui-components',
      description: 'React component library with modern design system and accessibility features',
      html_url: 'https://github.com/username/modern-ui-components',
      homepage: 'https://modern-ui-components.netlify.app',
      language: 'TypeScript',
      stargazers_count: 156,
      forks_count: 23,
      topics: ['react', 'component-library', 'ui', 'accessibility', 'design-system']
    }
  ];

  // Get language color helper function
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#F7DF1E',
      TypeScript: '#3178C6',
      Python: '#3776AB',
      React: '#61DAFB',
      'Node.js': '#339933'
    };
    return colors[language] || '#00FF41';
  };

  // Component for individual project card with tilt effect
  const ProjectCard = ({ project }) => {
    const tiltRef = useTiltEffect();

    return (
      <div
        ref={tiltRef}
        className="project-card group bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-500/60 transition-all duration-200 cursor-pointer"
        style={{
          boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 46, 0.4))',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
      >
        {/* Inner content with slight 3D offset */}
        <div 
          className="relative"
          style={{ 
            transform: 'translateZ(20px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: getLanguageColor(project.language),
                  transform: 'translateZ(5px)'
                }}
              />
              <span
                className="text-sm text-gray-400 transition-colors duration-300"
                style={{ 
                  fontFamily: 'Orbitron, monospace',
                  transform: 'translateZ(2px)'
                }}
              >
                {project.language || 'Unknown'}
              </span>
            </div>
            <div className="flex gap-2" style={{ transform: 'translateZ(10px)' }}>
              <a
                href={project.html_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-green-500 rounded-lg transition-all duration-300 group/btn transform hover:scale-110"
                onClick={(e) => e.stopPropagation()}
                style={{ transform: 'translateZ(5px)' }}
              >
                <Github size={16} className="text-green-400 group-hover/btn:text-black transition-colors duration-300" />
              </a>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-green-500 rounded-lg transition-all duration-300 group/btn transform hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                  style={{ transform: 'translateZ(5px)' }}
                >
                  <ExternalLink size={16} className="text-green-400 group-hover/btn:text-black transition-colors duration-300" />
                </a>
              )}
            </div>
          </div>

          <h3
            className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300"
            style={{ 
              fontFamily: 'Orbitron, monospace',
              transform: 'translateZ(8px)'
            }}
          >
            {project.name || 'Untitled Project'}
          </h3>

          <p
            className="text-gray-300 mb-4 text-sm leading-relaxed transition-colors duration-300"
            style={{ 
              fontFamily: 'Rajdhani, sans-serif',
              transform: 'translateZ(3px)'
            }}
          >
            {project.description || 'No description available'}
          </p>

          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4" style={{ transform: 'translateZ(5px)' }}>
              {project.topics.slice(0, 3).map(topic => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs transition-all duration-300 hover:bg-green-500/30"
                  style={{ 
                    fontFamily: 'Orbitron, monospace',
                    transform: 'translateZ(2px)'
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div 
            className="flex items-center gap-4 text-sm text-gray-400"
            style={{ transform: 'translateZ(3px)' }}
          >
            <div className="flex items-center gap-1 transition-colors duration-300">
              <Star size={14} className="text-yellow-400" />
              <span>{project.stargazers_count || 0}</span>
            </div>
            <div className="flex items-center gap-1 transition-colors duration-300">
              <GitFork size={14} className="text-blue-400" />
              <span>{project.forks_count || 0}</span>
            </div>
          </div>
        </div>

        {/* Subtle glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.05), rgba(0, 204, 51, 0.05))',
            transform: 'translateZ(-10px)'
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://vishnu-api.onrender.com/api/projects/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        
        // Handle both array and single object responses
        if (Array.isArray(json)) {
          setProjects(json.length > 0 ? json : defaultProjects);
        } else if (json && typeof json === 'object') {
          // If single object, wrap it in an array
          setProjects([json]);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      gsap.fromTo('.project-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          stagger: 0.15
        }
      );
    }
  }, [loading, projects]);

  return (
    <section
      id="projects"
      ref={projectsRef}
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
            PROJECTS 🚀
          </h2>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            The project included both group collaboration and individual contributions
            </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div
              className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"
              style={{ boxShadow: '0 0 20px #00FF41' }}
            />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id || project.name}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;