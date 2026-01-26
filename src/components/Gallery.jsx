import React, { useState } from 'react';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Actual images from public folder
  const images = [
    { id: 1, src: '/_DSC0021.webp', alt: 'Gallery Image 1' },
    { id: 2, src: '/_DSC0030.webp', alt: 'Gallery Image 2' },
    { id: 3, src: '/_DSC0035.webp', alt: 'Gallery Image 3' },
    { id: 4, src: '/_DSC0048.webp', alt: 'Gallery Image 4' },
    { id: 5, src: '/_DSC0058.webp', alt: 'Gallery Image 5' },
    { id: 6, src: '/_DSC0083.webp', alt: 'Gallery Image 6' },
    { id: 7, src: '/_DSC0108.webp', alt: 'Gallery Image 7' },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <section id="gallery" style={{ padding: '20px 0', backgroundColor: '#080808' }}>
      <div className="container">
        <h2 style={{ fontSize: '4rem', marginBottom: '30px', textAlign: 'center' }}>Galería</h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {images.map((image) => (
            <div 
              key={image.id} 
              onClick={() => openModal(image)}
              style={{ 
                cursor: 'pointer', 
                overflow: 'hidden', 
                aspectRatio: '1 / 1',
                position: 'relative'
              }}
              className="gallery-item"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  transition: 'transform 0.5s ease',
                  filter: 'grayscale(100%)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.filter = 'grayscale(0%)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'grayscale(100%)';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {selectedImage && (
        <div 
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <button 
            onClick={closeModal} 
            style={{ 
              position: 'absolute', 
              top: '30px', 
              right: '30px', 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer' 
            }}
          >
            <X size={40} />
          </button>
          
          <div 
            onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing modal
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '85vh', 
                display: 'block', 
                margin: '0 auto',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)'
              }} 
            />
            <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '1.2rem', color: '#ccc' }}>
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
