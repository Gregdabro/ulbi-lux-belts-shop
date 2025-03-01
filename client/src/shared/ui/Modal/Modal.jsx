import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

/**
 * Компонент модального окна
 * 
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.isOpen - Открыто ли модальное окно
 * @param {Function} props.onClose - Обработчик закрытия
 * @param {React.ReactNode} props.children - Содержимое модального окна
 * @param {string} [props.title] - Заголовок модального окна
 * @param {boolean} [props.closeOnOverlayClick=true] - Закрывать ли при клике на оверлей
 * @param {string} [props.size='medium'] - Размер модального окна (small, medium, large, fullscreen)
 * @param {string} [props.className] - Дополнительные классы
 */
export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closeOnOverlayClick = true,
  size = 'medium',
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);
  
  // Обработка нажатия клавиши Escape
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = ''; // Возвращаем прокрутку страницы
    };
  }, [isOpen, onClose]);
  
  // Обработка клика на оверлей
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const modalClasses = [
    styles.modal,
    styles[size],
    className
  ].filter(Boolean).join(' ');
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={modalClasses} ref={modalRef} {...props}>
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
            &times;
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  closeOnOverlayClick: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fullscreen']),
  className: PropTypes.string
};
