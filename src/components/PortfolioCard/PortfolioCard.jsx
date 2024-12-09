import React, { useEffect, useState } from 'react';
import './PortfolioCard.scss';

const PortfolioCard = ({ project, onClick, show, delay }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setVisible(true);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [show, delay]);

    return (
        <div 
            className={`portfolio-card ${visible ? 'visible' : ''}`} 
            onClick={() => onClick(project)}
        >
            <img 
                src={project.image} 
                alt={`Illustration de ${project.title}`} 
                className="portfolio-card-image"
            />
            <div className="portfolio-card-overlay">
                <h3 className="portfolio-card-title">{project.title}</h3>
            </div>
        </div>
    );
};

export default PortfolioCard;
