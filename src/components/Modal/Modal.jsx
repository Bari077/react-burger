import React from 'react';
import ReactDOM from 'react-dom/client';

const modalRoot = document.getElementById('react-modals');

const Modal = (props)=> {
    const { children, header, onClose } = props;
    return ReactDOM.createPortal(
        (
            <>
                <div className="Modal">
                <div onClose={onClose}>{header}</div>
                    {children}
                </div>
                <button onClose={onClose}>закрыть</button>
            </>
        ), 
        modalRoot
    );
}

export default Modal;