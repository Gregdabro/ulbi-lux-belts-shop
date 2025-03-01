import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { useAuthStore } from '../../../entities/model/useAuthStore'

export const Header = () => {
  const { isAuth, user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Наш магазин
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Главная</Link>
          <Link to="/products" className={styles.link}>Товары</Link>
          {isAuth ? <Link to="/profile" className={styles.link}>{user.email}</Link> : <Link to="/auth" className={styles.link}>Войти</Link>}
          {isAuth && user?.roles?.some(role => role.value === 'admin') && <Link to="/admin" className={styles.link}>Админ-панель</Link>}
          {isAuth && <button onClick={logout} className={styles.link}>Выйти</button>}
        </nav>
      </div>
    </header>
  )
}
