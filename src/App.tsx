import React, {FC, useEffect} from 'react';
import './App.css';
import NavigationContainer from "./PagesApp/StaticPages/Navigation/NavigationContainer";
import Routes from "./Routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Redux/Store";
import Spinner from "./Common/preloader/Spinner";
import {setAuthMe} from './Redux/AuthReducer/AuthReducer';


const App: FC = () => {

    const isInitial = useSelector((state: AppRootStateType) => state.app.isInitial)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthMe())
    }, [])

    if(!isInitial) {
        return <Spinner/>
    }

  return (
    <div className="App">
        <NavigationContainer/>
        <div className={'container'}>
            <Routes/>
        </div>

    </div>
  );
}

export default App;
