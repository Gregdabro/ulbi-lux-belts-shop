import { useState } from 'react';
import { useStore } from '../../../entities/model/useStore';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, user } = useStore();
    const setLoading = useStore.getState().setLoading
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            login(email, password)
            if(user?.role === 'admin'){
                navigate('/admin', { replace: true })
            }else{
                navigate('/', { replace: true })
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка авторизации')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Вход</h2>
            
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

            <button type="submit" className={styles.button}>
                Войти
            </button>
        </form>
    )
};
