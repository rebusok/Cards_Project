import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../Redux/Store";
import {setCheckedCount} from "../../../../../Redux/PacksPageReducer/PacksPageReducer";

const useStyles = makeStyles({
    root: {
        width: 300
    },
});

export const RangeSlider = () => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const cardsCount = useSelector((state: AppRootStateType) => state.packsPage.cardsCount)
    const value = useSelector((state: AppRootStateType) => state.packsPage.checkedCount)

    const valuetext = (value: number) => {
        return `${value}`;
    }

    const handleChange = (event: any, newValue: number | number[]) => {
        dispatch(setCheckedCount(newValue));
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Count packs
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                min={cardsCount.minCardsCount}
                max={cardsCount.maxCardsCount}
            />
        </div>
    );
}
