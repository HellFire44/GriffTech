import React, { useState, useEffect, useRef } from "react";
import './Portfolio.scss';
import Modal from "../../components/Modal/Modal";
import { Slide } from '@mui/material';
import IllustrationLesPixionautes from "../../assets/portfolio/illustration_lespixionautes.fr.webp";
import IllustrationTournament from "../../assets/portfolio/illustration_tournament.webp";
import IllustrationBoutique from "../../assets/portfolio/illustration_boutique.webp";
import IllustrationStaffboard from "../../assets/portfolio/illustration_staffboard.webp";
import IllustrationPixetmotion from "../../assets/portfolio/illustration_pixetmotion.webp";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const titleRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Pix Tournament",
      description: `Le site des tournois de Pix&Motion est entièrement responsive et relié à un back-office, 
            permettant de modifier facilement les participants, classements, et autres aspects du site`,
      image: IllustrationTournament,
      redirectionURL: "https://tournament.lespixionautes.fr/",
    },
    {
      id: 2,
      title: "LesPixionautes.fr",
      description: " Conçu pour le streamer Pix&Motion, le site LesPixionautes.fr regroupe sa chaîne Twitch et offre un espace dédié à sa communauté",
      image: IllustrationLesPixionautes,
      redirectionURL: "https://lespixionautes.fr",
    },
    {
      id: 3,
      title: "Shop LesPixionautes.fr",
      description: "Le shop des Pixionautes.fr, conçu pour le streamer Pix&Motion, est entièrement développé sous WordPress, offrant une gestion simple et flexible des produits.,",
      image: IllustrationBoutique,
      redirectionURL: "https://boutiques.lespixionautes.fr/",
    },
    {
      id: 4,
      title: "Staffboard",
      description: "Tableau de bord sécurisé pour le staff de Pix&Motion, centralisant la gestion de tous les sites et facilitant leur administration.",
      image: IllustrationStaffboard,
    },
    {
      id: 5,
      title: "Pix&Motion",
      description: "Site web réalisé pour Pix&Motion, spécialisé dans l'infographie et le motion design. Ce site vitrine présente ses services, son portfolio et son expertise en création de visuels percutants et d'animations captivantes, conçus pour répondre aux besoins de ses clients",
      image: IllustrationPixetmotion,
      redirectionURL: "https://pixetmotion.com"
    },
  ];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="portfolio" id="section-portfolio">
        <h1 ref={titleRef}>&lt; Mon Portfolio /&gt;</h1>

      <div className="portfolio-container">
        {projects.map((project) => (
          <div
            className="portfolio-card"
            key={project.id}
            onClick={() => openModal(project)}
          >
            <img src={project.image} alt={project.title} />
            <div className="portfolio-card-overlay">{project.title}</div>
          </div>
        ))}
      </div>

      <Modal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeModal}
      />
    </section>
  );
};

export default Portfolio;
