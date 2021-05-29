import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Header";
import "./style.css";
import { withRouter } from "react-router";

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
                <div>
                    <div className="card bg-light">
                        <article
                            className="card-body mx-auto"
                            style={{ maxWidth: "400px" }}
                        >
                            <h4 className="card-title mt-3 text-center">
                                Create Account
                            </h4>
                            <p className="text-center">
                                Get started with your free account
                            </p>

                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            {" "}
                                            <i className="fa fa-user" />{" "}
                                        </span>
                                    </div>
                                    <input
                                        name
                                        className="form-control"
                                        placeholder="First name"
                                        type="text"
                                        value={this.state.firstName}
                                        onChange={this.onChangeFirstName}
                                    />
                                    <input
                                        name
                                        className="form-control"
                                        placeholder="Last name"
                                        type="text"
                                        value={this.state.lastName}
                                        onChange={this.onChangeLastName}
                                    />
                                </div>{" "}
                                {/* form-group// */}
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            {" "}
                                            <i className="fa fa-envelope" />{" "}
                                        </span>
                                    </div>
                                    <input
                                        name
                                        className="form-control"
                                        placeholder="Email address"
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                </div>{" "}
                                {/* form-group// */}
                                {/* form-group// */}
                                {/* form-group end.// */}
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            {" "}
                                            <i className="fa fa-lock" />{" "}
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        placeholder="Create password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                    />
                                </div>{" "}
                                {/* form-group// */}
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            {" "}
                                            <i className="fa fa-lock" />{" "}
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        placeholder="Repeat password"
                                        type="password"
                                    />
                                </div>{" "}
                                {/* form-group// */}
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        {" "}
                                        Create Account
                                    </button>
                                </div>{" "}
                                {/* form-group// */}
                                <p className="text-center">
                                    Have an account? <a href>Log In</a>{" "}
                                </p>
                            </form>
                        </article>
                    </div>{" "}
                    {/* card.// */}
                    {/*container end.//*/}
                    <br />
                    <br />
                </div>
            </>
        );
    }
}
export default withRouter(Signup);
