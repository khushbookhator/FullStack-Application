import React from 'react'
import {Switch, Route} from "react-router-dom"
import { Login } from '../Components/Auth/Login'
import { Home } from '../Components/Home/Home'
import { Patient } from '../Components/Patient/Patient'

const Routes = () => {

    return(
        <>
            <Switch>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route exact path="/home">
                    <Home/>
                </Route>
                <Route exact path="/:id">
                    <Patient/>
                </Route>
            </Switch>
        </>
    )
}

export {Routes}
