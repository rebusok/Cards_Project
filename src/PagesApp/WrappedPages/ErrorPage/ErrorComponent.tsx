import {FC} from "react";

interface Props {
    title: string
}


const ErrorComponent : FC <Props> = ({
                                         title, ...props
}) => {
    return ( <div>
        <h1>{title}</h1>
    </div> )
}


export default ErrorComponent