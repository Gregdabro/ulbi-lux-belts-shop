import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../entities/model/useAuthStore';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.scss';

export const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localLoading, setLocalLoading] = useState(false);
    const { registration, isAuth, user, isLoading } = useAuthStore();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Отладочный лог при рендере
    console.log('RegistrationForm render, isAuth:', isAuth, 'isLoading:', isLoading, 'user:', user);

    // Эффект для перенаправления при изменении состояния авторизации
    useEffect(() => {
        if (isAuth && !isLoading && !localLoading) {
            console.log('User registered, redirecting to home');
            navigate('/', { replace: true });
        }
    }, [isAuth, navigate, isLoading, localLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLocalLoading(true);

        try {
            console.log('Calling registration with:', email, password);
            await registration(email, password);
            console.log('Registration completed');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Ошибка регистрации');
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Регистрация</h2>
            
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                    Пароль
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            {error && (
                <div className={styles.error}>{error}</div>
            )}

            <button 
                type="submit" 
                className={styles.button} 
                disabled={isLoading || localLoading}
            >
                {(isLoading || localLoading) ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
        </form>
    );
};
