import React, {FC, useState} from 'react';
import SuperInputText from "../../../Components/c1-SuperInputText/SuperInputText";
import Modal from "../../../Components/Modal/Modal";
import SuperButton from "../../../Components/c2-SuperButton/SuperButton";

interface Props {
    errorMes?: string,
    namePack: string,
    cardsPack_id: string,
    onChangeName: (id: string, name:string) => void
    disabled?: boolean
}

const ChangeName: FC<Props> = ({cardsPack_id, namePack, errorMes,onChangeName,disabled
                                   }) => {

    const [name, setName] = useState<string>(namePack)
    const [modal, setModal] = useState<boolean>(false)

    const changeNameHandler = () => {
        if (name) {
            onChangeName(cardsPack_id, name)
            setModal(false)
        }
    }
    return (
        <>
            <SuperButton disabled={disabled} onClick={() => setModal(true)} className='btn_table'>Change name</SuperButton>
            <Modal
                modal={modal}
                setModal={setModal}
            >
                <SuperInputText
                    value={name}
                    onChangeText={setName}
                    placeholder={'New-Name'}

                />
                <SuperButton onClick={changeNameHandler}>Change Name</SuperButton>
                {!!errorMes ? <span>errorMes</span> : null}
            </Modal>
        </>
    );
};

export default ChangeName;