import { useState } from 'react';
import { useStore } from '../../../entities/model/useStore';

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, registration } = useStore();

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={() => login(email, password)}>
                Логин
            </button>
            <button onClick={() => registration(email, password)}>
                Регистрация
            </button>
        </div>
    );
};

export default LoginForm;
