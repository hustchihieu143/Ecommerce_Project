import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Modal, Form } from "react-bootstrap";
import Header from "../../components/Header";
import "./style.css";
import TaskForm from "../../components/TaskForm";
import { BrowserRouter } from "react-router-dom";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product: "",
            quantity: "",
            price: "",
            isShow: false,
        };
        this.addToCart = this.addToCart.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:2000/api/products",
        })
            .then((res) => {
                this.setState({
                    products: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        // axios({
        //     method: "GET",
        //     url: "http://localhost:2000/public/OwuScJTIY-Screenshot (271).png",
        // }).then((res) => {});
    }

    async addToCart(product, price) {
        await axios({
            method: "POST",
            url: "http://localhost:2000/api/user/cart/addtocart",
            headers: {
                Authorization: localStorage.getItem("user"),
            },
            data: {
                cartItems: {
                    product: product,
                    quantity: 1,
                    price: price,
                },
            },
        })
            .then(function (res) {
                alert("Thêm thành công");
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    handleCreate(event) {
        event.preventDefault();
        this.setState({
            isShow: true,
        });
    }
    handleClose = (event) => {
        event.preventDefault();
        this.setState({
            isShow: false,
        });
    };

    render() {
        var { products } = this.state;
        let imageFile =
            "http:localhost:2000/public/X-zFvcrZH-Activity_Them_phong.png";

        return (
            <>
                <Header />
                <BrowserRouter>
                    <h1>Products</h1>
                    <ul>
                        {products.products &&
                            products.products.map((product) => (
                                <li className="display">
                                    <a href={"/product/" + product._id}>
                                        <div
                                            className="card"
                                            style={{ width: "18rem" }}
                                        >
                                            <img
                                                className="card-img-top"
                                                src={
                                                    "http://localhost:2000/public/" +
                                                    product.productPictures[0]
                                                        .img
                                                }
                                                alt="Card image cap"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {product.name}
                                                </h5>
                                                <div
                                                    class="alert alert-primary"
                                                    role="alert"
                                                >
                                                    Price: {product.price}$
                                                </div>
                                                <a
                                                    href="#"
                                                    className="btn btn-primary"
                                                    onClick={() =>
                                                        this.addToCart(
                                                            product._id,
                                                            product.price
                                                        )
                                                    }
                                                >
                                                    Add to card
                                                </a>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                    </ul>
                </BrowserRouter>
            </>
        );
    }
}
export default Product;
