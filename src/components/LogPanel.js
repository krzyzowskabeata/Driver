import React, {Component} from "react";
import {NavLink, Redirect} from 'react-router-dom';

class LogPanel extends Component {

    state = {
        savedUser: "",
        login: "",
        password: "",
        isChecked: false,
        greeting: "",
        placeholderLogin: "Login",
        placeholderPassword: "Password",
        validLogin: true,
        validPassword: true,
        redirect: ""
    };

    componentDidMount() {
        const savedUser = localStorage.getItem("savedUser");

        if(savedUser) {
            this.setState({
                savedUser,
                greeting: savedUser,
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,

        });
    };

    handleLogin = (e) => {
        e.preventDefault();

        this.setState({
            validLogin: true,
            validPassword: true
        });

        if(this.state.isChecked) {
            localStorage.setItem("savedUser", this.state.login);

            this.setState({
                savedUser: this.state.login
            });
        }

        this.setState({
            greeting: this.state.login
        });

        if(this.state.login.length < 3) {
            this.setState({
                login: "",
                placeholderLogin: "No user",
                validLogin: false
            });
        }

        if(this.state.password.length < 3) {
            this.setState({
                password: "",
                placeholderPassword: "Faulty password",
                validPassword: false
            });
        }

    };

    handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem("savedUser");
        this.setState({
            savedUser: "",
            login: "",
            password: "",
            isChecked: false,
            greeting: ""
        });
    };

    handleBack = () => {
        this.setState({
            redirect: "/"
        })
    };

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        } else if((this.state.savedUser || this.state.greeting) && (this.state.validLogin && this.state.validPassword)) {
            return (
                <div className={"blackpage"} onClick={this.handleBack}>
                    <div className={"logpanel whitepage"}>
                        <h2>{"Hi " + this.state.greeting + "!"}</h2>
                        <h4>{"What would you like to do?"}</h4>
                        <div>
                            <NavLink to="/tips">
                                <button className={"btn_log btn_active"}>Gather tips</button>
                            </NavLink>
                            <NavLink to="/forum">
                                <button className={"btn_log btn_active"}>Visit forum</button>
                            </NavLink>
                        </div>
                        <button className={"btn_log"} type="submit" onClick={this.handleLogout}>Log out</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"blackpage"}>
                    <div className={"logpanel whitepage"}>
                        <h2>Let's drive!</h2>
                        <input type="name" placeholder={this.state.placeholderLogin}
                               value={this.state.login} id="login" onChange={this.handleChange}
                                className={this.state.validLogin ? "" : "invalid"} />
                        <input type="password" placeholder={this.state.placeholderPassword}
                               value={this.state.password} id="password" onChange={this.handleChange}
                               className={this.state.validPassword ? "" : "invalid"} />
                        <div>
                            <label className={this.state.isChecked ? "remember" : ""}>
                                <input type="checkbox"
                                       checked={this.state.isChecked}
                                       onChange={this.toggleChange} />
                                Remember
                            </label>
                            <button className={"btn_log_small"} type="submit" onClick={this.handleLogin}>Log in</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default LogPanel;