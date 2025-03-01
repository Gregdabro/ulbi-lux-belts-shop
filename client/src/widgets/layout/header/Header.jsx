import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { useAuthStore } from '../../../entities/model/useAuthStore'
import { APP_ROUTES, USER_ROLES } from '@shared/config/constants'

export const Header = () => {
  const { isAuth, user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={APP_ROUTES.HOME} className={styles.logo}>
          Наш магазин
        </Link>
        <nav className={styles.nav}>
          <Link to={APP_ROUTES.HOME} className={styles.link}>Главная</Link>
          <Link to={APP_ROUTES.PRODUCTS} className={styles.link}>Товары</Link>
          {isAuth ? <Link to={APP_ROUTES.PROFILE} className={styles.link}>{user.email}</Link> : <Link to={APP_ROUTES.AUTH} className={styles.link}>Войти</Link>}
          {isAuth && user?.roles?.some(role => role.value === USER_ROLES.ADMIN) && <Link to={APP_ROUTES.ADMIN} className={styles.link}>Админ-панель</Link>}
          {isAuth && <button onClick={logout} className={styles.link}>Выйти</button>}
        </nav>
      </div>
    </header>
  )
}
