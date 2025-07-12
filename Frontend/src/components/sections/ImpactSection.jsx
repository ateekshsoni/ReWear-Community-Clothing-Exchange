import React, { useEffect, useRef } from 'react';
import './ImpactSection.css';

const ImpactSection = ({ title, impactData }) => {
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
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="impact-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title animate-on-scroll">{title}</h2>
                <div className="impact-grid">
                    {impactData.map((impact, index) => (
                        <div 
                            key={index} 
                            className="impact-card animate-on-scroll" 
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="impact-icon">
                                <i className={impact.icon}></i>
                            </div>
                            <div className="impact-content">
                                <h3>{impact.title}</h3>
                                <div className="impact-number">
                                    {impact.number.toLocaleString()}
                                    {impact.unit && <span className="impact-unit">{impact.unit}</span>}
                                </div>
                                <p>{impact.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
