import {ResponseTypeProfile} from '../../API/Api'


export interface stateProps {
    profile?: ResponseTypeProfile

}


const initialState = {
    profile: undefined
}


//Type
export enum ActionType {
    SET_PROFILE = 'PROFILE/SET_PROFILE',
    CLEAN_PROFILE = 'PROFILE/CLEAN_PROFILE'
}


//actions

// interface Action<T> {
//     type: ActionType,
//     payload: T
//
// }







const ProfileReducer = (state: stateProps  = initialState, action: ActionProfileType): stateProps  => {
    switch (action.type) {

        case ActionType.SET_PROFILE:
            return {...state, profile: {...action.payload}}
        case ActionType.CLEAN_PROFILE:
            return {...state, profile: undefined}
        default: return  state
    }

}

export const setProfileAc = (profile: ResponseTypeProfile ) => {
    return {type: ActionType.SET_PROFILE, payload: profile} as const
}
export const cleanProfile = () => {
    return {type:ActionType.CLEAN_PROFILE} as const
}

export type ActionProfileType = ReturnType<typeof setProfileAc> | ReturnType<typeof cleanProfile>


export default ProfileReducer