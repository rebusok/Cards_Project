import {FC} from "react";

interface Props {
    title: string
}


const ResPassword: FC<Props> = ({
                                   title, ...props
                                }) => {
    return (<div>
        <h3>{title}</h3>
    </div>)
}


export default ResPassword