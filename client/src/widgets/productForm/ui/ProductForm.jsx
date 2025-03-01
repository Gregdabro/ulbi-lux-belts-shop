import { useState, useEffect } from 'react';
import styles from './ProductForm.module.scss';

export const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    inStock: true,
    quantity: 0
  });

  const [errors, setErrors] = useState({});

  // Если передан товар для редактирования, заполняем форму его данными
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price ? String(product.price) : '',
        imageUrl: product.imageUrl || '',
        category: product.category || '',
        inStock: product.inStock !== undefined ? product.inStock : true,
        quantity: product.quantity !== undefined ? product.quantity : 0
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название товара обязательно';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание товара обязательно';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Цена товара обязательна';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Цена должна быть положительным числом';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Категория товара обязательна';
    }
    
    if (formData.quantity < 0) {
      newErrors.quantity = 'Количество не может быть отрицательным';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Преобразуем числовые значения
      const processedData = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      };
      
      onSubmit(processedData);
    }
  };

  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>
        {product ? 'Редактирование товара' : 'Создание нового товара'}
      </h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Название товара*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
        />
        {errors.title && <div className={styles.errorMessage}>{errors.title}</div>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Описание товара*</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
          rows={5}
        />
        {errors.description && <div className={styles.errorMessage}>{errors.description}</div>}
      </div>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>Цена (₽)*</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`${styles.input} ${errors.price ? styles.inputError : ''}`}
          />
          {errors.price && <div className={styles.errorMessage}>{errors.price}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>Категория*</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
          />
          {errors.category && <div className={styles.errorMessage}>{errors.category}</div>}
        </div>
      </div>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>URL изображения</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="quantity" className={styles.label}>Количество</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            className={`${styles.input} ${errors.quantity ? styles.inputError : ''}`}
          />
          {errors.quantity && <div className={styles.errorMessage}>{errors.quantity}</div>}
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="inStock" className={styles.checkboxLabel}>В наличии</label>
        </div>
      </div>
      
      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className={styles.submitButton}>
          {product ? 'Сохранить изменения' : 'Создать товар'}
        </button>
      </div>
    </form>
  );
};
