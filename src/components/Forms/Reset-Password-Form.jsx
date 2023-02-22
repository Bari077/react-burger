import formStyle from './Forms.module.css';
import { useState, useRef } from "react";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPasswordForm =()=> {

    const [value, setValue] = useState('');
    const inputCodeRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('')
    const onChange = e => {
        setPasswordValue(e.target.value)
    }

    return (
        <form className={formStyle.form}>
            <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>           
            <PasswordInput
                placeholder={'Введите новый пароль'}
                onChange={onChange}
                value={passwordValue}
                name={'password'}
                extraClass="mb-6"
            />
            <Input            
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'code'}
            error={false}
            ref={inputCodeRef}            
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            />
            <Button extraClass="mb-20" htmlType="button" type="primary" size="medium">
            Сохранить
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Button htmlType="button" type="secondary" size="large" extraClass={formStyle.additionalButton}>
                Войти
                </Button>
            </div>
        </form>
    )
}