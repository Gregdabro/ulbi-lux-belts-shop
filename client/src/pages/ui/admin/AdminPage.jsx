import {useState} from 'react'
import UserService from "../../../features/api/userService";
import { useStore } from '../../../entities/model/useStore';

export const AdminPage = () => {
  const { isLoading, user } = useStore();
  const [users, setUsers] = useState([]);


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


  return (
      <div>
          <h1>Админ-панель</h1>
          <p>{user?.email} Добро пожаловать в панель администратора.</p>
          <div>
              <button onClick={getUsers}>Получить пользователей</button>
          </div>
          {users.map(user =>
              <div key={user.email}>{user.email}</div>
          )}
      </div>
  );
};
