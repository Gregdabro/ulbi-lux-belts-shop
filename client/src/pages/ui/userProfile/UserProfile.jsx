import { useStore } from '../../../entities/model/useStore';

export const UserProfile = () => {
  const { isLoading, user } = useStore();


  if (isLoading) {
      return <div className="app-loader">Загрузка...</div>;
  }


  return (
      <div>
          <h1>{user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
          <p>Добро пожаловать, {user.email}</p>
      </div>
  );
};
