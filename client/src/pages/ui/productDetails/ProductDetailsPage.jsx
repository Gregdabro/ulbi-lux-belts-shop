import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../../entities/model/useProductStore';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isLoading, error, fetchProductById, clearProduct } = useProductStore();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        await fetchProductById(id);
      } catch (error) {
        console.error('Ошибка при загрузке товара:', error);
      }
    };

    loadProduct();

    // Очищаем данные о товаре при размонтировании компонента
    return () => clearProduct();
  }, [id, fetchProductById, clearProduct]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка товара...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button className={styles.backButton} onClick={handleGoBack}>
          Вернуться назад
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Товар не найден</h2>
        <button className={styles.backButton} onClick={handleGoBack}>
          Вернуться назад
        </button>
      </div>
    );
  }

  return (
    <div className={styles.productDetailsPage}>
      <div className={styles.navigation}>
        <button className={styles.backButton} onClick={handleGoBack}>
          ← Назад
        </button>
        <Link to="/products" className={styles.allProductsLink}>
          Все товары
        </Link>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className={styles.productImage} 
            />
          ) : (
            <div className={styles.noImage}>Нет изображения</div>
          )}
          {!product.inStock && <div className={styles.outOfStock}>Нет в наличии</div>}
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.title}</h1>
          
          <div className={styles.productMeta}>
            <span className={styles.productCategory}>Категория: {product.category}</span>
            {product.quantity > 0 && (
              <span className={styles.productQuantity}>В наличии: {product.quantity} шт.</span>
            )}
          </div>
          
          <div className={styles.productPrice}>{product.price} ₽</div>
          
          <div className={styles.productDescription}>
            <h3>Описание</h3>
            <p>{product.description}</p>
          </div>
          
          <div className={styles.actions}>
            <button 
              className={`${styles.addToCartButton} ${!product.inStock ? styles.disabled : ''}`}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
