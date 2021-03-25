import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware} from "redux";
import AuthReducer, { AuthType } from "./AuthReducer/AuthReducer";
import NewPassReducer, {NewMesActionType} from "./NewPassReducer/NewPassReducer";
import ErrorReducer from "./ErrorReducer/ErrorReducer";
import ProfileReducer, { ActionProfileType } from "./ProfileReducer/ProfileReducer";
import  RegistrationReducer from "./RegistrationReducer/RegistartionReducer";
import ResPasswordReducer, {ResPasswordType} from "./ResPassReducer/ResPasswordReducer";


import {AppReducer, AppType } from './AppReducer/AppReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import PacksPageReducer from "./PacksPageReducer/PacksPageReducer";
import CardsReducer from "./CardsReducer/CardsReducer";


const reducer = combineReducers({
    auth: AuthReducer,
    newPas: NewPassReducer,
    error: ErrorReducer,
    profile: ProfileReducer,
    registration:  RegistrationReducer,
    resPas: ResPasswordReducer,
    app: AppReducer,
    packsPage: PacksPageReducer,
    cardsPage: CardsReducer

})


const middleware = applyMiddleware(thunkMiddleware)



export const store = createStore(reducer, composeWithDevTools(middleware));



export type AppRootStateType = ReturnType<typeof reducer>
export type AppActionType = AuthType | ActionProfileType | AppType | NewMesActionType | ResPasswordType



export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionType
    >

export default store

//@ts-ignore
window.store = store;