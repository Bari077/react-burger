import React from 'react';
import modalStyle from './Modal.module.css';
import ModalOverlay from '../Modal-Overlay/Modal-Overlay';
import OrderDetails from '../Order-Details/Order-Details';
import IngredientDetails from '../Ingredient-Details/Ingredient-Details';



const Modal = props=> {
    return(
        <div className={modalStyle.modal}>
            <ModalOverlay/>
            <div className={modalStyle.container}>
                <IngredientDetails />
                <button className={modalStyle.close} type="button"></button>
            </div>                            
        </div>
    )
}

export default Modal;