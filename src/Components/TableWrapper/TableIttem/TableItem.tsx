import React, { FC } from 'react';
import style from './TableItem.module.scss'

interface Props {
    name1: string
    name2?: number
    name3?: Date
}

const TableItem:FC<Props> = (props) => {
    return (
        <div className={style.card_wrapped}>
            <div className={style.card_item}>{props.name1}</div>
            <div className={style.card_item}>{props.name2}</div>
            <div className={style.card_item}>{props.name3}</div>
            <div className={`${style.card_item } ${style.card_item_btn}`}>
                {props.children}
            </div>
        </div>
    )
};

export default TableItem;