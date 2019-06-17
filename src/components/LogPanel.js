import React, {Component} from "react";
import {NavLink, Redirect} from 'react-router-dom';

class LogPanel extends Component {

    state = {
        users: [],
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
        var savedUser = localStorage.getItem("savedUser");

        if(savedUser) {
            this.setState({
                savedUser,
                greeting: savedUser,
            });
        }

        fetch("http://localhost:3000/users").then(el => el.json())
            .then(users => {
                this.setState({
                    users
                });
            })
            .catch(err => {
                console.log(err);
            });
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

        const currentUser = this.state.users.filter(e => {
            return e.guid === this.state.login
        });

        this.setState({
            currentUser,
            validLogin: true,
            validPassword: true
        });

        if(currentUser.length === 0) {
            this.setState({
                login: "",
                password: "",
                placeholderLogin: "No user",
                validLogin: false
            });
        }

        if(currentUser.length !== 0 && currentUser[0].password !== this.state.password) {
            this.setState({
                password: "",
                placeholderPassword: "Faulty password",
                validPassword: false
            });
        }

        if(currentUser.length !== 0 && this.state.isChecked) {
            localStorage.setItem("savedUser", currentUser[0].name);

            this.setState({
                savedUser: currentUser[0].name
            });
        }
        this.setState({
            greeting: currentUser[0].name
        });
    };

    handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem("savedUser");
        this.setState({
            savedUser: "",
            login: "",
            password: "",
            isChecked: false,
            greeting: "",
            placeholderLogin: "Login",
            placeholderPassword: "Password",
            validLogin: true,
            validPassword: true,
        });
    };

    handleBack = (e) => {
        if(e.target.getAttribute("class") === "blackpage") {
            this.setState({
                redirect: "/"
            });
        }
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
                <div className={"blackpage"} onClick={this.handleBack}>
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
                            {this.state.validLogin ? "" : (
                                <NavLink to="/register">
                                    <button className={"btn_log_small btn_register"}>Register</button>
                                </NavLink>)}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default LogPanel;