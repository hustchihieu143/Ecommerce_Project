import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Header";
import "./style.css";
import { withRouter } from "react-router";
import { Form, Button } from "react-bootstrap";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    }
    onChangeFirstName(e) {
        this.setState({ firstName: e.target.value });
    }
    onChangeLastName(e) {
        this.setState({ lastName: e.target.value });
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        let response = await axios.post("http://localhost:2000/api/signup", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        });
        if (response.data.message === true) {
            alert("Create acount successful");
        }
    }

    render() {
        return (
            <>
                <Header> </Header>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Signup</h1>
                    <p className="err"></p>
                    <Form.Group>
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            value={this.state.firstName}
                            onChange={this.onChangeFirstName}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            value={this.state.lastName}
                            onChange={this.onChangeLastName}
                        />
                    </Form.Group>

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
                </Form>
            </>
        );
    }
}
export default withRouter(Signup);
