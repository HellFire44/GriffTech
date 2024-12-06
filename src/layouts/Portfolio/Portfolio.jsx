import React, { useState, useEffect, useRef } from "react";
import './Portfolio.scss';
import PortfolioCard from "../../components/PortfolioCard/PortfolioCard";
import Modal from "../../components/Modal/Modal";
import { Slide } from '@mui/material';
import IllustrationLesPixionautes from "../../assets/portfolio/illustration_lespixionautes.fr.webp";
import IllustrationTournament from "../../assets/portfolio/illustration_tournament.webp";
import IllustrationBoutique from "../../assets/portfolio/illustration_boutique.webp";
import IllustrationStaffboard from "../../assets/portfolio/illustration_staffboard.webp";

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showTitle, setShowTitle] = useState(false);
    const [showCards, setShowCards] = useState([]); 
    const titleRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: "Pix Tournament",
            description: `
            Le site des tournois de Pix&Motion est entièrement responsive et relié à un back-office, 
            permettant de modifier facilement les participants, classements, et autres aspects du site.`,
            image: IllustrationTournament,
            redirectionURL: "https://tournament.lespixionautes.fr/"
        },
        {
            id: 2,
            title: "LesPixionautes.fr",
            description: `Conçu pour le streamer Pix&Motion, le site LesPixionautes.fr regroupe sa chaîne Twitch et offre un espace dédié à sa communauté`,
            image: IllustrationLesPixionautes,
            redirectionURL: "https://lespixionautes.fr"
        },
        {
            id: 3,
            title: "Shop LesPixionautes.fr",
            description: `Le shop des Pixionautes.fr, conçu pour le streamer Pix&Motion, est entièrement développé sous WordPress, offrant une gestion simple et flexible des produits.`,
            image: IllustrationBoutique,
            redirectionURL: "https://boutiques.lespixionautes.fr/"
        },
        {
            id: 4,
            title: "Staffboard",
            description: `Tableau de bord sécurisé pour le staff de Pix&Motion, centralisant la gestion de tous les sites et facilitant leur administration.`,
            image: IllustrationStaffboard
        }
    ];

    const openModal = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (titleRef.current) {
                const rect = titleRef.current.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setShowTitle(true);

                    projects.forEach((_, index) => {
                        setTimeout(() => {
                            setShowCards((prevState) => {
                                const newState = [...prevState];
                                newState[index] = true; 
                                return newState;
                            });
                        }, 1000 + index * 200);
                    });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },);

    return (
        <section className="portfolio" id="section-portfolio">
            <Slide direction="left" in={showTitle} timeout={1000}>
                <h1 ref={titleRef}>&lt; Mon Portfolio /&gt;</h1>
            </Slide>

            <div className="portfolio-grid">
                {projects.map((project, index) => (
                    <PortfolioCard key={project.id} project={project} onClick={() => openModal(project)} show={showCards[index]} delay={index * 500} />
                ))}
            </div>

            <Modal project={selectedProject} isOpen={!!selectedProject} onClose={closeModal} />
        </section>
    );
};

export default Portfolio;
