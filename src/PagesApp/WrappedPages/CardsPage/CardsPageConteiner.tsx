import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../../Redux/Store";
import {ResponseTypeCardsData} from "../../../API/Api";
import CardsComponent from "./CardsComponent";
import TableWrapper from "../../../Components/TableWrapper/TableWrapper";
import {RequestStatusType} from "../../../Redux/AuthReducer/AuthReducer";
import Spinner from "../../../Common/preloader/Spinner";
import {
    addCardsThunk,
    deleteCardsThunk,
    getCardsThunk,
    onChangedCardsThunk,
    setCurrentPageAC,
    setPageSizeAC
} from "../../../Redux/CardsReducer/CardsReducer";
import Paginator from "../../../Common/Paginator/PaginatorComponent";
import SuperSelect from "../../../Components/c5-SuperSelect/SuperSelect";


interface Props {

}


const CardsPageContainer: FC<Props> = ({...props}) => {
    const totalCoutnOptions = ['3', '5', '10', '20']
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.cardsPage.status)
    const cards = useSelector<AppRootStateType, ResponseTypeCardsData[] | null>(state => state.cardsPage.cards)
    const error = useSelector<AppRootStateType, string | null> (state => state.cardsPage.error)
    const pageSize = useSelector((state: AppRootStateType) => state.cardsPage.pageSize)
    const currentPage= useSelector((state: AppRootStateType) => state.cardsPage.pageCurrent)
    const userId = useSelector((state: AppRootStateType) => state.profile.profile?._id)
    // cardsId - params from route for get Id from params
    const {cardId} = useParams<{ cardId: string }>()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCardsThunk(cardId, pageSize, currentPage))
    }, [pageSize, currentPage])







    const onAddCard = (question: string) => {
        dispatch(addCardsThunk(cardId, question))
    }
    const onDeleteCard = (id: string) => {
        dispatch(deleteCardsThunk(cardId,id))
    }

    const onChangeNameQuestion = (id: string, question: string) => {
        dispatch(onChangedCardsThunk(cardId, id, question ))
    }
    const onChangeOption = (option: string) => {
        dispatch(setPageSizeAC(+option))
    }
    const onPageChangeHandler = (pageNumber: number) => {
        dispatch(setCurrentPageAC(pageNumber))
    }

    return (<div>
                <div>{error}</div>
        <TableWrapper onClickHandler={onAddCard} title1={'Name'} title2={'Rating'} title3={'Updated'} disabled={ !!cards?.find(item => item.user_id !== userId) || status === "loading"}>
            { status === "loading"? <Spinner /> : cards ?
                cards?.map((item, inx) => {
                    return (<CardsComponent key={cardId + inx} cards={item}
                                            onDeleteCard = {onDeleteCard}
                                            onChangeNameQuestion = {onChangeNameQuestion}
                                            disabled={userId !== item.user_id}
                    />)

                }) : null
            }
            <Paginator totalCount={cards ? cards.length : 1} pageSize={pageSize} currentPage={currentPage} onPageChangeHandler={onPageChangeHandler}/>
            <div>Page size: <SuperSelect options={totalCoutnOptions} onChangeOption={onChangeOption}/></div>
        </TableWrapper>

    </div>)
}
export default CardsPageContainer