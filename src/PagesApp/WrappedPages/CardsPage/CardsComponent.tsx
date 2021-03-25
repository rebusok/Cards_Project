import React, {FC, Fragment} from "react";
import {ResponseTypeCardsData} from "../../../API/Api";
import TableItem from "../../../Components/TableWrapper/TableIttem/TableItem";

import ChangeName from "../PacksPage/ChangeNameInput";
import DeleteModal from "../../../Components/Modal/DeleteModal/DeleteModal";

interface Props {
    cards: ResponseTypeCardsData,
    onDeleteCard: (id: string) => void
    onChangeNameQuestion: (cardId: string,question:string) => void
    disabled?: boolean
}

const CardsComponent: FC <Props> = ({ cards, onDeleteCard, onChangeNameQuestion, disabled

}) => {


    return (<Fragment>
        <TableItem name1={cards.question} name2={cards.rating} name3={cards.updated}>

            <DeleteModal id={cards._id} onDeleteCard={onDeleteCard} disabled={disabled}/>
            <ChangeName namePack={cards.question}
                        cardsPack_id={cards._id}
                        onChangeName = {onChangeNameQuestion}
                        disabled={disabled}
            />
        </TableItem>

    </Fragment>)
}


export default CardsComponent