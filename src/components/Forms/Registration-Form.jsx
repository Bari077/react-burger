import formStyle from './Forms.module.css';
import { useState, useRef } from "react";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";


export const RegistrationForm =()=> {
    const [mailValue, setMailValue] = useState('');
    const inputMailRef = useRef(null);
    const [nameValue, setNamelValue] = useState('');
    const inputNameRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('password')
    const onChange = e => {
        setPasswordValue(e.target.value)
    }

    return (
        <form className={formStyle.form}>
            <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
            <Input            
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNamelValue(e.target.value)}
            value={nameValue}
            name={'name'}
            error={false}
            ref={inputNameRef}            
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            />
            <Input            
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => setMailValue(e.target.value)}
            value={mailValue}
            name={'e-mail'}
            error={false}
            ref={inputMailRef}            
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            />
            <PasswordInput
                onChange={onChange}
                value={passwordValue}
                name={'password'}
                extraClass="mb-6"
            />
            <Button extraClass="mb-20" htmlType="button" type="primary" size="medium">
            Зарегистрироваться
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Button htmlType="button" type="secondary" size="large" extraClass={formStyle.additionalButton}>
                Войти
                </Button>
            </div>
        </form>
    )
}