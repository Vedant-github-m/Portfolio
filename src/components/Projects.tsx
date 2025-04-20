'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the ProjectCard3D component with no SSR
const ProjectCard3D = dynamic(() => import('./ProjectCard3D'), {
  ssr: false,
});

// Local storage key for projects
const PROJECTS_STORAGE_KEY = 'portfolio_projects';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'GraphixWala Website',
      description: 'Graphixwala is a creative platform offering professional graphic design, web development, and personalized social media content.',
      tags: [
        { name: 'threejs', color: 'blue-text-gradient' },
        { name: 'nextjs', color: 'green-text-gradient' },
        { name: 'tailwind', color: 'pink-text-gradient' },
      ],
      image: '/images/graphixwala.jpg',
      source_code_link: 'https://github.com',
      live_demo_link: 'https://graphixwala.com',
    },
    {
      id: '2',
      name: 'Developer Federation',
      description: '​Ricks Python Lab is an interactive educational platform that teaches Python programming through engaging, Rick and Morty-themed lessons',
      tags: [
        { name: 'react', color: 'blue-text-gradient' },
        { name: 'firebase', color: 'green-text-gradient' },
        { name: 'tailwind', color: 'pink-text-gradient' },
      ],
      image: '/images/developer-federation.jpg',
      source_code_link: 'https://github.com',
      live_demo_link: 'https://developer-federation.netlify.app',
    },
    {
      id: '3',
      name: 'Villa Panoramas Booking',
      description: 'A luxury villa booking platform featuring high-end accommodations with panoramic views, real-time availability checking, and seamless booking experience.',
      tags: [
        { name: 'react', color: 'blue-text-gradient' },
        { name: 'nextjs', color: 'green-text-gradient' },
        { name: 'tailwind', color: 'pink-text-gradient' },
      ],
      image: '/images/villa-panoramas.jpg',
      source_code_link: 'https://github.com',
      live_demo_link: 'https://preview--villa-panoramas-booking.lovable.app',
    },
  ]);

  // Load projects from local storage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects);
      } catch (error) {
        console.error('Failed to parse saved projects', error);
      }
    }
  }, []);

  // Save projects to local storage when they change
  useEffect(() => {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  return (
    <div id="work" style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <p style={{ color: '#aaa6c3', fontWeight: '500', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>My work</p>
          <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 'bold' }}>Projects.</h2>
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <p style={{ color: '#aaa6c3', fontSize: '17px', maxWidth: '600px', lineHeight: '30px' }}>
            The following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. They reflect my ability to solve complex problems, work with different technologies, and manage projects effectively.
          </p>
        </div>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}>
          {projects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              index={index}
              {...project}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects; 