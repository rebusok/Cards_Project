import  {ComponentType, Suspense} from "react";
import Preloader from "../preloader/Preloader";


export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<div><Preloader/></div>} >
            <WrappedComponent {...props} />
        </Suspense>
    }
}