import ReactDOM from 'react-dom';
import ModalOverlay from '../Modal-Overlay/Modal-Overlay';
import notificationStyle from './Notification.module.css';



export const Notification = ({onClose, ...props})=> {
    const noteRoot = document.getElementById('react-notes'); 

    const handleOverlayClose =(e)=> {
        e.stopPropagation();
        e.currentTarget && onClose();
     }

    return ReactDOM.createPortal(
        (<div className={`${notificationStyle.modal} text text_type_main-default`}>
            <ModalOverlay onClose={handleOverlayClose}/>
            <div className={notificationStyle.container}>
                <p className={notificationStyle.note}>{props.children}</p>                
            </div>                            
        </div>),
        noteRoot
    );
}
