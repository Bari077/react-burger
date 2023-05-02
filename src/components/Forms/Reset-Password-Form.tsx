import formStyle from './Forms.module.css';
import { useState, useRef, FC, ChangeEvent, FormEventHandler } from "react";
import { useSelector, useDispatch } from '../../services/hooks';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';
import { RESET_ERROR_STATUS, RESET_SUCCESS_STATUS } from '../../services/actions/user';
import { Notification } from '../Notification/Notification';
import { resetPassword } from '../../services/auth';

export const ResetPasswordForm: FC =()=> {

    const isError = useSelector(state=> state.authReducer.isError);
    const isSuccess = useSelector(state=> state.authReducer.isSuccess);

    const [mailKeyValue, setMailKeyValue] = useState('');
    const inputMailKeyRef = useRef<HTMLInputElement>(null);
    const [passwordValue, setPasswordValue] = useState('')
    const onChange = (e: ChangeEvent<HTMLInputElement> )=> {
        setPasswordValue(e.target.value)
    }

    const form = {         
        "password": passwordValue,
        "token": mailKeyValue, 
    }; 

    const navigate = useNavigate();     
    const dispatch = useDispatch();

    const note = (<Notification onClose={()=> dispatch({type: RESET_SUCCESS_STATUS})}>Пароль успешно изменен </Notification>);
    const errorNote = (<Notification onClose={()=> dispatch({type: RESET_ERROR_STATUS})}>Не удалось изменить пароль. Проверьте, правильно ли указан код из почты. </Notification>);


    const handleSubmit: FormEventHandler<HTMLFormElement> =(evt)=> { 
        evt.preventDefault();       
        dispatch(resetPassword(form, {onSuccess: ()=> handleSuccess(), onError: () => handleError()}));                                                                   
    }

    const handleSuccess = ()=> {
        setTimeout(()=> dispatch({type: RESET_SUCCESS_STATUS}), 3000);
        setTimeout(()=> navigate('/login', {state:{from: '/reset-password'}}), 3000)
    }
    
    const handleError = ()=> {
        setTimeout(()=> dispatch({type: RESET_ERROR_STATUS}), 3000);    } 



    return (
        <form onSubmit={handleSubmit} className={formStyle.form}>
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
            onChange={e => setMailKeyValue(e.target.value)}
            value={mailKeyValue}
            name={'mailKey'}
            error={false}
            ref={inputMailKeyRef}            
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            />
            <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
            Сохранить
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Button htmlType="button" type="secondary" onClick={()=> navigate(`/login`)} size="large" extraClass={formStyle.additionalButton}>
                Войти
                </Button>
            </div>
            {isSuccess && note}
            {isError && errorNote}
        </form>
    )
}