import { useEffect, useState } from 'react';
import { useProductStore } from '../../../entities/model/useProductStore';
import { ProductCard } from '../../../widgets/productCard';
import styles from './ProductsPage.module.scss';

export const ProductsPage = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };

    loadProducts();
  }, [fetchProducts]);

  // Получаем уникальные категории из товаров
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Фильтруем товары по выбранной категории
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка товаров...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.productsPage}>
      <h1 className={styles.title}>Наши товары</h1>
      
      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category === 'all' ? 'Все товары' : category}
          </button>
        ))}
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.productItem}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Товары не найдены</p>
        </div>
      )}
    </div>
  );
};
