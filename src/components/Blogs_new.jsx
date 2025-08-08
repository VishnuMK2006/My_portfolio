import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ExternalLink, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {
  const blogsRef = useRef(null);
  const carouselRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef(null);

  // Default data in case API fails
  const defaultBlogs = [
    {
      id: 1,
      title: 'Building Modern React Applications with Advanced Patterns',
      excerpt: 'Explore how to create scalable and maintainable React applications using the latest design patterns and best practices.',
      date: '2023-12-15',
      readTime: '8 min',
      category: 'Frontend',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#',
      tags: ['React', 'UI/UX', 'Responsive Design']
    },
    {
      id: 2,
      title: 'Mastering Node.js Performance Optimization',
      excerpt: 'Learn advanced optimization techniques to make your Node.js applications faster, more efficient, and highly scalable.',
      date: '2023-11-28',
      readTime: '12 min',
      category: 'Backend',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#',
      tags: ['Node.js', 'Performance', 'Optimization']
    },
    {
      id: 3,
      title: 'Full Stack Development Best Practices',
      excerpt: 'A comprehensive guide to building robust full-stack applications with modern tools and methodologies.',
      date: '2023-10-20',
      readTime: '10 min',
      category: 'Full Stack',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#',
      tags: ['Full Stack', 'Best Practices', 'Development']
    },
    {
      id: 4,
      title: 'Database Design and Optimization Strategies',
      excerpt: 'Master the art of designing efficient databases and optimizing queries for maximum performance.',
      date: '2023-09-15',
      readTime: '15 min',
      category: 'Database',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#',
      tags: ['Database', 'SQL', 'Performance']
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
        
        if (Array.isArray(json)) {
          setBlogs(json.length > 0 ? json : defaultBlogs);
        } else if (json && typeof json === 'object') {
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

  // Auto-slide functionality
  useEffect(() => {
    if (!blogs.length || isLoading) return;

    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change every 4 seconds
    };

    startAutoSlide();

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [blogs.length, isLoading]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Reset auto-slide timer
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      setTimeout(() => {
        autoSlideRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => 
            prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
          );
        }, 4000);
      }, 1000);
    }
  };

  const nextSlide = () => {
    goToSlide(currentIndex === blogs.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? blogs.length - 1 : currentIndex - 1);
  };

  // GSAP animation on scroll
  useEffect(() => {
    if (isLoading || !blogs.length) return;

    const timer = setTimeout(() => {
      gsap.fromTo('.blog-carousel-container',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: blogsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          ease: 'power3.out'
        }
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, blogs.length]);

  if (isLoading) {
    return (
      <section 
        id="blogs" 
        ref={blogsRef} 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              Loading Blogs...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="blogs" 
      ref={blogsRef} 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(45deg, #00FF41, #00CC33, #FFFFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            TECH BLOGS
          </h2>
          <p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}
          >
            Latest insights and tutorials on modern web development
          </p>
        </div>

        {blogs.length > 0 ? (
          <div className="blog-carousel-container relative">
            {/* Main Carousel */}
            <div 
              ref={carouselRef}
              className="relative h-[500px] overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)',
                border: '1px solid rgba(0, 255, 65, 0.2)'
              }}
            >
              {blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentIndex ? 'opacity-100 translate-x-0' : 
                    index < currentIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="flex h-full">
                    {/* Image Section */}
                    <div className="w-1/2 relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        style={{ filter: 'brightness(0.7)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60"></div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="w-1/2 p-8 flex flex-col justify-center">
                      <div className="mb-4">
                        <span 
                          className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                          style={{ fontFamily: 'Orbitron, monospace' }}
                        >
                          {blog.category}
                        </span>
                      </div>
                      
                      <h3 
                        className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight"
                        style={{ fontFamily: 'Orbitron, monospace' }}
                      >
                        {blog.title}
                      </h3>
                      
                      <p
                        className="text-gray-300 mb-6 text-lg leading-relaxed"
                        style={{ fontFamily: 'Rajdhani, sans-serif' }}
                      >
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(blog.tags || []).slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-sm border border-green-500/30"
                            style={{ fontFamily: 'Rajdhani, sans-serif' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                              {blog.date ? new Date(blog.date).toLocaleDateString() : 'Unknown date'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                              {blog.readTime || 'Unknown'}
                            </span>
                          </div>
                        </div>
                        
                        <a
                          href={blog.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                          style={{ 
                            fontFamily: 'Orbitron, monospace',
                            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
                          }}
                        >
                          <BookOpen size={16} />
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-green-400 rounded-full transition-all duration-300 backdrop-blur-sm border border-green-500/30"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-green-400 rounded-full transition-all duration-300 backdrop-blur-sm border border-green-500/30"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-3">
              {blogs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-green-400 scale-125' 
                      : 'bg-green-400/30 hover:bg-green-400/60'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-300">
            <p style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              No blog posts found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
