import { useState } from 'react'
import styles from './AuthPage.module.scss'
import { LoginForm } from '../../../features/ui/loginForm/LoginForm'
import { RegistrationForm } from '../../../features/ui/registrationForm/RegistrationForm'

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                {isLogin ? <LoginForm /> : <RegistrationForm />}
                <div className={styles.toggle}>
                    <p>
                        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                        <button
                            className={styles.toggleButton}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Зарегистрироваться' : 'Войти'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}