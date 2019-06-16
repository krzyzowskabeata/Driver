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
            valid: true
        });

        if(this.state.name.length < 3) {
            this.setState({
                valid: false,
                name: "",
                namePlaceholder: "Maybe a bit longer name?"
            });
        }

        if(this.state.surname.length < 3) {
            this.setState({
                valid: false,
                surname: "",
                surnamePlaceholder: "Maybe a bit longer surname?"
            });
        }

        if(this.state.guid.length < 3) {
            this.setState({
                valid: false,
                guid: "",
                guidPlaceholder: "Try a bit longer login!"
            });
        }

        if(this.state.email.indexOf("@") === -1) {
            this.setState({
                valid: false,
                email: "",
                emailPlaceholder: "Forgotten @?"
            });
        }

        if(this.state.pwd1.length < 4) {
            this.setState({
                valid: false,
                pwd1: "",
                pwd1Placeholder: "Try a bit longer password!"
            });
        }

        if(this.state.pwd1 !== this.state.pwd2) {
            this.setState({
                valid: false,
                pwd2: "",
                pwd2Placeholder: "Match passwords!"
            });
        }

        if(!this.state.isChecked) {
            this.setState({
                valid: false,
            });
        }

    };

    render() {
        if(this.state.valid) {
            return (
                <div className={"blackpage"}>
                    <div className={"register whitepage"}>
                        <h2>{"Hi " + this.state.name + ","}</h2>
                        <h4>Thank you for your registration!</h4>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"blackpage"}>
                    <div className={"register whitepage"}>
                        <h2>Register to drive!</h2>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="name" placeholder={this.state.namePlaceholder}
                                   value={this.state.name} onChange={this.handleChange} />
                            <input type="text" name="surname" placeholder={this.state.surnamePlaceholder}
                                   value={this.state.surname} onChange={this.handleChange} />
                            <input type="text" name="guid" placeholder={this.state.guidPlaceholder}
                                   value={this.state.guid} onChange={this.handleChange} />
                            <input type="email" name="email" placeholder={this.state.emailPlaceholder}
                                   value={this.state.email} onChange={this.handleChange} />
                            <input type="password" name="pwd1" placeholder={this.state.pwd1Placeholder}
                                   value={this.state.pwd1} onChange={this.handleChange} />
                            <input type="password" name="pwd2" placeholder={this.state.pwd2Placeholder}
                                   value={this.state.pwd2} onChange={this.handleChange} />
                            <div>
                                <label className={this.state.isChecked ? "accept" : "no_accept"}>
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