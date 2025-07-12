import React, { useEffect, useRef } from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = ({ title, testimonials }) => {
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
        <section className="testimonials-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title animate-on-scroll">{title}</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="testimonial-card animate-on-scroll" 
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className="testimonial-avatar">
                                <img src={testimonial.avatar} alt={testimonial.name} />
                            </div>
                            <div className="testimonial-content">
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-author">
                                    <span className="author-name">{testimonial.name}</span>
                                    <div className="author-stats">
                                        {testimonial.stats.map((stat, statIndex) => (
                                            <span key={statIndex}>
                                                <i className={stat.icon}></i> {stat.text}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
