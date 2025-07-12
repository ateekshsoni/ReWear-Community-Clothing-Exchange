import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

const HeroSection = ({ title, subtitle, stats, onStatsInView }) => {
    const heroRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const heroElement = heroRef.current;
        const statsElement = statsRef.current;

        if (heroElement && statsElement) {
            // Animate hero elements on load
            setTimeout(() => {
                heroElement.querySelector('.hero-title')?.classList.add('animated');
            }, 100);
            
            setTimeout(() => {
                heroElement.querySelector('.hero-subtitle')?.classList.add('animated');
            }, 400);
            
            setTimeout(() => {
                statsElement.classList.add('animated');
                if (onStatsInView) onStatsInView();
            }, 800);
        }
    }, [onStatsInView]);

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-content">
                <h1 className="hero-title animate-fade-in">{title}</h1>
                <p className="hero-subtitle animate-fade-in-delay">{subtitle}</p>
                <div className="hero-stats animate-slide-up" ref={statsRef}>
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <span className="stat-number">{stat.number.toLocaleString()}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
