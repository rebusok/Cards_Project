import { ThunkDispatch } from "redux-thunk";
import {RequestStatusType} from "../AuthReducer/AuthReducer";
import {AppRootStateType} from "../Store";
import {ApiRegistration} from "../../API/Api";


export interface dataProps {
    email: string,
    error: string | undefined
}


export interface stateProps {
    isRegistration: boolean,
    status: RequestStatusType;
    data: dataProps

}


const initialState: stateProps = {
    isRegistration: false,
    status: "succeeded",
    data : {
        email: '',
        error: undefined
    }
}


//Type
export enum ActionType {
    SET_IS_REGISTRATION = "REGISTRATION_CONTAINER/SET_IS_REGISTRATION",
    SET_STATUS = "REGISTRATION_CONTAINER/SET_STATUS",
    SET_DATA = "REGISTRATION_CONTAINER/SET_DATA",
    SET_ERROR  = "REGISTRATION_CONTAINER/SET_ERROR"
}


//actions

interface Action<T> {
    type: ActionType,
    payload: T

}


// ActionCreate
export const setRegistration = (isRegistration: boolean): Action<boolean> => ({
    type: ActionType.SET_IS_REGISTRATION,
    payload: isRegistration
});


export const setStatus = (status : RequestStatusType): Action<RequestStatusType> => ({
    type: ActionType.SET_STATUS,
    payload: status
});

export const setData = (data: {
    email: string,  error?: string | undefined
}): Action<{ email: string, error?: string | undefined }> => ({
    type: ActionType.SET_DATA,
    payload: data
})
export const setError = (error: string | undefined): Action< string | undefined > => ({
    type: ActionType.SET_ERROR,
    payload: error
})



//Thunk
export const putData = (email: string, password: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, {}, TypeActions>) => {
        dispatch(setStatus('loading'))
        ApiRegistration.register(email, password)
            .then (res => {
                dispatch(setStatus("succeeded"))
                dispatch(setRegistration(true))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.response.data.error + 'check console')
                console.log(error)
                console.log('errors:', {...e})
                dispatch(setError(error))
                dispatch(setStatus("failed"))
            })
            .finally(()=> dispatch(setRegistration(false)))
    }






const RegistrationReducer = (state: stateProps = initialState, action: Action<boolean & RequestStatusType>): stateProps => {
    switch (action.type) {
        //initial Data
        case ActionType.SET_DATA:
            return {...state, data: action.payload}
        //values from UI for push Email and password if VALID
        case ActionType.SET_ERROR: {
            return {...state, data: {...state.data, error: action.payload}}
        }
        case ActionType.SET_IS_REGISTRATION:
            return {
                ...state, isRegistration: action.payload
            };
        //values from UI for push Password
        case ActionType.SET_STATUS:
            return {
                ...state, status: action.payload
            };
    }
    return state
}


//types
type TypeActions = ReturnType<typeof setData> |
    ReturnType<typeof setRegistration> |
    ReturnType<typeof setStatus> | ReturnType<typeof setError>

export default RegistrationReducer