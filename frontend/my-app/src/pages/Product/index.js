import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Modal, Form } from "react-bootstrap";
import Header from "../../components/Header";
import "./style.css";
import TaskForm from "../../components/TaskForm";

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

        return (
            <>
                <Header />
                <div>
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
                                                src="https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/2/3/637479612642653058_ip-12-pro-dd-2nam.jpg"
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
                </div>
                <div>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.handleCreate}
                    >
                        Create Product
                    </Button>
                    <Modal show={this.state.isShow}>
                        <Modal.Header>Create Product</Modal.Header>
                        <Modal.Body>
                            <Form>
                                <h1>Create Product</h1>
                                <Form.Group>
                                    <Form.Label>Name product</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product name"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter price"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter price"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Picture</Form.Label>
                                    <input type="file" name="productPictures" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>
                                Close Modal
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        );
    }
}
export default Product;
