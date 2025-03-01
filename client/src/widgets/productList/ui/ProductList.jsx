import { useState } from 'react';
import styles from './ProductList.module.scss';

export const ProductList = ({ products, onEdit, onDelete, isLoading }) => {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка товаров...</div>;
  }

  if (!products || products.length === 0) {
    return <div className={styles.emptyList}>Товары не найдены</div>;
  }

  return (
    <div className={styles.productList}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Название</div>
        <div className={styles.headerCell}>Категория</div>
        <div className={styles.headerCell}>Цена</div>
        <div className={styles.headerCell}>В наличии</div>
        <div className={styles.headerCell}>Действия</div>
      </div>
      
      {products.map(product => (
        <div key={product.id} className={styles.productItem}>
          <div className={styles.productRow} onClick={() => toggleExpand(product.id)}>
            <div className={styles.cell}>{product.title}</div>
            <div className={styles.cell}>{product.category}</div>
            <div className={styles.cell}>{product.price} ₽</div>
            <div className={styles.cell}>
              <span className={`${styles.stockStatus} ${product.inStock ? styles.inStock : styles.outOfStock}`}>
                {product.inStock ? 'Да' : 'Нет'}
              </span>
            </div>
            <div className={styles.cell}>
              <div className={styles.actions}>
                <button 
                  className={styles.editButton} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(product);
                  }}
                >
                  Изменить
                </button>
                <button 
                  className={styles.deleteButton} 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Вы уверены, что хотите удалить товар "${product.title}"?`)) {
                      onDelete(product.id);
                    }
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
          
          {expandedProductId === product.id && (
            <div className={styles.expandedContent}>
              <div className={styles.expandedRow}>
                <div className={styles.expandedLabel}>Изображение:</div>
                <div className={styles.expandedValue}>
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className={styles.productImage} 
                    />
                  ) : (
                    <span className={styles.noImage}>Нет изображения</span>
                  )}
                </div>
              </div>
              
              <div className={styles.expandedRow}>
                <div className={styles.expandedLabel}>Описание:</div>
                <div className={styles.expandedValue}>{product.description}</div>
              </div>
              
              <div className={styles.expandedRow}>
                <div className={styles.expandedLabel}>Количество:</div>
                <div className={styles.expandedValue}>{product.quantity} шт.</div>
              </div>
              
              <div className={styles.expandedRow}>
                <div className={styles.expandedLabel}>Дата создания:</div>
                <div className={styles.expandedValue}>
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              {product.updatedAt && (
                <div className={styles.expandedRow}>
                  <div className={styles.expandedLabel}>Дата обновления:</div>
                  <div className={styles.expandedValue}>
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
