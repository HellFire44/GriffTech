import React, { useEffect, useState, useMemo } from 'react';
import './Home.scss';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

function Home() {
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [visibleLines, setVisibleLines] = useState([]); 
    const [showButtons, setShowButtons] = useState(false);

    const textLines = useMemo(() => [
        "Passionné par la création de sites web innovants et fonctionnels,",
        "je mets à profit mon expertise en développement pour transformer vos idées en une réalité digitale",
        "unique. Que vous ayez besoin d'un site élégant, d'une solution technique personnalisée",
        "ou d'une optimisation efficace, je vous accompagne à chaque étape avec soin et précision.",
        "Ensemble, faisons de votre projet web un véritable succès !"
    ], []); 

    useEffect(() => {
        setTimeout(() => {
            setIsPageLoaded(true);
        }, 500);
    }, []);

    useEffect(() => {
        if (isPageLoaded) {
            const textDelay = 1500;

            textLines.forEach((_, index) => {
                setTimeout(() => {
                    setVisibleLines((prev) => [...prev, index]);
                }, textDelay + 200 * index);
            });

            setTimeout(() => {
                setShowButtons(true);
            }, 200 * textLines.length + textDelay + 500);
        }
    }, [isPageLoaded, textLines]);

    // Fonction pour scroller vers une section spécifique
    const handleScrollToSection = (id) => {
        const targetElement = document.querySelector(id);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <>
            <div className="layer-background">
                <div className="ellipse" aria-hidden="true"></div>
                <div className="ellipse" aria-hidden="true"></div>
                <div className="ellipse" aria-hidden="true"></div>
            </div>
            <section className="section-home" id="section-home">
                {/* Titre avec délai d'animation */}
                <Slide direction="left" in={isPageLoaded} timeout={2000}>
                    <h1 className="title-primary">
                        <span className="griff">&lt;Griff</span>
                        <span className="tech">Tech/&gt;</span>
                    </h1>
                </Slide>

                {/* Sous-titre avec délai d'animation */}
                <Slide direction="right" in={isPageLoaded} timeout={1200}>
                    <h3 className="subheading">
                        L'avenir du <strong>Web</strong> à portée de main
                    </h3>
                </Slide>

                {/* Texte principal ligne par ligne avec délai */}
                <div className="text-paragraphe">
                    {textLines.map((line, index) => (
                        <Slide key={index} direction={index % 2 === 0 ? 'right' : 'left'} in={visibleLines.includes(index)} timeout={1000}>
                            <p className="animated-text">{line}</p>
                        </Slide>
                    ))}
                </div>

                {/* Boutons avec délai d'animation */}
                {showButtons && (
                    <div className="button-container">
                        <Grow in={showButtons} timeout={500}>
                            <button className="button-services" onClick={() => handleScrollToSection('#section-services')}>
                                Mes Services
                            </button>
                        </Grow>
                        <Grow in={showButtons} timeout={500}>
                            <button className="button-contact" onClick={() => handleScrollToSection('#section-contact')}>
                                Contact
                            </button>
                        </Grow>
                    </div>
                )}
            </section>
        </>
    );
}

export default Home;
