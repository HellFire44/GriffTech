import React from "react";
import './Footer.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-icons">
                    <a href="https://www.linkedin.com/in/%C3%A9milien-g-5b82a8102/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href="https://github.com/HellFire44" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
                </div>
                <p className="copyright">© 2024 GRIFFTECH Tous droits réservés</p>
            </div>
        </footer>
    );
}

export default Footer;
