import {FC} from "react";

import {NavLink} from "react-router-dom";
import {RoutingType} from "../../../Routes/Routes";
import style from './NavigationContainer.module.scss'

const NavigationContainer: FC = () => {

    return (
    <nav>
        <div className={style.wrapper}>
            <NavLink
                to={RoutingType.auth}
                activeClassName={style.active}
            >Auth</NavLink>
            <NavLink
                to={RoutingType.registration}
                activeClassName={style.active}
            >Registration</NavLink>
            <NavLink
                to={RoutingType.profile}
                activeClassName={style.active}
            >Profile</NavLink>
            <NavLink
                to={RoutingType.resPass}
                activeClassName={style.active}
            >Password Recovery</NavLink>
            <NavLink
                to={RoutingType.error}
                activeClassName={style.active}
            >ERROR</NavLink>
            <NavLink to={RoutingType.packs} activeClassName={style.active}>
                Page of Packs
            </NavLink>
        </div>



    </nav>
    )
}


export default NavigationContainer