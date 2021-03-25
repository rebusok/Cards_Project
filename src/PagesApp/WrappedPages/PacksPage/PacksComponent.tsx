import React, {FC} from "react";
import {ResponseTypeCardsPacksData} from "../../../API/Api";
import style from './Packs.module.scss'
import {useDispatch, useSelector} from "react-redux";
import ChangeName from "./ChangeNameInput";
import {NavLink} from "react-router-dom";
import TableItem from "../../../Components/TableWrapper/TableIttem/TableItem";
import {onChangeNamePackThunk} from "../../../Redux/PacksPageReducer/PacksPageReducer";
import DeleteModal from "../../../Components/Modal/DeleteModal/DeleteModal";
import {AppRootStateType} from "../../../Redux/Store";


interface Props {
    cardPacks: ResponseTypeCardsPacksData
    onDeletePack: (id: string) => void
}

const PacksComponent: FC<Props> = ({
                                       onDeletePack, cardPacks
                                   }) => {


    const dispatch = useDispatch()
    const userId = useSelector((state: AppRootStateType) => state.profile.profile?._id)
    const onChangeNamePack = (id: string, name: string) => {
        dispatch(onChangeNamePackThunk(id, name))
    }




    return (
        < >
            <TableItem name1={cardPacks.name} name2={cardPacks.cardsCount} name3={cardPacks.updated}>
                <DeleteModal onDeleteCard={onDeletePack} id={cardPacks._id} disabled={userId !== cardPacks.user_id}/>
                <ChangeName namePack={cardPacks.name} cardsPack_id={cardPacks._id}
                            onChangeName={onChangeNamePack} disabled={userId !== cardPacks.user_id}/>
                <NavLink className={style.arrow_1} to={`/cards/${cardPacks._id}`}
                > Cards <div/></NavLink>
                {cardPacks.cardsCount > 0
                    ? <NavLink className={style.arrow_1} to={`/learn/${cardPacks._id}`}
                    > Learn <div/></NavLink>
                    : null}
            </TableItem>

        </>

    )
}


export default PacksComponent