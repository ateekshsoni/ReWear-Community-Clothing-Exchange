import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CTASection.css';

const CTASection = ({ title, subtitle, primaryButton, secondaryButton }) => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const element = sectionRef.current?.querySelector('.cta-content');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const handlePrimaryClick = () => {
        if (primaryButton.route) {
            navigate(primaryButton.route);
        } else if (primaryButton.onClick) {
            primaryButton.onClick();
        }
    };

    const handleSecondaryClick = () => {
        if (secondaryButton.route) {
            navigate(secondaryButton.route);
        } else if (secondaryButton.onClick) {
            secondaryButton.onClick();
        }
    };

    return (
        <section className="cta-section" ref={sectionRef}>
            <div className="container">
                <div className="cta-content animate-on-scroll">
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    <div className="cta-buttons">
                        <button 
                            className="btn-primary"
                            onClick={handlePrimaryClick}
                        >
                            <i className={primaryButton.icon}></i>
                            {primaryButton.text}
                        </button>
                        {secondaryButton && (
                            <button 
                                className="btn-secondary"
                                onClick={handleSecondaryClick}
                            >
                                <i className={secondaryButton.icon}></i>
                                {secondaryButton.text}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
