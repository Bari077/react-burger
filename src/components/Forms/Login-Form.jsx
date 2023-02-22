import React from "react";
import formStyle from './Forms.module.css';
import { useState, useRef } from "react";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const LoginForm =()=> {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const [passwordValue, setPasswordValue] = React.useState('password')
    const onChange = e => {
        setPasswordValue(e.target.value)
    }

    return (
        <form className={formStyle.form}>
            <h2 className="text text_type_main-medium pb-6">Вход</h2>
            <Input            
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'name'}
            error={false}
            ref={inputRef}            
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
            Войти
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
                <Button htmlType="button" type="secondary" size="medium" extraClass={formStyle.additionalButton}>
                Зарегистрироваться
                </Button>
            </div>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Button htmlType="button" type="secondary" size="large" extraClass={formStyle.additionalButton}>
                Восстановить пароль
                </Button>
            </div>
        </form>
    )
}