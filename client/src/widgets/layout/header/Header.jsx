import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { useStore } from '../../../entities/model/useStore'

export const Header = () => {
  const { isAuth, user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Наш магазин
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Главная</Link>
          {isAuth ? <Link to="/profile" className={styles.link}>{user.email}</Link> : <Link to="/auth" className={styles.link}>Войти</Link>}
          {isAuth && <button onClick={logout} className={styles.link}>Выйти</button>}
        </nav>
      </div>
    </header>
  )
}
