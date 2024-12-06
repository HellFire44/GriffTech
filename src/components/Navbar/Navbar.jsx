import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss';
import LogoGriffTechLarge from '../../assets/logo_grifftech_large.webp';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fonction de scroll vers la section
  const handleScrollToSection = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setMenuOpen(false); // Fermer le menu après avoir cliqué sur un lien
    }
  };

  // Fonction pour remonter en haut de la page
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Gérer l'affichage du bouton "scroll-to-top"
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction pour ouvrir/fermer le menu hamburger
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img 
          src={LogoGriffTechLarge} 
          alt="Logo GriffTech" 
          className="logo_grifftech large"
        />
      </div>
      
      {/* Menu de navigation */}
      <nav aria-label="Menu de navigation principal">
        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <li><a href="#section-home" onClick={handleScrollToSection}>ACCUEIL</a></li>
          <li><a href="#section-services" onClick={handleScrollToSection}>MES SERVICES</a></li>
          <li><a href="#section-portfolio" onClick={handleScrollToSection}>PORTFOLIO</a></li>
          <li><a href="#section-contact" onClick={handleScrollToSection}>CONTACT</a></li>
        </ul>
      </nav>

      {/* Hamburger menu */}
      <div 
        className="navbar-hamburger" 
        onClick={toggleMenu} 
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={menuOpen ? 'true' : 'false'}
        aria-controls="navbar-menu"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>

      {/* Bouton de scroll vers le haut */}
      <button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={handleScrollTop}
      >
        ↑
      </button>
    </header>
  );
}

export default Navbar;
