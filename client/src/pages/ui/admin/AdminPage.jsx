import { useAuthStore } from '../../../entities/model/useAuthStore';
import { useUserStore } from '../../../entities/model/useUserStore';
import styles from './AdminPage.module.scss';
import { useEffect, useState } from 'react';

export const AdminPage = () => {
  const { isLoading: authLoading, user } = useAuthStore();
  const { users, isLoading: usersLoading, error, fetchUsers } = useUserStore();
  const [showUsers, setShowUsers] = useState(false);
  const handleGetUsers = async () => {
    try {
      await fetchUsers();
      setShowUsers(true);
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
    }
  };

  if (authLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }
  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Админ-панель</h1>
      <p className={styles.welcome}>{user?.email} Добро пожаловать в панель администратора.</p>
      
      <div className={styles.actions}>
        <button 
          className={styles.button} 
          onClick={handleGetUsers}
          disabled={usersLoading}
        >
          {usersLoading ? 'Загрузка...' : 'Получить пользователей'}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {showUsers && (
        <div className={styles.usersContainer}>
          <h2 className={styles.subtitle}>Список пользователей</h2>
          {users.length > 0 ? (
            <ul className={styles.usersList}>
              {users.map((user) => (
                <li key={user.id} className={styles.userItem}>
                  <div className={styles.userInfo}>
                    <span className={styles.userEmail}>{user.email}</span>
                    <span className={styles.userRole}>{user.roles?.map(role => role.value).join(', ')}</span>
                    <span className={`${styles.userStatus} ${!user.isActivated ? styles.notActivated : ''}`}>
                      {user.isActivated ? 'Активирован' : 'Не активирован'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyList}>Пользователи не найдены</p>
          )}
        </div>
      )}
    </div>
  );
};
