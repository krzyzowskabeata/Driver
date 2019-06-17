import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import LogPanel from './LogPanel'
import Register from './Register'

class Log extends Component {
    state = {
        savedUser: ""
    };

    componentDidMount() {
        const savedUser = localStorage.getItem("savedUser");

        if(savedUser) {
            this.setState({
                savedUser
            });
        }
    }

    handleClick = (e) => {
        this.setState({
            [e.target.name]: true
        })
    };

    render() {
        if(this.state.savedUser || this.state.login) {
            return (
                <div className="header">
                    <LogPanel />
                </div>
            );

        } else if(this.state.register) {
            return (
                <div className="header">
                <Register />
            </div>
            );
        } else {
            return (
                <div className="header">
                    <div className="header_log">
                        <NavLink to="/log">
                            <button className="btn_log btn_active" name="login" onClick={this.handleClick}>Log in</button>
                        </NavLink>
                        <NavLink to="/register">
                            <button className="btn_log" name="register" onClick={this.handleClick}>Register</button>
                        </NavLink>
                    </div>
                </div>
            );
        }
    }
}

export default Log;