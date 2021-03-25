import {ApiCards, ResponseTypeCardsData} from "../../API/Api";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../Store";
import {RequestStatusType} from "../AuthReducer/AuthReducer";
import HelperErrorCatch from "../../Utils/Helpers/HelperErrorCatch";


export interface stateProps {
    cards: Array<ResponseTypeCardsData> | null
    status: RequestStatusType,
    error: string | null,
    pageSize: number
    pageCurrent: number
    totalCount: number
}


const initialState: stateProps = {
    cards: null,
    status: "succeeded",
    error: null,
    pageSize: 3,
    pageCurrent: 1,
    totalCount: 25

}


//Type
export enum ActionType {
    GET_CARDS = "CardsContainer/GET_CARDS",
    SET_STATUS = "CardsContainer/SET_STATUS",
    SET_CARDS_TOTAL_COUNT = "CardsContainer/SET_PACKS_TOTAL_COUNT",
    SET_ERROR = "CardsContainer/SET_ERROR",
    SET_PAGE_SIZE = "CardsContainer/SET_PAGE_SIZE",
    SET_CURRENT_PAGE = "CardsContainer/SET_CURRENT_PAGE",
    SET_UPDATE_GRADE = "CardsContainer/SET_UPDATE_GRADE",
}


//actions

interface Action<T> {
    type: ActionType,
    payload: T

}

export const setCards = (cards: Array<ResponseTypeCardsData> | null): Action<Array<ResponseTypeCardsData> | null> => ({
    type: ActionType.GET_CARDS,
    payload: cards
})
export const setPageSizeAC = (pageSize: number): Action<number> => ({
    type: ActionType.SET_PAGE_SIZE,
    payload: pageSize
})
export const setCurrentPageAC = (pageCurrent: number): Action<number> => ({
    type: ActionType.SET_CURRENT_PAGE,
    payload: pageCurrent
})


export const setStatus = (status: RequestStatusType): Action<RequestStatusType> => ({
    type: ActionType.SET_STATUS,
    payload: status
})


export const getError = (error: string): Action<string> => ({
    type: ActionType.SET_ERROR,
    payload: error
})
export const setTotalCountCard = (cardTotalCount: number): Action<number> => ({
    type: ActionType.SET_CARDS_TOTAL_COUNT,
    payload: cardTotalCount
})
export const setUpdateGrade = (_id: string, grade: number, shots: number): Action<{ _id: string, grade: number, shots: number }> => ({
    type: ActionType.SET_UPDATE_GRADE,
    payload: {_id, grade, shots}
})

//thunk
export const getCardsThunk = (cardsPack_id: string, pageSize?: number, currentPage?: number) => (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>) => {
    dispatch(setStatus('loading'))
    ApiCards.getCards(cardsPack_id, pageSize, currentPage)
        .then((res) => {
            console.log('cards:', res)
            dispatch(setTotalCountCard(res.data.cardsTotalCount))
            dispatch(setCards(res.data.cards))
        })
        .catch((e) => {
            HelperErrorCatch(e, dispatch)
        })
        .finally(() => {
            dispatch(setStatus('succeeded'))
        })
};

export const addCardsThunk = (cardsPack_id: string, question: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>, getState: () => AppRootStateType) => {
        const pageSize = getState().cardsPage.pageSize
        const currentPage = getState().cardsPage.pageCurrent
        dispatch(setStatus('loading'))
        ApiCards.addCards(cardsPack_id, question)
            .then(() => {
                dispatch(getCardsThunk(cardsPack_id, pageSize, currentPage))
            })
            .catch((e) => {
                HelperErrorCatch(e, dispatch)
            })

    }


export const deleteCardsThunk = (cardsPack_id: string, _id: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>, getState: () => AppRootStateType) => {
        const pageSize = getState().cardsPage.pageSize
        const currentPage = getState().cardsPage.pageCurrent
        dispatch(setStatus('loading'))
        ApiCards.deleteCards(_id)
            .then(() => {
                dispatch(getCardsThunk(cardsPack_id, pageSize, currentPage))
            })
            .catch(e => {
                HelperErrorCatch(e, dispatch)
            })
    }

export const onChangedCardsThunk = (cardsPack_id: string, _id: string, question: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, {}, ActionsType>, getState: () => AppRootStateType) => {
        const pageSize = getState().cardsPage.pageSize
        const currentPage = getState().cardsPage.pageCurrent
        dispatch(setStatus('loading'))
        ApiCards.putCards(_id, question)
            .then(() => {
                dispatch(getCardsThunk(cardsPack_id, pageSize, currentPage))
            })
            .catch(e => {
                HelperErrorCatch(e, dispatch)
            })
}

export const onChangeGrade = (card_id:string, grade:number) => (dispatch:ThunkDispatch<AppRootStateType, {}, ActionsType>) => {
    dispatch(setStatus('loading'))
    ApiCards.setGrade(card_id, grade)
        .then(res => {
            console.log(res)
            dispatch(setStatus('succeeded'))
            dispatch(setUpdateGrade(res.data.updatedGrade.card_id, res.data.updatedGrade.grade, res.data.updatedGrade.shots))
        })
        .catch(e => {
            HelperErrorCatch(e, dispatch)
        })
}


const CardsReducer = (state: stateProps = initialState,
                      action: Action<ResponseTypeCardsData[] & string
                          & RequestStatusType & number>): stateProps => {
    switch (action.type) {
        //get cards from API
        case ActionType.GET_CARDS:
            return {
                ...state, cards: action.payload
            }
        case ActionType.SET_CARDS_TOTAL_COUNT:
            return {
                ...state, totalCount: action.payload
            }
        //status
        case ActionType.SET_STATUS:
            return {
                ...state, status: action.payload
            };
        //error
        case ActionType.SET_ERROR:
            return {...state, error: action.payload}
        case ActionType.SET_CURRENT_PAGE:
            return {...state, pageCurrent: action.payload}
        case ActionType.SET_PAGE_SIZE:
            return {...state, pageSize: action.payload}
        //updateGrade
        case ActionType.SET_UPDATE_GRADE:
            if (state.cards) {
               const {_id} = action.payload
                let newArrr = state.cards?.map(item => {
                    if (_id === item._id) {
                        return {...item, ...action.payload as {}}
                    } else {
                        return  item
                    }
                })
                return {...state, cards: newArrr
                }
            } else {
                return state
            }
        default:
            return state
    }

}


type  ActionsType = ReturnType<typeof setCards> | ReturnType<typeof setStatus> |
    ReturnType<typeof getError> | ReturnType<typeof setTotalCountCard> |
    ReturnType<typeof setUpdateGrade>


export default CardsReducer