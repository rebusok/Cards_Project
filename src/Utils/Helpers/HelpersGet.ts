import { Dispatch } from "redux"
import { getPacksThunk } from "../../Redux/PacksPageReducer/PacksPageReducer"

export const HelpersGet = (isPrivat:boolean, dispatch: Dispatch<any>,pageSize:number, currentPage: number, userId:string | undefined ) => {
    if (isPrivat){
        dispatch(getPacksThunk(pageSize, currentPage, userId))
    } else {
        dispatch(getPacksThunk(pageSize, currentPage))
    }
}