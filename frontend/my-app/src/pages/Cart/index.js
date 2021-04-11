import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
        };
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:2000/api/user/cart/getcart",
            headers: {
                Authorization: localStorage.getItem("user"),
            },
        })
            .then((res) => {
                this.setState({
                    cartItems: res.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { cartItems } = this.state;
        return (
            <>
                <Container>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ProductId</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.cart &&
                                cartItems.cart.cartItems.map((item) => (
                                    <tr>
                                        <td>{item.product}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity * item.price}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </Container>
            </>
        );
    }
}
export default Cart;
