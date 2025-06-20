import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FloatingEmojis = () => {
  const containerRef = useRef(null);

  const emojis = ['🚀', '🪐', '✨', '⚙️', '💻', '🕰️', '🛸', '⭐', '🌌', '🔬', '🧬', '⚡'];

  useEffect(() => {
    const container = containerRef.current;
    const emojiElements = container.children;

    // Create floating animation for each emoji
    Array.from(emojiElements).forEach((emoji, index) => {
      // Random initial position
      gsap.set(emoji, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5
      });

      // Floating animation
      gsap.to(emoji, {
        y: `-=${100 + Math.random() * 200}`,
        x: `+=${-50 + Math.random() * 100}`,
        rotation: `+=${360 + Math.random() * 360}`,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 5
      });

      // Scroll-based movement
      gsap.to(emoji, {
        y: `-=${window.innerHeight * 0.5}`,
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1 + Math.random() * 2
        }
      });

      // Mouse interaction
      const handleMouseMove = (e) => {
        const rect = emoji.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          gsap.to(emoji, {
            x: `+=${deltaX * force * 0.1}`,
            y: `+=${deltaY * force * 0.1}`,
            scale: 1 + force * 0.2,
            duration: 0.3
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return React.createElement(
    'div',
    {
      ref: containerRef,
      className: 'fixed inset-0 pointer-events-none z-0',
      style: { overflow: 'hidden' }
    },
    ...emojis.map((emoji, index) =>
      React.createElement(
        'div',
        {
          key: index,
          className: 'absolute text-2xl opacity-30 hover:opacity-60 transition-opacity',
          style: {
            filter: 'drop-shadow(0 0 10px rgba(0, 255, 65, 0.3))',
            animation: `float-${index} ${8 + Math.random() * 4}s ease-in-out infinite`
          }
        },
        emoji
      )
    )
  );
};

export default FloatingEmojis;