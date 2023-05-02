interface IObjectIsValidInputs {
    [name: string] : boolean
}

export const isValidForm =(objectIsValidInputs: IObjectIsValidInputs)=> {
    return Object.values(objectIsValidInputs).every(item=> item === false)
}

export const isValidInput =(name: string, value: string)=> {
    if(name === 'name') {
        return value || value === '' ? value.length > 2 : true
    } if(name === 'login') {
        const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value || value === '' ? regExp.test(value) : true;
    } if(name === 'password') {            
        return value?.length ? value.length > 5 : true;
    }
}