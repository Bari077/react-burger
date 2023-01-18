import PropTypes from 'prop-types';
import overlayStyle from './Modal-Overlay.module.css';

const ModalOverlay =(props)=> {

   
    return(
        <div className={overlayStyle.overlay} onClick={props.onClose}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay