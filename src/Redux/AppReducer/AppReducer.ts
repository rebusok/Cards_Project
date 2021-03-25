export interface stateProps {
    isInitial: boolean
}


const initialState: stateProps = {
    isInitial: false,
}


//Type
export enum ActionType {
    SET_INITIAL_APP = 'APP/INITIAL_APP',

}

//actions
export type AppType = ReturnType<typeof setInitialApp>


export const AppReducer = (state: stateProps = initialState, action: AppType): stateProps => {
    switch (action.type) {
        case ActionType.SET_INITIAL_APP:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setInitialApp = (isInitial:boolean) => ({type:ActionType.SET_INITIAL_APP, payload:{isInitial}})



