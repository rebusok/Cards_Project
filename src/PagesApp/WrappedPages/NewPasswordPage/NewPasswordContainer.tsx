import React, {FC, useState} from "react";
import SuperInputText from "../../../Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../Components/c2-SuperButton/SuperButton";
import Spinner from "../../../Common/preloader/Spinner";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../Redux/Store";
import {validateInputNewPas} from "../../../Utils/Validation/ValidationPassword";
import {ChangePassword} from "../../../Redux/NewPassReducer/NewPassReducer";
import {Redirect, useHistory} from "react-router-dom";
import style from './NewPasswordContainer.module.scss'


interface Props {

}

const NewPasswordContainer: FC<Props> = () => {
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [errorMesPas, setErrorMesPas] = useState<string>('Password Required')
    const [errorMesConfirmPas, setErrorMesConfirmPas] = useState<string>('Confirm password Required\'')
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true)
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<boolean>(false)
    const errorMes = useSelector((state: AppRootStateType) => state.newPas.errorMes)
    const loading = useSelector((state: AppRootStateType) => state.newPas.loading)
    const isChange = useSelector((state: AppRootStateType) => state.newPas.changeMes)
    const dispatch = useDispatch()


    const history = useHistory()
    const regUrl = /(\/.+\/)/gm

    const token = history.location.pathname.replace(regUrl, "")

    const validPasswordValue = (value: string) => {
        validateInputNewPas(setPassword, value, setErrorMesPas, setIsValidPassword)
    }
    const validConfirmPasswordValue = (value: string) => {
        validateInputNewPas(setConfirmPassword, value, setErrorMesConfirmPas, setIsValidConfirmPassword)
        if (value !== password) {
            setIsValidConfirmPassword(true)
            setErrorMesConfirmPas('passwords must match')
        } else {
            setIsValidConfirmPassword(false)
        }
    }
    const changePasswordHandler = () => {
        if (password) {
            dispatch(ChangePassword(password, token))
        }
        setPassword('')
    }
    if(isChange) {
        return <Redirect to={'/auth'}/>
    }
    return (
        <div className={style.wrapper_main}>
            <div className={style.wrapper_items}>
                <SuperInputText
                    value={password}
                    onChangeText={validPasswordValue}
                    placeholder={'New Password'}
                    error={isValidPassword}
                    errorMes={errorMesPas}
                    setError={setIsValidPassword}
                    type={'password'}
                />
                <SuperInputText
                    value={confirmPassword}
                    onChangeText={validConfirmPasswordValue}
                    placeholder={'Confirm Password'}
                    error={isValidConfirmPassword}
                    errorMes={errorMesConfirmPas}
                    setError={setIsValidConfirmPassword}
                    type={'password'}
                />
                <div><SuperButton onClick={changePasswordHandler} disabled={loading || password !== confirmPassword}>Change
                    password</SuperButton></div>
                {loading ? <Spinner/> : null}
                {!!errorMes ? <span>errorMes</span> : null}

            </div>
        </div>)
}


export default NewPasswordContainer