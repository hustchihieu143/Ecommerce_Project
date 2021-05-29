import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import Header from "../../components/Header";

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: "",
            city: "",
            district: "",
            ward: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const res = await axios({
            method: "POST",
            headers: {
                Authorization: localStorage.getItem("user"),
            },
            data: {
                address: {
                    country: this.state.country,
                    city: this.state.city,
                    district: this.state.district,
                    ward: this.state.ward,
                },
            },
            url: "http://localhost:2000/api/product/order",
        });
        console.log(res);
        if (res.data.message) {
            alert("Đặt hàng thành công");
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <>
                <Header />
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
                            <h3>Address</h3>
                        </div>
                        {/* Insert address Form */}
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                id="country"
                                className="fadeIn second"
                                placeholder="Quốc gia"
                                value={this.state.country}
                                onChange={(e) => {
                                    this.setState({ country: e.target.value });
                                }}
                            />
                            <input
                                type="text"
                                id="city"
                                className="fadeIn second"
                                placeholder="Thành phố"
                                value={this.state.city}
                                onChange={(e) => {
                                    this.setState({ city: e.target.value });
                                }}
                            />
                            <input
                                type="text"
                                id="district"
                                className="fadeIn third"
                                placeholder="Quận/Huyện"
                                value={this.state.district}
                                onChange={(e) => {
                                    this.setState({ district: e.target.value });
                                }}
                            />
                            <input
                                type="text"
                                id="ward"
                                className="fadeIn third"
                                placeholder="Phường/Xã"
                                value={this.state.ward}
                                onChange={(e) => {
                                    this.setState({ ward: e.target.value });
                                }}
                            />
                            <input type="submit" className="fadeIn fourth" />
                        </form>
                        {/* Remind Passowrd */}
                        {/* <div id="formFooter">
                            <a href="#">Forgot Password?</a>
                            <br></br>
                        </div> */}
                    </div>
                </div>
            </>
        );
    }
}
export default Address;
