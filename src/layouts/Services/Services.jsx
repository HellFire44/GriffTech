import React, { useState } from 'react';
import './Services.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { Fade } from '@mui/material';
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const servicesData = [
    // {
    //     id: 1,
    //     icon: faDiscord,
    //     title: "Bot Discord",
    //     description: `Création de bots discord personnalisés pour automatiser vos serveurs, faciliter la gestion de communauté, ou offrir des services interactifs.`,
    //     detailedDescription: `
    //         <strong>Ce que je propose :</strong><br/> 
    //         • Création de bots Discord sur mesure.<br/> 
    //         • Création d’un dashboard pour le bot.<br/> 
    //         • Maintenance régulière du bot.<br/><br/>
    //         <strong>Tarifs :</strong><br/> 
    //         • Création de Bot Discord : <strong>50€/jour</strong><br/> 
    //         • Création du Dashboard : <strong>350€/jour</strong><br/> 
    //         • Maintenance du Bot : <strong>20€/mois</strong><br/> `
    //     ,
    // },
    {
        id: 2,
        icon: faReact,
        title: "Développement Web",
        description: `Conception et développement de sites web personnalisés adaptés à vos besoins. Que vous ayez besoin d’un site vitrine, d’une boutique en ligne, etc...`,
        detailedDescription: `
            <strong>Ce que je propose :</strong><br/> 
            • Création de sites web sur mesure.<br/> 
            • Optimisation et refonte de site.<br/> 
            • Maintenance mensuelle.<br/><br/>
            <strong>Tarifs :</strong><br/> 
            • Création de sites web : <strong>300€/jour</strong><br/> 
            • Optimisation et refonte : <strong>300€/jour</strong><br/> 
            • Maintenance du site web : <strong>50€/mois</strong><br/> 
        `,
    },
    // {
    //     id: 3,
    //     icon: faNetworkWired,
    //     title: "Applications Web",
    //     description: `Développement d’applications web personnalisées pour répondre à des besoins spécifiques de gestion ou d’interaction, telles que des outils de gestion de projet.`,
    //     detailedDescription: `
    //         <strong>Ce que je propose :</strong><br/> 
    //         • Création d’applications web sur mesure.<br/> 
    //         • Intégration d'API.<br/> 
    //         • Maintenance et support.<br/><br/>
    //         <strong>Tarifs :</strong><br/> 
    //         • Création d'apps web : <strong>300€/jour</strong><br/> 
    //         • Création d'une API : <strong>150€/jour</strong><br/> 
    //         • Maintenance de l'applications : <strong>50€/mois</strong><br/> `
    //     ,
    // },
];

function Services() {
    return (
      <section className="section-services" id="section-services" aria-labelledby="services-heading">
        {/* Animation du titre */}
        <motion.h1 initial={{ x: "-100vw" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 200, delay: 0.5 }}>
          &lt; Mes Services /&gt;
        </motion.h1>
  
        <div className="services-container">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    );
  }
  
  function ServiceCard({ service }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, });
  
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleExpand = () => {
      setIsExpanded((prev) => !prev);
    };
  
    return (
      <div ref={ref}>
        <Fade in={inView} timeout={1000}>
          <div className="service-card">
            <div className={`card-inner ${isExpanded ? 'flipped' : ''}`}>
              <div className="card-front" onClick={toggleExpand}>
                <div className="icon">
                  <FontAwesomeIcon icon={service.icon} size="3x" />
                </div>
                <h2>{service.title}</h2>
                <p className="description">{service.description}</p>
                <button className="read-more">
                  Lire Plus
                  <FontAwesomeIcon icon={faArrowRight} className={`arrow ${isExpanded ? "rotated" : ""}`} />
                </button>
              </div>
              <div className="card-back" onClick={toggleExpand}>
                <div className="icon">
                  <FontAwesomeIcon icon={service.icon} size="3x" />
                </div>
                <h2>{service.title}</h2>
                <div className="detailed-description" dangerouslySetInnerHTML={{ __html: service.detailedDescription }} />
                <button className="read-less">Retour</button>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
  
  export default Services;
