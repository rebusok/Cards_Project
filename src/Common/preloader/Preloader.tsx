import preloader from "./../../immages/Ellipsis-4.2s-197px.svg";
import {FC} from "react";

interface Props{

}

const Preloader:FC <Props> = (props) => {
    return <div>
        <img src={preloader} alt=""/>
    </div>
}

export default Preloader;