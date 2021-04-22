import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { withRouter } from "react-router";
import { Form, Button } from "react-bootstrap";

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

                <Form onSubmit={this.handleSubmit}>
                    <h1>Signin</h1>
                    <p className="error">{this.state.err}</p>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <br />
                    <br />
                    <a href="/signup">Make new account</a>
                </Form>
                <div className="col-md-6 m-auto">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                            <small
                                id="emailHelp"
                                className="form-text text-muted"
                            >
                                Email that you have used while registration.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="checkbox"
                                className="form-check-input"
                                id="remember"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="remember"
                            >
                                Remember me
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary float-right"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(Signin);
