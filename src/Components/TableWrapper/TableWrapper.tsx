import React, {FC, useState} from "react";
import AddNewPack from "../../PagesApp/WrappedPages/PacksPage/AddNewPack/AddNewPack";

import style from './TableWrapper.module.scss'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {setSortArrow, SortArrowValues} from "../../Redux/PacksPageReducer/PacksPageReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/Store";
interface Props {
    onClickHandler?: (name:string) => void,
    title1: string
    title2:string
    title3:string
    disabled?: boolean
    onClickUpHandlerSort?: () => void
    onClickDownHandlerSort?: () => void
}



const TableWrapper: FC<Props> = ({children, onClickHandler, title1, title2, title3, disabled, onClickUpHandlerSort, onClickDownHandlerSort}) => {
    const [activeClassUp, setActiveClassUp] = useState<boolean>(false)
    const [activeClassDown, setActiveClassDown] = useState<boolean>(false)
    const status = useSelector((state: AppRootStateType) => state.packsPage.status)
    const dispatch = useDispatch()
    const addNewName = (name:string) => {
        onClickHandler && onClickHandler(name)
    }
    const onClickUpHandler = () => {
        if (status !== 'loading') {
            setActiveClassUp(true)
            setActiveClassDown(false)
            dispatch(setSortArrow(SortArrowValues.SORT_UP))
            onClickUpHandlerSort && onClickUpHandlerSort()
        }
    }
    const onClickDownHandler = () => {
        if (status !== "loading") {
            setActiveClassUp(false)
            setActiveClassDown(true)
            dispatch(setSortArrow(SortArrowValues.SORT_DOWN))
            onClickDownHandlerSort && onClickDownHandlerSort()
        }
    }
    return (
        <div className={style.main_wrapped}>
            <div className={style.table_wrapped}>
                <div className={style.title_wrapped}>
                    <div className={style.title_item}>{title1}</div>
                    <div className={style.title_item}>
                        <div>{title2}</div>
                        <div>
                            <ArrowUpwardIcon
                                className={`${style.Arrow} ${activeClassUp ? style.Arrow_active : ''} ${status === "loading"? style.Arrow_load : ''}`}
                                onClick={onClickUpHandler}

                            />
                            <ArrowDownwardIcon
                                className={`${style.Arrow} ${activeClassDown ? style.Arrow_active : ''} ${status === "loading"? style.Arrow_load : ''}`}
                                onClick={onClickDownHandler}
                            />
                        </div>
                    </div>
                    <div className={style.title_item}>{title3}</div>
                    <div className={style.title_item}>
                       <AddNewPack addNewName={addNewName} disabled={disabled ? disabled : false}/>
                    </div>

                </div>
                {children}
            </div>

        </div>
    )
}


export default TableWrapper