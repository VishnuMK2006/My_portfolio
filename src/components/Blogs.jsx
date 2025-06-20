import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ExternalLink, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const blogsRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default data in case API fails
  const defaultBlogs = [
    {
      id: 1,
      title: 'Building Intergalactic UIs with React and Alien Design Patterns',
      excerpt: 'Explore how to create responsive user interfaces that work across different planetary atmospheres and alien device types.',
      date: '2023-12-15',
      readTime: '8 min',
      category: 'Frontend',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#',
      tags: ['React', 'UI/UX', 'Responsive Design']
    },
    {
      id: 2,
      title: 'Mastering Node.js Performance Like Diamond Head',
      excerpt: 'Learn optimization techniques inspired by Ben 10 alien abilities to make your Node.js applications indestructible.',
      date: '2023-11-28',
      readTime: '12 min',
      category: 'Backend',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#',
      tags: ['Node.js', 'Performance', 'Optimization']
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://vishnu-api.onrender.com/api/blog/');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const json = await response.json();
        
        // Handle both array and single object responses
        if (Array.isArray(json)) {
          setBlogs(json.length > 0 ? json : defaultBlogs);
        } else if (json && typeof json === 'object') {
          // If single object, wrap it in an array
          setBlogs([json]);
        } else {
          setBlogs(defaultBlogs);
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
        setBlogs(defaultBlogs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading || !blogs.length) return;

    // Wait for the next tick to ensure DOM is updated
    const timer = setTimeout(() => {
      // Get all blog-card elements
      const blogCards = gsap.utils.toArray('.blog-card');
      
      if (blogCards.length === 0) return;

      gsap.fromTo(blogCards,
        { 
          y: 100, 
          opacity: 0, 
          rotateX: 45 
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: blogsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, blogs]);

  const getCategoryColor = (category) => {
    const colors = {
      Frontend: 'from-blue-400 to-blue-600',
      Backend: 'from-green-400 to-green-600',
      DevOps: 'from-orange-400 to-orange-600',
      JavaScript: 'from-yellow-400 to-yellow-600',
      'Full Stack': 'from-purple-400 to-purple-600',
      Database: 'from-red-400 to-red-600'
    };
    return colors[category] || 'from-gray-400 to-gray-600';
  };

  if (isLoading) {
    return (
      <section 
        id="blogs" 
        ref={blogsRef} 
        className="py-20 relative"
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">Loading blogs...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="blogs"
      ref={blogsRef}
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
            My Achievements 📚
          </h2>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            New posts up on my blog—have a look!
          </p>
        </div>
        
        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id || blog.title}
                className="blog-card group cursor-pointer"
              >
                <div
                  className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-green-500/30 hover:border-green-500/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                  style={{
                    boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)',
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 46, 0.4))'
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image || 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800'}
                      alt={blog.title || 'Blog post'}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getCategoryColor(blog.category)} rounded-full text-xs font-bold text-white`}
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {blog.category || 'Uncategorized'}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {blog.title || 'Untitled Blog Post'}
                    </h3>
                    <p
                      className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3"
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {blog.excerpt || 'No excerpt available'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(blog.tags || []).slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            {blog.date ? new Date(blog.date).toLocaleDateString() : 'Unknown date'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                            {blog.readTime || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <a
                        href={blog.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <BookOpen size={12} />
                        <span>Read</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-300">
            No blog posts found.
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;