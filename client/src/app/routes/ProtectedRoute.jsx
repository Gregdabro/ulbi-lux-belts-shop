import { Navigate } from "react-router-dom";
import { useStore } from "../../entities/model/useStore";

/**
 * Компонент для защиты маршрутов, требующих аутентификации
 * @param {Object} props - Свойства компонента
 * @param {string} [props.requiredRole] - Требуемая роль для доступа (опционально)
 * @param {string} [props.redirectPath='/auth'] - Путь для перенаправления при отсутствии доступа
 * @returns {JSX.Element} - Защищенный маршрут или перенаправление
 */
export const ProtectedRoute = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuth, user, isLoading } = useStore();
  
  // Отладочные логи
  console.log('ProtectedRoute render:', { 
    isAuth, 
    user, 
    userRole: user?.role,
    requiredRole,
    isLoading
  });

  // Если идет загрузка, показываем индикатор загрузки
  if (isLoading) {
    console.log('ProtectedRoute: Loading...');
    return <div className="app-loader">Загрузка...</div>;
  }

  // Если пользователь не авторизован, перенаправляем на страницу авторизации
  if (!isAuth) {
    console.log('ProtectedRoute: Not authenticated, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  // Если требуется определенная роль
  if (requiredRole) {
    // Проверка роли пользователя
    const hasRequiredRole = user?.role === requiredRole;
    console.log('ProtectedRoute: Role check:', { 
      userRole: user?.role, 
      requiredRole, 
      hasRequiredRole 
    });
    
    // Если у пользователя нет требуемой роли, перенаправляем на главную страницу
    if (!hasRequiredRole) {
      console.log('ProtectedRoute: Insufficient permissions, redirecting to /');
      return <Navigate to="/" replace />;
    }
  }

  // Если все проверки пройдены, отображаем защищенный контент
  console.log('ProtectedRoute: Access granted');
  return children;
};
