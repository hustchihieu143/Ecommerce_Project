import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { withRouter } from "react-router";

class Signin extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
        };
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }
    async handleSubmit(event) {
        // alert("A name was submitted: " + this.state.value);
        // try {
        event.preventDefault();
        const response = await axios.post(
            "http://localhost:2000/api/signin",
            {
                email: this.state.email,
                password: this.state.password,
            },
            { "Content-Type": "application/json" }
        );
        console.log("response", response);
        if (response.data.message === true) {
            alert("Login successful");
            localStorage.setItem("user", response.data.token);
            localStorage.setItem("name", response.data.user.fullName);
            if (response.data.user.role === "admin") {
                this.props.history.push("/admin");
            } else this.props.history.push("/");
        } else if (response.data.message === false) {
            console.log("error");
            this.setState({ err: response.data.err });
        }
    }

    render() {
        return (
            <>
                {/* <Header> </Header> */}

                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        {/* Tabs Titles */}
                        {/* Icon */}
                        <div className="fadeIn first">
                            {/* <img
                                src="http://danielzawadzki.com/codepen/01/icon.svg"
                                id="icon"
                                alt="User Icon"
                            /> */}
                            <h3>Login</h3>
                        </div>
                        {/* Login Form */}
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                id="login"
                                className="fadeIn second"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                            <input
                                type="text"
                                id="password"
                                className="fadeIn third"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                            <input
                                type="submit"
                                className="fadeIn fourth"
                                defaultValue="Log In"
                            />
                        </form>
                        {/* Remind Passowrd */}
                        <div id="formFooter">
                            <a href="#!">Forgot Password?</a>
                            <br></br>
                            <a href="/signup">Make new account</a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Signin);
