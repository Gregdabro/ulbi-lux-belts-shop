import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

export const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className={styles.productCard}>
      <Link to={`/products/${product.id}`} className={styles.productLink}>
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
          <h3 className={styles.productTitle}>{product.title}</h3>
          <div className={styles.productCategory}>{product.category}</div>
          <div className={styles.productPrice}>{product.price} ₽</div>
        </div>
      </Link>
    </div>
  );
};
