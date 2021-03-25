import React, { Fragment } from "react";
import s from './Spinner.module.scss';

const Spinner = () => {

    let arrStyle = [];
    for (let i = 1; i < 21; i++) {
        arrStyle.push({"--i": i} as React.CSSProperties)
    }

    return (
        <Fragment>
            <section>
                <div className={s.loader}>
                    {
                        arrStyle.map((item, inx) => {
                            return <span style={item} key={inx}/>
                        })
                    }

                </div>
            </section>
        </Fragment>
    )
}

export default Spinner;