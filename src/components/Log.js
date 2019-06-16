import React, {Component} from "react";
import LogPanel from './LogPanel'

class Log extends Component {
    state = {
        logged: false,
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

    handleLogin = () => {
        this.setState({
            logged: true
        })
    };

    render() {
        if(this.state.savedUser || this.state.logged) {
            return (
                <div className="header">
                    <LogPanel />
                </div>
            );

        } else {
            return (
                <div className="header">
                    <div className="header_log">
                        <button className="btn_log btn_active" name="login" onClick={this.handleLogin}>Log in</button>
                        <button className="btn_log" name="logout" onClick={this.handleLogOut}>Register</button>
                    </div>
                </div>
            );
        }
    }
}

export default Log;