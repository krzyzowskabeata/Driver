import React, {Component} from "react";
import Navigation from './Navigation'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header_base">
                    <h1>Drive<span>r</span></h1>
                </div>
                <Navigation />
            </div>
        );
    }
}

export default Header;