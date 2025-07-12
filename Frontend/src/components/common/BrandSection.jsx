import React from 'react';

const BrandSection = ({ 
    title, 
    subtitle, 
    features = [], 
    stats = [],
    className = ''
}) => {
    return (
        <div className={`brand-section ${className}`}>
            <div className="brand-content">
                <div className="logo">
                    <i className="fas fa-recycle"></i>
                    <span>ReWear</span>
                </div>
                <h1>{title}</h1>
                <p>{subtitle}</p>
                
                {features.length > 0 && (
                    <div className="features">
                        {features.map((feature, index) => (
                            <div key={index} className="feature">
                                <i className={feature.icon}></i>
                                <span>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                {stats.length > 0 && (
                    <div className="stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat">
                                <span className="number">{stat.number}</span>
                                <span className="label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandSection;
