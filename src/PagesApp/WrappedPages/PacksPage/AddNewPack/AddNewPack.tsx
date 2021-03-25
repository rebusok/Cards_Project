import React, {FC, useState} from 'react';
import Modal from "../../../../Components/Modal/Modal";
import SuperInputText from "../../../../Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../Components/c2-SuperButton/SuperButton";


interface Props{
    addNewName: (name:string) => void
    disabled:boolean
}

const AddNewPack:FC<Props> = ({addNewName, disabled}) => {
    const [names, setNames] = useState<string>()

    const [modal, setModal] = useState<boolean>(false)
    const changeNameHandler = () => {
        if (names) {
            addNewName(names)
            setModal(false)
            setNames('')
        }
    }
    return (
        <>
            <SuperButton
                disabled={disabled}
                onClick={() => setModal(true)}>Add</SuperButton>
            <Modal
                modal={modal}
                setModal={setModal}
            >
                <SuperInputText
                    onChangeText={setNames}
                    placeholder={'Name pack'}
                />
                <SuperButton onClick={changeNameHandler}>Add</SuperButton>
            </Modal>
        </>
    );
};

export default AddNewPack;