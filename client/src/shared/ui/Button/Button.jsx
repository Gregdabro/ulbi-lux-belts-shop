import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

/**
 * Универсальный компонент кнопки
 * 
 * @param {Object} props - Свойства компонента
 * @param {string} [props.variant='primary'] - Вариант кнопки (primary, secondary, outlined, text, danger)
 * @param {string} [props.size='medium'] - Размер кнопки (small, medium, large)
 * @param {boolean} [props.fullWidth=false] - Растянуть кнопку на всю ширину контейнера
 * @param {boolean} [props.disabled=false] - Отключена ли кнопка
 * @param {Function} [props.onClick] - Обработчик клика
 * @param {string} [props.type='button'] - Тип кнопки (button, submit, reset)
 * @param {React.ReactNode} props.children - Содержимое кнопки
 * @param {string} [props.className] - Дополнительные классы
 */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outlined', 'text', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
