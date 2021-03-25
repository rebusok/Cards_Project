import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Error404.module.css'


const Error404 = () => {
    return (
        <div className={style.wrapped}>
            <figure>
                <div className={style.sadMac}/>
                <NavLink to={'/'}>
                    GO TO HOME
                </NavLink>
                <figcaption>
                    <span className={style.srText}>Error 404: Not Found</span>
                    <span className={style.e}/>
                    <span className={style.r}/>
                    <span className={style.r}/>
                    <span className={style.o}/>
                    <span className={style.r}/>
                    <span className={style._4}/>
                    <span className={style._0}/>
                    <span className={style._4}/>
                    <span className={style.n}/>
                    <span className={style.o}/>
                    <span className={style.t}/>
                    <span className={style.f}/>
                    <span className={style.o}/>
                    <span className={style.u}/>
                    <span className={style.n}/>
                    <span className={style.d}/>
                </figcaption>

            </figure>

        </div>
    );
};

export default Error404;