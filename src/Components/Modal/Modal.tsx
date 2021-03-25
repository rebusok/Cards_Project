import React, {FC} from 'react';
import style from './Modal.module.scss'


interface ModalType {
    modal: boolean
    setModal: (value: boolean) => void
}


const Modal: FC<ModalType> = ({modal, setModal, children}) => {
    const finalModalClassName = `${style.modal} ${modal ? style.active : ""}`;
    const finalModalContentClassName = `${style.modal_content} ${modal ? style.active : ""}`;
    return (
        <div className={finalModalClassName} onClick={ () => setModal(false)}>
            <div className={finalModalContentClassName} onClick={e =>  e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;