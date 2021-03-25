import React, {useEffect, useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCardsThunk, onChangeGrade} from "../../../Redux/CardsReducer/CardsReducer";
import {AppRootStateType} from "../../../Redux/Store";
import {ResponseTypeCardsData} from "../../../API/Api";
import SuperButton from "../../../Components/c2-SuperButton/SuperButton";
import Spinner from "../../../Common/preloader/Spinner";


const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: ResponseTypeCardsData[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    // console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {
    const cards = useSelector<AppRootStateType, ResponseTypeCardsData[] | null>(state => state.cardsPage.cards)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cardsPage.totalCount)
    const {cardId} = useParams<{ cardId: string }>()
    const dispatch = useDispatch()
    const isLogin = useSelector((state: AppRootStateType) => state.auth.isLogin)

    const [card, setCard] = useState<ResponseTypeCardsData>();
    const status = useSelector((state: AppRootStateType) => state.cardsPage.status)

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);

    useEffect(() => {

        if (first) {
            dispatch(getCardsThunk(cardId, cardsTotalCount))
            setFirst(false);
        }


        if (cards && cards.length > 0) setCard(getCard(cards));

        return () => {
            // console.log('LearnContainer useEffect off');

        }
    }, [dispatch, cardId, cards, first, cardsTotalCount]);

    const setGradeCards = (grade: number) => {
        if (card) {
            dispatch(onChangeGrade(card._id, grade))
        }
    }


    const onNext = () => {
        setIsChecked(false);

        if (cards && cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }

    if (!isLogin) {
        return <Redirect to={'/auth'}/>
    }
    if (!card) {

        return <Spinner/>
    }
    return (
        <div>
            LearnPage
            <div>Grade: {card && card.grade.toFixed(2)}</div>
            <div>Shots: {card && card.shots}</div>
            <div>{card && card.question}</div>
            <div>
                <SuperButton onClick={() => setIsChecked(true)}>check</SuperButton>
            </div>

            {isChecked && (
                <>
                    <div>{card && card.answer}</div>

                    {grades.map((g, i) => (
                        <SuperButton key={'grade-' + i}
                                     disabled={status === 'loading'}
                                     onClick={() => setGradeCards(i + 1)}>{g}</SuperButton>
                    ))}

                    <div><SuperButton

                        disabled={status === 'loading'}
                        onClick={onNext}>next</SuperButton></div>
                </>
            )}
        </div>
    )
};

export default LearnPage;

