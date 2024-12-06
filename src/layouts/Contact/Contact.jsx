import React, { useState, useRef, useEffect } from "react";
import './Contact.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import emailjs from 'emailjs-com';
import { Slide } from "@mui/material";

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState("");
    const [showTitle, setShowTitle] = useState(false);  // Définir showTitle pour l'animation
    const [showForm, setShowForm] = useState(false); // Ajouter l'état showForm pour contrôler l'animation du formulaire
    const titleRef = useRef(null);

    const handleChange = ({ target: { name, value } }) => setFormData(prev => ({ ...prev, [name]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            setStatus("Veuillez entrer un email valide.");
            return;
        }

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            reply_to: formData.email, 
        };

        emailjs.send('service_zotqkob', 'template_1wp5kmo', templateParams, 'auSOGIWsHCrxdjIYX')
            .then((response) => {
                console.log('Email envoyé avec succès:', response);
                setStatus("Message envoyé avec succès !");
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
                setStatus("Une erreur s'est produite. Veuillez réessayer.");
            });
    };

    const checkIfVisible = () => {
        if (titleRef.current) {
            const rect = titleRef.current.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                setShowTitle(true);
                setShowForm(true); // Lorsque le titre devient visible, affiche le formulaire
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkIfVisible);
        checkIfVisible(); // Vérifie la visibilité dès le départ

        return () => {
            window.removeEventListener('scroll', checkIfVisible);
        };
    }, []);

    return (
        <section id="section-contact" className="contact" aria-labelledby="contact-heading">
            <Slide direction="left" in={showTitle} timeout={1000}>
                <h1 id="contact-heading" ref={titleRef}>&lt; Contact /&gt;</h1>
            </Slide>

            {/* Ajout de l'effet de glissement sur toute la section contact-container */}
            <Slide direction="right" in={showForm} timeout={1000}>
                <div className="contact-container">
                    <article className="contact-info" aria-labelledby="contact-description">
                        <h3>Envie d'un site à la <br /> hauteur de votre <br /> ambition ? <br /> <strong>Contactez-moi</strong></h3>
                        <div className="email-info" aria-label="Email">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span><a href="mailto:contact@grifftech.fr">contact@grifftech.fr</a></span>
                        </div>
                    </article>
                    
                    <div className="contact-forms" aria-label="Contact form">
                        <form onSubmit={handleSubmit}>
                            {['name', 'email', 'message'].map(field => (
                                <div className="form-group" key={field}>
                                    <label htmlFor={field}>
                                        {field === 'name' ? 'Nom | Prénom' : field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    {field === 'message' ? (
                                        <textarea
                                            id={field}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            rows="4"
                                            required
                                        />
                                    ) : (
                                        <input
                                            type={field === 'email' ? 'email' : 'text'}
                                            id={field}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            required
                                        />
                                    )}
                                </div>
                            ))}
                            <button type="submit">Envoyer</button>
                        </form>

                        {status && <div className="status-message">{status}</div>}
                    </div>
                </div>
            </Slide>
        </section>
    );
};

export default Contact;
