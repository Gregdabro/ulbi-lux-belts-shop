import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../../entities/model/useStore';

/**
 * Компонент для защиты маршрутов, требующих аутентификации
 * @param {Object} props - Свойства компонента
 * @param {string} [props.requiredRole] - Требуемая роль для доступа (опционально)
 * @param {string} [props.redirectPath='/auth'] - Путь для перенаправления при отсутствии доступа
 * @returns {JSX.Element} - Защищенный маршрут или перенаправление
 */
export const ProtectedRoute = ({ 
  requiredRole,
  redirectPath = '/auth',
  children 
}) => {
  const { isAuth, user, isLoading } = useStore();
  
  // Отладочная информация
  console.log('ProtectedRoute debug:');
  console.log('requiredRole:', requiredRole);
  console.log('user object:', user);
  console.log('user.role:', user.role);

  // Если идет проверка аутентификации, показываем загрузку
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // Проверка роли пользователя
  if (requiredRole) {
    console.log('Checking role:', user.role, 'Required:', requiredRole);
    
    // Строгое сравнение строк для ролей
    const userRole = String(user.role || '').trim();
    const requiredRoleStr = String(requiredRole).trim();
    
    console.log('Comparing roles:', userRole, '===', requiredRoleStr);
    
    if (userRole !== requiredRoleStr) {
      console.log('Role check failed, redirecting to home');
      return <Navigate to="/" replace />;
    }
  }

  // Если все проверки пройдены, показываем защищенный контент
  console.log('All checks passed, rendering protected content');
  return children ? children : <Outlet />;
};
