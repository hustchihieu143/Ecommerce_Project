import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
        };
        this.handleDelete = this.handleDelete.bind(this);
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
                console.log(this.state.cartItems);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async handleDelete(productId) {
        let res = await axios({
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("user"),
            },
            url: `http://localhost:2000/api/user/cart/delete/${productId}`,
        });
        if (res) {
            console.log("Update thanh cong");
        } else {
            console.log("not ok");
        }
    }

    render() {
        const { cartItems } = this.state;
        let total, result;
        if (cartItems.cart) {
            total = cartItems.cart.cartItems.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            result = total + 0.1 * total;
        }

        return (
            <>
                <Container>
                    {/*Section: Block Content*/}
                    <section>
                        {/*Grid row*/}
                        <div className="row">
                            {/*Grid column*/}
                            <div className="col-lg-8">
                                {/* Card */}
                                <div className="mb-3">
                                    <div className="pt-4 wish-list">
                                        {/* <h5 className="mb-4">
                                            Cart (<span>2</span> items)
                                        </h5> */}
                                        {cartItems.cart &&
                                            cartItems.cart.cartItems.map(
                                                (cart) => (
                                                    <div className="row mb-4">
                                                        <div className="col-md-5 col-lg-3 col-xl-3">
                                                            <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                                <img
                                                                    className="img-fluid w-100"
                                                                    src={
                                                                        "http://localhost:2000/public/" +
                                                                        cart.img
                                                                    }
                                                                    alt="Sample"
                                                                />
                                                                <a href="#!">
                                                                    <div className="mask">
                                                                        <img
                                                                            className="img-fluid w-100"
                                                                            src={
                                                                                "http://localhost:2000/public/" +
                                                                                cart.img
                                                                            }
                                                                            alt="oke"
                                                                        />
                                                                        <div className="mask rgba-black-slight" />
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7 col-lg-9 col-xl-9">
                                                            <div>
                                                                <div className="d-flex justify-content-between">
                                                                    {/* <div>
                                                                        <h5>
                                                                            Blue
                                                                            denim
                                                                            shirt
                                                                        </h5>
                                                                        <p className="mb-3 text-muted text-uppercase small">
                                                                            Shirt
                                                                            -
                                                                            blue
                                                                        </p>
                                                                        <p className="mb-2 text-muted text-uppercase small">
                                                                            Color:
                                                                            blue
                                                                        </p>
                                                                        <p className="mb-3 text-muted text-uppercase small">
                                                                            Size:
                                                                            M
                                                                        </p>
                                                                    </div> */}
                                                                    <div>
                                                                        <div className="def-number-input number-input safari_only mb-0 w-100">
                                                                            <h3>
                                                                                Số
                                                                                lượng:
                                                                                {
                                                                                    cart.quantity
                                                                                }
                                                                            </h3>
                                                                            {/* <button
                                                                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                                                                className="minus decrease"
                                                                            /> */}
                                                                            {/* <input
                                                                                className="quantity"
                                                                                min={
                                                                                    0
                                                                                }
                                                                                name="quantity"
                                                                                defaultValue={
                                                                                    1
                                                                                }
                                                                                type="number"
                                                                            /> */}
                                                                            <button
                                                                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                                                                className="plus increase"
                                                                            />
                                                                        </div>
                                                                        {/* <small
                                                                            id="passwordHelpBlock"
                                                                            className="form-text text-muted text-center"
                                                                        >
                                                                            (Note,
                                                                            1
                                                                            piece)
                                                                        </small> */}
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <a
                                                                            href="#!"
                                                                            type="button"
                                                                            className="card-link-secondary small text-uppercase mr-3"
                                                                            onClick={() =>
                                                                                this.handleDelete(
                                                                                    cart.product
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="fas fa-trash-alt mr-1" />{" "}
                                                                            Remove
                                                                            item{" "}
                                                                        </a>
                                                                        <a
                                                                            href="#!"
                                                                            type="button"
                                                                            className="card-link-secondary small text-uppercase"
                                                                        >
                                                                            <i className="fas fa-heart mr-1" />{" "}
                                                                            Move
                                                                            to
                                                                            wish
                                                                            list{" "}
                                                                        </a>
                                                                    </div>
                                                                    <p className="mb-0">
                                                                        <span>
                                                                            <strong id="summary">
                                                                                {cart.price *
                                                                                    cart.quantity}

                                                                                $
                                                                            </strong>
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        <hr className="mb-4" />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="pt-4">
                                        <h5 className="mb-4">We accept</h5>
                                        <img
                                            className="mr-2"
                                            width="45px"
                                            src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                            alt="Visa"
                                        />
                                        <img
                                            className="mr-2"
                                            width="45px"
                                            src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                            alt="American Express"
                                        />
                                        <img
                                            className="mr-2"
                                            width="45px"
                                            src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                            alt="Mastercard"
                                        />
                                        <img
                                            className="mr-2"
                                            width="45px"
                                            src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                            alt="PayPal acceptance mark"
                                        />
                                    </div>
                                </div>
                                {/* Card */}
                            </div>
                            {/*Grid column*/}
                            {/*Grid column*/}
                            <div className="col-lg-4">
                                {/* Card */}
                                <div className="mb-3">
                                    <div className="pt-4">
                                        <h5 className="mb-3">
                                            The total amount of
                                        </h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Temporary amount
                                                <span>{total}$</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping
                                                <span>Free</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>
                                                        The total amount of
                                                    </strong>
                                                    <strong>
                                                        <p className="mb-0">
                                                            (including VAT)
                                                        </p>
                                                    </strong>
                                                </div>
                                                <span>
                                                    <strong>{result}$</strong>
                                                </span>
                                            </li>
                                        </ul>
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-block"
                                        >
                                            go to checkout
                                        </button>
                                    </div>
                                </div>
                                {/* Card */}
                                {/* Card */}
                                <div className="mb-3">
                                    <div className="pt-4">
                                        <a
                                            className="dark-grey-text d-flex justify-content-between"
                                            data-toggle="collapse"
                                            href="#collapseExample"
                                            aria-expanded="false"
                                            aria-controls="collapseExample"
                                        >
                                            Add a discount code (optional)
                                            <span>
                                                <i className="fas fa-chevron-down pt-1" />
                                            </span>
                                        </a>
                                        <div
                                            className="collapse"
                                            id="collapseExample"
                                        >
                                            <div className="mt-3">
                                                <div className="md-form md-outline mb-0">
                                                    <input
                                                        type="text"
                                                        id="discount-code"
                                                        className="form-control font-weight-light"
                                                        placeholder="Enter discount code"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Card */}
                            </div>
                            {/*Grid column*/}
                        </div>
                        {/* Grid row */}
                    </section>
                    {/*Section: Block Content*/}
                </Container>
            </>
        );
    }
}
export default Cart;
