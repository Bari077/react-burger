import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import modalStyle from './Modal.module.css';
import ModalOverlay from '../Modal-Overlay/Modal-Overlay';


const Modal = ({onClose, ...props})=> {
    const modalRoot = document.getElementById('react-modals');

    const handleOverlayClose =(e)=> {
       e.stopPropagation();
       e.currentTarget && onClose();
    }

    const handleEscClose =(e)=> {
        e.key === 'Escape' && onClose();
    }

    React.useEffect(()=> {        
        document.addEventListener('keydown', handleEscClose);
        return()=> {
          document.removeEventListener('keydown', handleEscClose);
        }
    },[])  

    return ReactDOM.createPortal(
        (<div className={modalStyle.modal}>
            <ModalOverlay onClose={handleOverlayClose}/>
            <div className={modalStyle.container}>
                {props.children}
                <button className={modalStyle.close} type="button" onClick={onClose}></button>
            </div>                            
        </div>),
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal;