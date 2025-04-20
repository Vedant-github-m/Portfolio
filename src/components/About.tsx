'use client';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the AboutScene component with no SSR
const AboutScene = dynamic(() => import('./AboutScene'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#915eff', animation: 'pulse 1.5s infinite' }} />
    </div>
  ),
});

const About = () => {
  return (
    <div id="about" style={{ padding: '80px 20px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ color: '#aaa6c3', fontWeight: '500', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Introduction</p>
          <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 'bold' }}>About Me.</h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ 
              marginTop: '20px', 
              color: '#aaa6c3', 
              fontSize: '17px',
              flex: '1 1 500px',
              lineHeight: '1.8'
            }}
          >
            <p style={{ marginBottom: '20px' }}>
              I'm a passionate web developer and graphic designer with a keen eye for creating visually stunning and user-friendly digital experiences. With a solid foundation in both front-end and back-end technologies, I bring a holistic approach to every project.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              My journey in the world of development began 2 years ago, and since then I've worked on a diverse range of projects from responsive websites to complex web applications. I specialize in creating interactive 3D web experiences that push the boundaries of what's possible on the web.
            </p>
            
            <p>
              When I'm not coding or designing, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and tutorials. I believe in continuous learning and staying ahead of industry trends to deliver cutting-edge solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ flex: '1 1 400px', minHeight: '400px' }}
          >
            <Suspense fallback={
              <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#915eff', animation: 'pulse 1.5s infinite' }} />
              </div>
            }>
              <AboutScene />
            </Suspense>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ 
            marginTop: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ 
            backgroundColor: '#151030',
            padding: '25px', 
            borderRadius: '20px',
            flex: '1 1 200px',
            minWidth: '200px',
            boxShadow: '0px 35px 120px -15px #211e35',
          }}>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Front-End</h3>
            <p style={{ color: '#aaa6c3', marginTop: '10px', fontSize: '15px' }}>
              React, Vue, Angular, Three.js, WebGL, Tailwind CSS, GSAP
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#151030',
            padding: '25px', 
            borderRadius: '20px',
            flex: '1 1 200px',
            minWidth: '200px',
            boxShadow: '0px 35px 120px -15px #211e35',
          }}>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Back-End</h3>
            <p style={{ color: '#aaa6c3', marginTop: '10px', fontSize: '15px' }}>
              Node.js, Express, Django, GraphQL, MongoDB, PostgreSQL, Firebase
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#151030',
            padding: '25px', 
            borderRadius: '20px',
            flex: '1 1 200px',
            minWidth: '200px',
            boxShadow: '0px 35px 120px -15px #211e35',
          }}>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Design</h3>
            <p style={{ color: '#aaa6c3', marginTop: '10px', fontSize: '15px' }}>
              Adobe Creative Suite, Figma, Sketch, Blender
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 