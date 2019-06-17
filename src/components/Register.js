import React, {Component} from "react";
import {NavLink, Redirect} from "react-router-dom";

class Register extends Component {
    state = {
        isChecked: false,
        valid: false,
        name: "",
        surname: "",
        guid: "",
        email: "",
        pwd1: "",
        pwd2: "",
        namePlaceholder: "Name",
        surnamePlaceholder: "Surname",
        guidPlaceholder: "Login",
        emailPlaceholder: "Mail",
        pwd1Placeholder: "Password",
        pwd2Placeholder: "Repeat password",
        nameValid: true,
        surnameValid: true,
        guidValid: true,
        emailValid: true,
        pwd1Valid: true,
        pwd2Valid: true,
        isCheckedValid: true,
        redirect: ""
    };

    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            valid: true,
            nameValid: true,
            surnameValid: true,
            guidValid: true,
            emailValid: true,
            pwd1Valid: true,
            pwd2Valid: true,
            isCheckedValid: true,
        });

        if(this.state.name.length < 3) {
            this.setState({
                valid: false,
                nameValid: false,
                name: "",
                namePlaceholder: "Maybe a bit longer name?"
            });
        }

        if(this.state.surname.length < 3) {
            this.setState({
                valid: false,
                surnameValid: false,
                surname: "",
                surnamePlaceholder: "Maybe a bit longer surname?"
            });
        }

        if(this.state.guid.length < 3) {
            this.setState({
                valid: false,
                guidValid: false,
                guid: "",
                guidPlaceholder: "Try a bit longer login!"
            });
        }

        if(this.state.email.indexOf("@") === -1) {
            this.setState({
                valid: false,
                emailValid: false,
                email: "",
                emailPlaceholder: "Forgotten @?"
            });
        }

        if(this.state.pwd1.length < 4) {
            this.setState({
                valid: false,
                pwd1Valid: false,
                pwd2Valid: false,
                pwd1: "",
                pwd1Placeholder: "Try a bit longer password!"
            });
        }

        if(this.state.pwd1 !== this.state.pwd2) {
            this.setState({
                valid: false,
                pwd2Valid: false,
                pwd2: "",
                pwd2Placeholder: "Match passwords!"
            });
        }

        if(!this.state.isChecked) {
            this.setState({
                valid: false,
                isCheckedValid: false
            });
        }
    };

    // handleLogout = (e) => {
    //     e.preventDefault();

        // localStorage.removeItem("savedUser");
        // this.setState({
        //     savedUser: "",
        //     login: "",
        //     password: "",
        //     isChecked: false,
        //     greeting: ""
        // });
    // };

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
        } else if(this.state.valid) {
            console.log(this.state.valid)
            const newUser = {
                name: this.state.name,
                surname: this.state.surname,
                guid: this.state.guid,
                email: this.state.email,
                password: this.state.pwd1
            };

            fetch("http://localhost:3000/users", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(newUser), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(err => console.log(err));

            return (
                <div className={"blackpage"} onClick={this.handleBack}>
                    <div className={"register whitepage"}>
                        <h1>{"Hi " + this.state.name + ","}</h1>
                        <h3>Thank you for your registration!</h3>
                        <h3>{"What would you like to do?"}</h3>
                        <div>
                            <NavLink to="/tips">
                                <button className={"btn_log btn_active"}>Gather tips</button>
                            </NavLink>
                            <NavLink to="/forum">
                                <button className={"btn_log btn_active"}>Visit forum</button>
                            </NavLink>
                        </div>
                        <NavLink to="/">
                            <button className={"btn_log"} type="submit" onClick={this.handleLogout}>Log out</button>
                        </NavLink>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"blackpage"} onClick={this.handleBack}>
                    <div className={"register whitepage"}>
                        <h2>Register to drive!</h2>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="name" placeholder={this.state.namePlaceholder}
                                   value={this.state.name} onChange={this.handleChange}
                                   className={this.state.nameValid ? "" : "invalid"} />
                            <input type="text" name="surname" placeholder={this.state.surnamePlaceholder}
                                   value={this.state.surname} onChange={this.handleChange}
                                   className={this.state.surnameValid ? "" : "invalid"} />
                            <input type="text" name="guid" placeholder={this.state.guidPlaceholder}
                                   value={this.state.guid} onChange={this.handleChange}
                                   className={this.state.guidValid ? "" : "invalid"} />
                            <input type="email" name="email" placeholder={this.state.emailPlaceholder}
                                   value={this.state.email} onChange={this.handleChange}
                                   className={this.state.emailValid ? "" : "invalid"} />
                            <input type="password" name="pwd1" placeholder={this.state.pwd1Placeholder}
                                   value={this.state.pwd1} onChange={this.handleChange}
                                   className={this.state.pwd1Valid ? "" : "invalid"} />
                            <input type="password" name="pwd2" placeholder={this.state.pwd2Placeholder}
                                   value={this.state.pwd2} onChange={this.handleChange}
                                   className={this.state.pwd2Valid ? "" : "invalid"} />
                            <div>
                                <label className={this.state.isChecked ? "accept" : "no_accept"
                                       && this.state.isCheckedValid ? "no_accept" : "invalid_accept"}>
                                    <input type="checkbox"
                                           checked={this.state.isChecked}
                                           onChange={this.toggleChange} />
                                    Accept policy
                                </label>
                                <button className={"btn_log_small"} type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default Register;