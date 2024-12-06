import React from 'react';
import './Modal.scss';

const Modal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{project.title}</h2>
          <img  src={project.image} alt={`Site Web ${project.title}`} style={{ width: '100%', height: 'auto', borderRadius: '10px',marginTop: '1rem' }}/>
        <p>{project.description}</p>
        {project.redirectionURL && (
          <a href={project.redirectionURL} target="_blank" rel="noopener noreferrer" className="visit-site">
            Visiter le site
          </a>
        )}
      </div>
    </div>
  );
};

export default Modal;
