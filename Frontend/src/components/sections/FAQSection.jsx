import React, { useState, useEffect, useRef } from 'react';
import './FAQSection.css';

const FAQSection = ({ title, faqData }) => {
    const [activeFAQ, setActiveFAQ] = useState(null);
    const sectionRef = useRef(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

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
        <section className="faq-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title animate-on-scroll">{title}</h2>
                <div className="faq-container">
                    {faqData.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`faq-item animate-on-scroll ${activeFAQ === index ? 'active' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                <h3>{faq.question}</h3>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
