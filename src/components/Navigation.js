import React, {Component} from "react";
import {HashRouter, Route, Link, NavLink, Switch} from 'react-router-dom';
import Log from './Log'
import LogPanel from './LogPanel'
import Register from './Register'
import Tips from './Tips'
import Forum from './Forum'
import Main from './Main'
import None from './None'

class Navigation extends Component {
    render() {
        return (
            <HashRouter>
                <>
                    <nav />
                    <Switch>
                        <Route exact path ='/' component={Log} />
                        <Route path ='/log' component={LogPanel} />
                        <Route path ='/register' component={Register} />
                        <Route path ='/main' component={Main} />
                        <Route path ='/tips' component={Tips} />
                        <Route path ='/forum' component={Forum} />
                        <Route component={None} />
                    </Switch>
                </>
            </HashRouter>
        );
    }
}

export default Navigation;