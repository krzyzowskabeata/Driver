import React, {Component} from "react";

class Logpanel extends Component {

    render() {

        return (
            <div className={"blackpage"}>
                <div className={"logpanel whitepage"}>
                    <h2>Let's drive!</h2>
                    <input type="name" placeholder="Login" />
                    <input type="password" placeholder="Password" />
                    <div className={"login_panel"}>
                        <label>
                            <input type="checkbox" id="remember" />
                            Remember
                        </label>
                        <button>Log in</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Logpanel;