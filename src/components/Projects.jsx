import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 'docta-boss',
    name: 'Docta Boss',
    tagline: 'La experiencia musical completa',
    description:
      'La banda insignia del grupo. Con un repertorio que cruza fronteras, Docta Boss mezcla lo mejor del rock y pop internacional con los clásicos del rock nacional argentino. Una propuesta versátil pensada para todos los escenarios y públicos, con una energía que no deja a nadie quieto.',
    genre: 'Rock Internacional & Nacional',
    color: '#d4a017',
    icon: '🎸',
    tags: ['Rock', 'Pop', 'Nacional', 'Internacional'],
  },
  {
    id: 'docta-blue',
    name: 'Docta Blue',
    tagline: 'El alma del blues en vivo',
    description:
      'Para los que sienten el blues en el alma. Docta Blue lleva el sonido raíz del blues americano a cada show con guitarra cargada de feeling, groove profundo y una interpretación que eriza la piel. Desde Chicago hasta Córdoba, el blues es un idioma universal.',
    genre: 'Blues',
    color: '#1a6bbd',
    icon: '🎵',
    tags: ['Blues', 'Chicago Blues', 'Blues Rock'],
  },
  {
    id: 'docta-creedence',
    name: 'Docta Creedence',
    tagline: 'El tributo que merece la leyenda',
    description:
      'Siendo la primera banda de Córdoba en rendir tributo a Creedence Clearwater Revival, Docta Creedence reproduce con precisión y pasión la magia de CCR. Proud Mary, Bad Moon Rising, Have You Ever Seen The Rain... los clásicos que atraviesan generaciones, en vivo y con toda la potencia que merecen.',
    genre: 'Tributo CCR',
    color: '#8b5e2d',
    icon: '🌧️',
    tags: ['Tributo', 'CCR', 'Rock Americano', 'Clásicos'],
  },
  {
    id: 'padrijos',
    name: 'Padrijos',
    tagline: 'La sangre del rock nacional',
    description:
      'El corazón rockero de la banda. Padrijos es la propuesta más rawera del grupo, orientada al rock nacional argentino con todo su peso e identidad. Los temas que definieron generaciones en el país suenan con nueva fuerza en cada show.',
    genre: 'Rock Nacional',
    color: '#a83232',
    icon: '🤘',
    tags: ['Rock Nacional', 'Argentina', 'Rock'],
  },
  {
    id: 'midnite-special',
    name: 'Midnite Special',
    tagline: 'Noches de country bajo las estrellas',
    description:
      'Cuando cae la noche y el campo llama, Midnite Special lleva el espíritu del country americano al escenario. Ritmos inconfundibles, historias que se sienten y el calor de un buen show de country que transporta al sur profundo de Estados Unidos.',
    genre: 'Country',
    color: '#6b8e3e',
    icon: '🤠',
    tags: ['Country', 'Americana', 'Folk Rock'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

const Projects = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="proyectos" style={{ padding: '80px 0', backgroundColor: '#050505' }}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <p style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-accent)',
            fontSize: '0.9rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Nuestros Proyectos
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '20px' }}>
            Cinco bandas,<br />un solo espíritu
          </h2>
          <p style={{
            maxWidth: '600px',
            margin: '0 auto',
            color: '#888',
            fontSize: '1.1rem',
            lineHeight: '1.7',
          }}>
            Cada proyecto es un mundo musical propio. Elegí el sonido que más te mueve.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                background: hovered === project.id
                  ? `linear-gradient(145deg, #111 0%, #1a1a1a 100%)`
                  : '#0d0d0d',
                border: `1px solid ${hovered === project.id ? project.color : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '4px',
                padding: '36px 28px',
                cursor: 'default',
                transition: 'all 0.35s ease',
                overflow: 'hidden',
              }}
            >
              {/* Accent line top */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: project.color,
                opacity: hovered === project.id ? 1 : 0.3,
                transition: 'opacity 0.35s ease',
              }} />

              {/* Icon & Genre */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '2rem' }}>{project.icon}</span>
                <span style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  color: project.color,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  {project.genre}
                </span>
              </div>

              {/* Name */}
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                marginBottom: '8px',
                color: '#f0f0f0',
                lineHeight: 1,
              }}>
                {project.name}
              </h3>

              {/* Tagline */}
              <p style={{
                color: project.color,
                fontSize: '0.9rem',
                fontStyle: 'italic',
                marginBottom: '18px',
                letterSpacing: '0.5px',
              }}>
                {project.tagline}
              </p>

              {/* Divider */}
              <div style={{
                width: '40px',
                height: '2px',
                background: `rgba(255,255,255,0.1)`,
                marginBottom: '18px',
              }} />

              {/* Description */}
              <p style={{
                color: '#999',
                fontSize: '0.95rem',
                lineHeight: '1.7',
                marginBottom: '24px',
              }}>
                {project.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    border: `1px solid rgba(255,255,255,0.12)`,
                    borderRadius: '2px',
                    color: '#666',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ textAlign: 'center', marginTop: '60px' }}
        >
          <p style={{ color: '#555', fontSize: '1rem', marginBottom: '20px' }}>
            ¿Querés saber más o contratar alguno de nuestros proyectos?
          </p>
          <a href="#contact" className="btn">
            Contactanos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

