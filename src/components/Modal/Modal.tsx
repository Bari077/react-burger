import React, { FC, MouseEventHandler, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './Modal.module.css';
import ModalOverlay from '../Modal-Overlay/Modal-Overlay';


interface IModalProps {
    children: ReactNode;
    onClose: ()=> void;
}

const Modal: FC<IModalProps> = ({onClose, ...props})=> {
    const modalRoot = document.getElementById('react-modals') as HTMLElement;

    const handleOverlayClose: MouseEventHandler<HTMLDivElement> =(e)=> {
       e.stopPropagation();
       e.currentTarget && onClose();
    }

    const handleEscClose = React.useCallback((e: KeyboardEvent)=> {
        e.key === 'Escape' && onClose();
        console.log(e.key)
    },
    []
    );

    React.useEffect(()=> {        
        document.addEventListener('keydown', handleEscClose);
        return()=> {
          document.removeEventListener('keydown', handleEscClose);
        }
    })  

    return ReactDOM.createPortal(
        (<div className={modalStyle.modal}>
            <ModalOverlay onClick={handleOverlayClose}/>
            <div className={modalStyle.container}>
                {props.children}
                <button className={modalStyle.close} type="button" onClick={onClose}></button>
            </div>                            
        </div>),
        modalRoot
    );
}

export default Modal;