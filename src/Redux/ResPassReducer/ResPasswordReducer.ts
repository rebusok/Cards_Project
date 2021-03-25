import {RequestStatusType} from "../AuthReducer/AuthReducer";
import {AppThunk} from "../Store";
import {ApiAuth} from "../../API/Api";

export interface stateProps {
    checkWith: boolean
    status: RequestStatusType
}


const initialState: stateProps = {
    checkWith: false,
    status: "succeeded"
}


//Type
export enum ActionType {
    SET_CHECK_WITH = 'RES-PASS/SET-CHECK-WITH',
    SET_STATUS = 'RES-PASS/SET_STATUS'
}


//actions

export const setStatus = (status: RequestStatusType) => ({type: ActionType.SET_STATUS, payload: {status}})
export const setChekWith = (checkWith: boolean) => ({type: ActionType.SET_CHECK_WITH, payload: {checkWith}})


const ResPasswordReducer = (state: stateProps = initialState, action: ResPasswordType): stateProps => {
    switch (action.type) {
        case ActionType.SET_STATUS: {
            return {...state, ...action.payload}
        }
        case ActionType.SET_CHECK_WITH: {
            return {...state, ...action.payload}
        }
    }
    return state
}

export const setChekWithThunk = (email: string): AppThunk => async (dispatch) => {
    dispatch(setStatus('loading'))
    try {
        await ApiAuth.recovery(email)
        dispatch(setChekWith(true))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error)
        dispatch(setStatus('failed'))
    }

}

export type ResPasswordType = ReturnType<typeof setStatus> | ReturnType<typeof setChekWith>

export default ResPasswordReducer