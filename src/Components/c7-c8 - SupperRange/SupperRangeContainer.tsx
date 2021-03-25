import React, {useState} from "react";
import SuperRange from "./common/c7-SuperRange/SuperRange";
import SuperDoubleRange from "./common/c8-SuperDoubleRange/SuperDoubleRange";
import './HW11Style.css'

function SupperRangeContainer() {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(100);

    const setMinValue = (newMinValue: number): void => {
        setValue1(newMinValue)
    }

    const handleChange = (newValue: number | number[]): void => {
        if (typeof newValue === "object") {
            setValue1(newValue[0])
            setValue2(newValue[1])
        }
    }

    let value = [value1, value2]

    return (
        <div>
            <hr/>


            <div className='HW11'>
                <div>
                    <SuperRange
                        onChangeRange={setMinValue}
                        minValue={value1}
                    />
                </div>

                <div>
                    <span>{value1}</span>
                    <SuperDoubleRange
                        handleChange={handleChange}
                        value={value}
                    />
                    <span>{value2}</span>
                </div>
            </div>
        </div>
    );
}

export default SupperRangeContainer;
