import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../Redux/Store";
import {Link, Redirect} from "react-router-dom";
import {RoutingType} from "../../../Routes/Routes";
import {setLogOut} from "../../../Redux/AuthReducer/AuthReducer";
import Spinner from "../../../Common/preloader/Spinner";
import style from './ProfileContainer.module.scss'
import ProfileChangeName from "./ProfileChangeName/ProfileChangeName";

interface Props {

}

const ProfileContainer: FC<Props> = () => {
    const isLogin = useSelector((state: AppRootStateType) => state.auth.isLogin)
    const profile = useSelector((state: AppRootStateType) => state.profile.profile)
    const status = useSelector((state: AppRootStateType) => state.auth.status)
    const errorMes = useSelector((state: AppRootStateType) => state.auth.errorMes)
    const dispatch = useDispatch();

    useEffect(() => {

    })

    if (!isLogin || !profile) {
        return <Redirect to={'/auth'}/>
    }
    const logOutHandler = () => {
        dispatch(setLogOut())
    }
    if (status === "loading") {
        return <Spinner/>
    } else if (status === "failed") {
        return (
            <div>
                <h1>something wrong</h1>
            </div>
        )
    }
    if (profile) {
        return (
            <div className={style.profile_main_wrapper}>
                <div>
                    <h1>Profile</h1>
                </div>
                <div className={style.profile_item_wrapper}>
                    <div className={style.profile_item}><span className={style.item_title}>E-mail:</span> <span>{profile.email}</span></div>
                    <div className={style.profile_item}><span className={style.item_title}>name:</span> <span>{profile.name}</span>
                        <ProfileChangeName errorMes={errorMes}/>
                    </div>
                    <div className={style.profile_item}><span className={style.item_title}>id:</span><span>{profile._id}</span></div>
                </div>
                <Link to={RoutingType.auth} onClick={logOutHandler}>
                    <span>Log Out</span>
                </Link>

            </div>)
    } else {
        return <div/>
    }

}


export default ProfileContainer