import React, {Component} from "react";
import Logpanel from './Logpanel'

class Header extends Component {
    state = {
        logged: false
    };

    handleLogin = () => {
        this.setState({
            logged: true
        })
    };
    render() {

        if(this.state.logged) {

            return (
                <div className="header">
                    <div className="header_base">
                        <h1>Drive<span>r</span></h1>
                    </div>
                    <Logpanel />
                </div>
            );

        } else {

            return (
                <div className="header">
                    <div className="header_base">
                        <h1>Drive<span>r</span></h1>
                    </div>
                    <div className="header_log">
                        <button className="btn_log btn_active" name="login" onClick={this.handleLogin}>Log in</button>
                        <button className="btn_log" name="logout" onClick={this.handleLogOut}>Log out</button>
                    </div>
                </div>
            );
        }
    }
}

export default Header;