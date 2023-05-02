import formStyle from './Forms.module.css';
import { useState,
useRef,
useEffect, 
useMemo, 
FC, 
ChangeEvent, 
RefObject,
FormEventHandler } from "react";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from '../../services/auth';
import { useSelector, useDispatch } from '../../services/hooks';
import { isValidForm, isValidInput } from '../../utils/validation';


export const ProfileForm: FC =()=> {    
    
    const userInfo = useSelector(state=> state.authReducer.user);
    const dispatch = useDispatch();
    

    useEffect(()=> {
                
        if(userInfo) {
            setValues({
                ...values,
                name : userInfo.name,
                login : userInfo.email,
                password: '',
            })
        }
    },[])


    
    const [values, setValues] = useState({
        name: '',
        login: '',
        password: ''        
    });
    
    const [isValid, setIsValid] = useState({
        name: false,
        login: false,
        password: false, 
    });    

   
    
    const onChange =(e: ChangeEvent<HTMLInputElement>)=> {
        const target = e.target;
        setValues({
            ...values,
            [target.name] : target.value
        })
        setIsValid({
            ...isValid,
            [target.name] : !isValidInput(target.name, target.value)                       
        })               
    }
    
    const nameRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);

    const onEditClick = (ref: RefObject<HTMLInputElement>) => {
        setTimeout(() => ref.current?.focus(), 0);
        ref.current?.removeAttribute('disabled');
        ref.current?.classList.remove('input__textfield-disabled')                       
    };      
    
    
    const setInactive =()=> {
        if(userInfo?.name === nameRef.current?.value) {
            nameRef.current?.setAttribute('disabled', 'true');
            nameRef.current?.classList.add('input__textfield-disabled');
        } if(userInfo?.email === loginRef.current?.value) {
            loginRef.current?.setAttribute('disabled', 'true');
            loginRef.current?.classList.add('input__textfield-disabled');
        }        
    }

    const hasChanges = useMemo(()=> 
        userInfo &&  
        (userInfo.name !== values.name || userInfo.email !== values.login ||
            values.password.length),
     [userInfo, values])
    
    

    const handleSubmit: FormEventHandler<HTMLFormElement> =(evt)=> {
        const form = values.password.length ? {
            "name" : values.name,
            "email" : values.login,
            "password" : values.password
        } : {
            "name" : values.name,
            "email" : values.login,
        }
        evt.preventDefault();       
        dispatch(updateUser(form));
        nameRef.current?.setAttribute('disabled', 'true');
        nameRef.current?.classList.add('input__textfield-disabled');
        loginRef.current?.setAttribute('disabled', 'true');
        loginRef.current?.classList.add('input__textfield-disabled');
    }

    const handleCancel =()=> {
        userInfo && setValues({
            ...values,
            name : userInfo.name,
            login : userInfo.email,
            password: ''
        })
        nameRef.current?.setAttribute('disabled', 'true');
        nameRef.current?.classList.add('input__textfield-disabled');
        loginRef.current?.setAttribute('disabled', 'true');
        loginRef.current?.classList.add('input__textfield-disabled');
    }
    

    return (
        <form onSubmit={handleSubmit} className={formStyle.profileForm}>            
            <Input            
            type={'text'}
            placeholder={'Имя'}
            icon={'EditIcon'}            
            value={values.name}
            name={'name'}
            error={isValid.name}
            ref={nameRef}
            onChange={onChange}
            onIconClick={()=> onEditClick(nameRef)}            
            errorText={'Имя должно быть не менее 3-х символов'}
            size={'default'}
            extraClass="mb-6"
            onBlur={setInactive}
            disabled            
            />
            <Input            
            type={'text'}
            placeholder={'Логин'}
            icon={'EditIcon'}
            onIconClick={()=> onEditClick(loginRef)}
            onChange={onChange}
            value={values.login}
            name={'login'}
            error={isValid.login}
            ref={loginRef}            
            errorText={'Введите корректную почту'}
            size={'default'}
            extraClass="mb-6"
            onBlur={setInactive}
            disabled            
            />
            <PasswordInput
                onChange={onChange}
                value={values.password}
                name={'password'}
                icon="EditIcon"
                extraClass="mb-6"                                                
            />
            {hasChanges ?
            (<div className={formStyle.buttonContainer}>
                <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
                Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium" disabled={!isValidForm(isValid)}>
                Сохранить
                </Button>
            </div>) : null }            
        </form>
    )
}