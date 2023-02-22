import React from "react";
import formStyle from './Forms.module.css';
import { useState, useRef } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPasswordForm =()=> {

    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    return (
        <form className={formStyle.form}>
            <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
            <Input            
            type={'text'}
            placeholder={'Укажите e-mail'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'e-mail'}
            error={false}
            ref={inputRef}            
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            />           
            <Button extraClass="mb-20" htmlType="button" type="primary" size="medium">
            Восстановить
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Button htmlType="button" type="secondary" size="medium" extraClass={formStyle.additionalButton}>
                Войти
                </Button>
            </div>
        </form>
    )
}