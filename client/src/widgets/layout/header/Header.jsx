import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Наш магазин
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Главная</Link>
          {/* Здесь будут добавлены другие ссылки */}
        </nav>
      </div>
    </header>
  )
}
