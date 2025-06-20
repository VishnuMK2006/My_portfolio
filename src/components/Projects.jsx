import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectsRef = useRef(null);

  // Default data in case API fails
  const defaultProjects = [
    {
      id: 1,
      name: 'ben10-portfolio',
      description: 'Interactive Ben 10 themed portfolio website with parallax animations and cosmic effects',
      html_url: 'https://github.com/username/ben10-portfolio',
      homepage: 'https://ben10-portfolio.vercel.app',
      language: 'JavaScript',
      stargazers_count: 42,
      forks_count: 8,
      topics: ['react', 'ben10', 'portfolio', 'animations', 'parallax']
    },
    {
      id: 2,
      name: 'omnitrix-ui',
      description: 'React component library inspired by Ben 10\'s Omnitrix design system',
      html_url: 'https://github.com/username/omnitrix-ui',
      homepage: 'https://omnitrix-ui.netlify.app',
      language: 'TypeScript',
      stargazers_count: 156,
      forks_count: 23,
      topics: ['react', 'component-library', 'ui', 'ben10', 'design-system']
    }
  ];

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
              <div
                key={project.id || project.name}
                className="project-card group bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)',
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 46, 0.4))'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getLanguageColor(project.language) }}
                    />
                    <span
                      className="text-sm text-gray-400"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {project.language || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.html_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-800 hover:bg-green-500 rounded-lg transition-all duration-300 group"
                    >
                      <Github size={16} className="text-green-400 group-hover:text-black" />
                    </a>
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 hover:bg-green-500 rounded-lg transition-all duration-300 group"
                      >
                        <ExternalLink size={16} className="text-green-400 group-hover:text-black" />
                      </a>
                    )}
                  </div>
                </div>

                <h3
                  className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  {project.name || 'Untitled Project'}
                </h3>

                <p
                  className="text-gray-300 mb-4 text-sm leading-relaxed"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {project.description || 'No description available'}
                </p>

                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.slice(0, 3).map(topic => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    <span>{project.stargazers_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={14} className="text-blue-400" />
                    <span>{project.forks_count || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;