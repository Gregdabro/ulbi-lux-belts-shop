import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

/**
 * Универсальный компонент поля ввода
 * 
 * @param {Object} props - Свойства компонента
 * @param {string} [props.type='text'] - Тип поля ввода
 * @param {string} [props.label] - Метка поля
 * @param {string} [props.placeholder] - Подсказка в поле
 * @param {string} [props.value] - Значение поля
 * @param {Function} [props.onChange] - Обработчик изменения значения
 * @param {Function} [props.onBlur] - Обработчик потери фокуса
 * @param {Function} [props.onFocus] - Обработчик получения фокуса
 * @param {string} [props.error] - Текст ошибки
 * @param {string} [props.helperText] - Вспомогательный текст
 * @param {boolean} [props.disabled=false] - Отключено ли поле
 * @param {boolean} [props.required=false] - Обязательно ли поле
 * @param {boolean} [props.fullWidth=false] - Растянуть поле на всю ширину контейнера
 * @param {string} [props.name] - Имя поля
 * @param {string} [props.id] - Идентификатор поля
 * @param {string} [props.className] - Дополнительные классы
 */
export const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  name,
  id,
  className = '',
  ...props
}, ref) => {
  const inputClasses = [
    styles.input,
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.container,
    fullWidth ? styles.fullWidth : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={id || name} 
          className={styles.label}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={id || name}
        name={name}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        {...props}
      />
      
      {(error || helperText) && (
        <div className={error ? styles.errorText : styles.helperText}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string
};
