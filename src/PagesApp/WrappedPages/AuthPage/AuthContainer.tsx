import {FC, useState} from "react";
import SuperInputText from "../../../Components/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import SuperCheckbox from "../../../Components/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../Components/c2-SuperButton/SuperButton";
import style from './AuthContainer.module.css'
import {AppRootStateType} from "../../../Redux/Store";
import {Redirect, NavLink} from "react-router-dom";
import {setErrorMes, setLoginT} from "../../../Redux/AuthReducer/AuthReducer";
import Spinner from "../../../Common/preloader/Spinner";
import {RoutingType} from "../../../Routes/Routes";
import {validateInputNewPas} from "../../../Utils/Validation/ValidationPassword";

interface Props {

}

const AuthContainer: FC<Props> = () => {
    const reEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    const [email, setEmail] = useState<string>('nya-admin@nya.nya')
    const [errorLog, setErrorLog] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('1qazxcvBG')
    const [errorMesLog, setErrorMesLog] = useState<string>('Login Required')
    const [errorMesPas, setErrorMesPas] = useState<string>('Password Required')
    const [errorPas, setErrorPas] = useState<boolean>(false)
    const [check, setCheck] = useState<boolean>(false)
    const isLogin = useSelector((state: AppRootStateType) => state.auth.isLogin)
    const status = useSelector((state: AppRootStateType) => state.auth.status)
    const errordata = useSelector((state: AppRootStateType) => state.auth.errorMes)

    const dispatch = useDispatch()
    const validateInputLog = (value: string) => {
        setEmail(value)
        if (value.trim() === '') {
            setErrorMesLog('Email Required')
            setErrorLog(true)

        } else if (!reEmail.test(value)) {
            setErrorLog(true)
            setErrorMesLog('Email invalid')
        } else {
            setErrorMesLog('')
            setErrorLog(false)
        }
    }
    const changeInputValuePassword = (value: string) => {
        validateInputNewPas(setPassword, value, setErrorMesPas, setErrorPas)
    }
    const logHandler = () => {

        if (email && password) {
            dispatch(setLoginT(email, password, check))
        } else {
            dispatch(setErrorMes('Password and Email Required'))
        }

    }

    if (isLogin) {
        return <Redirect to={'/profile'}/>
    }



    return (
        <div className={style.container}>
            <div className={style.auth_main}>
                <h3>Login</h3>
                <div className={style.auth_wrapper}>
                    <div className={style.input_block}>
                        <SuperInputText
                            value={email}
                            onChangeText={validateInputLog}
                            error={errorLog}
                            placeholder={'E-mail'}
                            errorMes={errorMesLog}
                            setError={setErrorLog}
                            className={'otherInput'}

                        />
                        <SuperInputText
                            value={password}
                            onChangeText={changeInputValuePassword}
                            error={errorPas}
                            placeholder={'Password'}
                            errorMes={errorMesPas}
                            setError={setErrorPas}
                            type={'password'}
                            className={'otherInput'}
                        />
                        <div className={style.auth_link}>
                            <span><NavLink to={RoutingType.registration}>Registration</NavLink></span>
                            <span><NavLink to={RoutingType.resPass}>Forgot Pas?</NavLink></span>
                        </div>
                    </div>
                    <div className={style.btn_check}>
                        <SuperCheckbox
                            onChangeChecked={setCheck}
                        > Remember </SuperCheckbox>
                        <SuperButton
                            onClick={logHandler}
                            disabled={status === 'loading'}
                        >
                            Login
                        </SuperButton>
                    </div>
                </div>
                {
                    status === 'loading'
                        ? <Spinner/>
                        : status === 'failed'
                        ? <div>
                            <h5 className={style.errorMesOp}> {errordata}</h5></div>
                        : ''

                }
            </div>
        </div>
    )

}


export default AuthContainer