import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

/**
 * Универсальный компонент карточки
 * 
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Содержимое карточки
 * @param {string} [props.variant='default'] - Вариант карточки (default, outlined, elevated)
 * @param {boolean} [props.hoverable=false] - Добавить эффект при наведении
 * @param {boolean} [props.fullWidth=false] - Растянуть карточку на всю ширину контейнера
 * @param {string} [props.className] - Дополнительные классы
 */
export const Card = ({
  children,
  variant = 'default',
  hoverable = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    hoverable ? styles.hoverable : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  hoverable: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

/**
 * Компонент заголовка карточки
 * 
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Содержимое заголовка
 * @param {string} [props.className] - Дополнительные классы
 */
export const CardHeader = ({ children, className = '', ...props }) => {
  const headerClasses = [styles.header, className].filter(Boolean).join(' ');
  
  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

/**
 * Компонент содержимого карточки
 * 
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Содержимое
 * @param {string} [props.className] - Дополнительные классы
 */
export const CardContent = ({ children, className = '', ...props }) => {
  const contentClasses = [styles.content, className].filter(Boolean).join(' ');
  
  return (
    <div className={contentClasses} {...props}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

/**
 * Компонент нижней части карточки
 * 
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Содержимое
 * @param {string} [props.className] - Дополнительные классы
 */
export const CardFooter = ({ children, className = '', ...props }) => {
  const footerClasses = [styles.footer, className].filter(Boolean).join(' ');
  
  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
