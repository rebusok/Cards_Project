import {FC} from "react";
import ResPasswordComponent from "./ResPasswordComponent";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from 'formik';
import SuperInputText from "../../../Components/c1-SuperInputText/SuperInputText";
import style from './ResPassword.module.css'
import SuperButton from "../../../Components/c2-SuperButton/SuperButton";
import {setChekWithThunk} from "../../../Redux/ResPassReducer/ResPasswordReducer";
import {AppRootStateType} from "../../../Redux/Store";
import Spinner from "../../../Common/preloader/Spinner";
import {Redirect} from "react-router-dom";
import {RoutingType} from "../../../Routes/Routes";


interface Props {

}

type ErrorType = {
    email?: string
}


const ResPasswordContainer : FC <Props> = ({
     ...props
}) => {

    const checkWith  = useSelector((state: AppRootStateType) => state.resPas.checkWith)
    const status  = useSelector((state: AppRootStateType) => state.resPas.status)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: (values) => {
           dispatch( setChekWithThunk(values.email) )
            formik.resetForm();
        },
        validate: (values) => {
            const errors: ErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        }
    });


    if(status === "loading") {
        return <Spinner/>
    } else if (status === "failed") {
        return (
            <div>
                <h1>something wrong</h1>
            </div>
        )
    }

    if (checkWith) {
        return  <Redirect to={RoutingType.auth}/>
    }

    return (
        <div className={style.res_Password_wrapper}>

        <ResPasswordComponent title = {'Reset Password Page'}/>
        <form onSubmit={formik.handleSubmit}>

            <div className={style.input_style}>
                <SuperInputText
                    type={'email'}
                    placeholder={'E-mail'}
                    {...formik.getFieldProps('email')}
                />
            </div>
            {
                formik.touched.email && formik.errors.email
                    ? <div className={style.error}>{formik.errors.email}</div> : null
            }

            <SuperButton type={'submit'} >
                Send email
            </SuperButton>
        </form>
</div>
    )
}

export default ResPasswordContainer