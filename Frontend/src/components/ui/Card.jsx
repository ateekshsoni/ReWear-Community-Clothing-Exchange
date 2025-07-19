// 🃏 Reusable Card Component
// Consistent card layout and styling

import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  shadow = 'medium',
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClass = 'card';
  const variantClass = `card-${variant}`;
  const paddingClass = `card-padding-${padding}`;
  const shadowClass = `card-shadow-${shadow}`;
  const hoverClass = hover ? 'card-hover' : '';
  const clickableClass = onClick ? 'card-clickable' : '';

  const cardClass = [
    baseClass,
    variantClass,
    paddingClass,
    shadowClass,
    hoverClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'bordered', 'elevated']),
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  shadow: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  hover: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
