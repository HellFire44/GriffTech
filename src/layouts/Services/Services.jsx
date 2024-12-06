import React, { useState, useEffect, useRef } from 'react';
import './Services.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { Slide, Fade } from '@mui/material';

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
    const [showTitle, setShowTitle] = useState(false);
    const [showCards, setShowCards] = useState([]);
    const titleRef = useRef(null);

    // Fonction pour vérifier si l'élément est visible dans la fenêtre
    const checkIfVisible = () => {
        if (titleRef.current) {
            const rect = titleRef.current.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                setShowTitle(true);
            }
        }

        // Vérification des cartes
        servicesData.forEach((service, index) => {
            const cardRef = document.getElementById(`service-card-${service.id}`);
            if (cardRef) {
                const cardRect = cardRef.getBoundingClientRect();
                if (cardRect.top >= 0 && cardRect.bottom <= window.innerHeight) {
                    setShowCards(prev => [...prev, service.id]);
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkIfVisible);
        checkIfVisible();  // Vérifier au chargement si le titre et les cartes sont visibles

        return () => {
            window.removeEventListener('scroll', checkIfVisible);
        };
    }, []);

    return (
        <section className="section-services" id="section-services" aria-labelledby="services-heading">
            {/* Animation du titre */}
            <Slide direction="left" in={showTitle} timeout={1000}>
                <h1 id="services-heading" ref={titleRef}>
                    &lt; Mes Services /&gt;
                </h1>
            </Slide>

            <div className="services-container">
                {servicesData.map((service, index) => (
                    <ServiceCard 
                        key={service.id} 
                        service={service} 
                        showCard={showCards.includes(service.id)} 
                        index={index} 
                    />
                ))}
            </div>
        </section>
    );
}

function ServiceCard({ service, showCard, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <Fade in={showCard} timeout={1000} style={{ transitionDelay: `${index * 300}ms` }}>
            <div className="service-card" id={`service-card-${service.id}`}>
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
    );
}

export default Services;
