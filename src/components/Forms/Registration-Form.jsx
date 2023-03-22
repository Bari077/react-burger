import formStyle from './Forms.module.css';
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, } from 'react-router-dom';
import { registerUser, RESET_REQUEST_STATUS } from '../../services/actions/auth';
import { Notification } from '../Notification/Notification';



export const RegistrationForm =()=> {

    const [isShowNote, setIsShowNote] = useState(false)

    const [mailValue, setMailValue] = useState('');
    const inputMailRef = useRef(null);
    const [nameValue, setNamelValue] = useState('');
    const inputNameRef = useRef(null);
    const [passwordValue, setPasswordValue] = useState('')
    const onChange = e => {
        setPasswordValue(e.target.value)
    }

    const form = {
        "email": mailValue, 
        "password": passwordValue, 
        "name": nameValue 
    };    
   

    const success = useSelector(state=> state.authReducer.success);
    const error =  useSelector(state=> state.authReducer.error) 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const note = (<Notification onClose={()=> setIsShowNote({visible: false})}>Ошибка регистрации</Notification>)      
   

    const handleSubmit =(evt)=> { 
        evt.preventDefault();       
        dispatch(registerUser(form));                                                                   
    }
   
    const handleError = useCallback(()=> {
        setIsShowNote({visible: true});
        dispatch({type : RESET_REQUEST_STATUS});
        setTimeout(()=> setIsShowNote({visible: false}), 3000);
    }, [dispatch]) 

    useEffect(()=> {
        error && handleError();
    }, [error, handleError])

    useEffect(()=> {
        success && navigate('/login');
        dispatch({type : RESET_REQUEST_STATUS});
    }, [success, navigate])

    return (
        <form onSubmit={handleSubmit} className={formStyle.form}>
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
            <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
            </Button>
            <div className={formStyle.additional}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Button htmlType="button" type="secondary" size="large" onClick={()=> navigate('/login')} extraClass={formStyle.additionalButton}>
                Войти
                </Button>
            </div> 
            {isShowNote.visible && note}           
        </form>
    )
}