import {useState, useEffect} from 'react'
import LoginForm from "../../../features/ui/LoginForm/index";
import UserService from "../../../features/api/userService";
import { useStore } from '../../../entities/model/useStore';
import {STORAGE_TOKEN_KEY} from "../../../shared/config/api.config";

export const HomePage = () => {
  const { isAuth, isLoading, user, logout, checkAuth } = useStore();
  const [users, setUsers] = useState([]);

  useEffect(() => {
      if (localStorage.getItem(STORAGE_TOKEN_KEY)) {
          checkAuth()
      }
  }, [checkAuth])

  async function getUsers() {
      try {
          const response = await UserService.fetchUsers();
          setUsers(response.data);
      } catch (e) {
          console.log(e);
      }
  }

  if (isLoading) {
      return <div>Загрузка...</div>
  }

  if (!isAuth) {
      return (
          <div>
              <LoginForm/>
              <button onClick={getUsers}>Получить пользователей</button>
          </div>
      );
  }

  return (
      <div>
          <h1>{isAuth ? `Пользователь авторизован ${user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
          <h1>{user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
          <button onClick={logout}>Выйти</button>
          <div>
              <button onClick={getUsers}>Получить пользователей</button>
          </div>
          {users.map(user =>
              <div key={user.email}>{user.email}</div>
          )}
      </div>
  );
};
