import React, {FC, useState} from 'react';
import SuperInputText from "../../../../Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../Components/c2-SuperButton/SuperButton";
import Modal from "../../../../Components/Modal/Modal";
import {setChangeName} from "../../../../Redux/AuthReducer/AuthReducer";
import {useDispatch} from "react-redux";
import style from "../ProfileContainer.module.scss";

interface Props {
    errorMes?: string
}
const ProfileChangeName:FC<Props> = ({errorMes}) => {

    const [name, setName] = useState<string>()
    const [modal, setModal] = useState<boolean>(false)
    const dispatch = useDispatch();
    const changeNameHandler = () => {
        if (name) {
            dispatch(setChangeName(name))
            setModal(false)
        }
    }
    return (
        <>
            <span className={style.change_name} onClick={() => setModal(true)}>Change name</span>
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
                {!!errorMes? <span>errorMes</span> : null}
            </Modal>
        </>
    );
};

export default ProfileChangeName;