import formStyle from './Forms.module.css';
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router-dom';
import { resetPassword, RESET_REQUEST_STATUS } from '../../services/actions/auth';
import { Notification } from '../Notification/Notification';

export const ResetPasswordForm =()=> {

    const [isShowNote, setIsShowNote] = useState(false);
    const [isShowError, setIsShowError] = useState(false);

    const [mailKeyValue, setMailKeyValue] = useState('');
    const inputMailKeyRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('')
    const onChange = e => {
        setPasswordValue(e.target.value)
    }

    const form = {         
        "password": passwordValue,
        "token": mailKeyValue, 
    }; 

    const navigate = useNavigate();
    const success = useSelector(state=> state.authReducer.success);
    const error =  useSelector(state=> state.authReducer.error) 
    const dispatch = useDispatch();

    const note = (<Notification onClose={()=> setIsShowNote({visible: false})}>Пароль успешно изменен </Notification>);
    const errorNote = (<Notification onClose={()=> setIsShowError({visible: false})}>Не удалось изменить пароль. Проверьте, правильно ли указан код из почты. </Notification>);


    const handleSubmit =(evt)=> { 
        evt.preventDefault();       
        dispatch(resetPassword(form));                                                                   
    }

    const handleSuccess = useCallback(()=> {
        setIsShowNote({visible: true});
        dispatch({type : RESET_REQUEST_STATUS});
        setTimeout(()=> setIsShowNote({visible: false}), 3000);
        setTimeout(()=> navigate('/login', {state:{from: '/reset-password'}}), 3000)
    }, [dispatch, navigate]) 
    
    const handleError = useCallback(()=> {
        setIsShowError({visible: true});
        dispatch({type : RESET_REQUEST_STATUS});
        setTimeout(()=> setIsShowError({visible: false}), 3000);
    }, [dispatch]) 


    useEffect(()=> {
        error && handleError();
    }, [error, handleError])


    useEffect(()=> {
        success && handleSuccess();
    }, [success, handleSuccess])

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
            {isShowNote.visible && note}
            {isShowError.visible && errorNote}
        </form>
    )
}