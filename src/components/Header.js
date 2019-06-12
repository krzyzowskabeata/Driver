import React, {Component} from "react";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header_base">
                    <h1>Drive<span>r</span></h1>
                </div>
                <div className="header_log">
                    <button className="btn_log btn_active">Log in</button>
                    <button className="btn_log">Log out</button>
                </div>
            </div>
        );
    }
}

export default Header;