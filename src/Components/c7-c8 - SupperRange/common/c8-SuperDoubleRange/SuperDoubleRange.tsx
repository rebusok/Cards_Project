import React, {ChangeEvent} from "react";
import {Typography} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

type SuperDoubleRangePropsType = {
    handleChange: (newValue: number | number[]) => void
    value: Array<number>
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        value, handleChange
    }
) => {

    const handleChangeSlider = (event: ChangeEvent<{}>, newValue: number | number[]): void => {
        handleChange(newValue)
    }

    return (
        <>
            <div className='sliderHW11Style'>
                <Slider
                    value={value}
                    onChange={handleChangeSlider}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </div>
        </>
    );
}

export default SuperDoubleRange;
