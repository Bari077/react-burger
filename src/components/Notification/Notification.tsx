import { FC, ReactNode, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../Modal-Overlay/Modal-Overlay';
import notificationStyle from './Notification.module.css';


interface INotificationProps {
    children: ReactNode;
    onClose: ()=> void;
}

export const Notification: FC<INotificationProps> = ({onClose, ...props})=> {
    const noteRoot = document.getElementById('react-notes') as HTMLElement; 

    const handleOverlayClose: MouseEventHandler<HTMLDivElement> =(e)=> {
        e.stopPropagation();
        e.currentTarget && onClose();
     }

    return ReactDOM.createPortal(
        (<div className={`${notificationStyle.modal} text text_type_main-default`}>
            <ModalOverlay onClick={handleOverlayClose}/>
            <div className={notificationStyle.container}>
                <p className={notificationStyle.note}>{props.children}</p>                
            </div>                            
        </div>),
        noteRoot
    );
}
