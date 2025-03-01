import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Добро пожаловать в наш магазин</h1>
        <p className={styles.subtitle}>У нас вы найдете лучшие товары по доступным ценам</p>
        <Link to="/products" className={styles.ctaButton}>Перейти к товарам</Link>
      </div>
      
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>Широкий ассортимент</h3>
          <p>Большой выбор товаров различных категорий</p>
        </div>
        <div className={styles.feature}>
          <h3>Быстрая доставка</h3>
          <p>Доставляем товары в кратчайшие сроки</p>
        </div>
        <div className={styles.feature}>
          <h3>Высокое качество</h3>
          <p>Только проверенные товары высокого качества</p>
        </div>
      </div>
    </div>
  );
};
