import { FC } from 'react';
import overlayStyle from './Modal-Overlay.module.css';

interface IModalOverlayProps {
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const ModalOverlay: FC<IModalOverlayProps> =({onClick})=> {
   
    return(
        <div className={overlayStyle.overlay} onClick={onClick}></div>
    )
}


export default ModalOverlay