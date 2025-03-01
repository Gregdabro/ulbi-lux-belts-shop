import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

/**
 * Компонент загрузки
 * 
 * @param {Object} props - Свойства компонента
 * @param {string} [props.size='medium'] - Размер загрузчика (small, medium, large)
 * @param {string} [props.color='primary'] - Цвет загрузчика (primary, secondary, white)
 * @param {string} [props.className] - Дополнительные классы
 * @param {boolean} [props.fullPage=false] - Отображать на весь экран
 */
export const Loader = ({
  size = 'medium',
  color = 'primary',
  className = '',
  fullPage = false,
  ...props
}) => {
  const loaderClasses = [
    styles.loader,
    styles[size],
    styles[color],
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.container,
    fullPage ? styles.fullPage : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      <div className={loaderClasses}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  className: PropTypes.string,
  fullPage: PropTypes.bool
};
