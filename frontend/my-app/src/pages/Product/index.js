import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Header from "../../components/Header";
import "./style.css";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product: "",
            quantity: "",
            price: "",
            isShow: false,
            searchValue: "",
        };
        this.addToCart = this.addToCart.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.searchProducts = this.searchProducts.bind(this);
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

    async searchProducts(event) {
        event.preventDefault();
        let response = await axios({
            method: "POST",
            url: "http://localhost:2000/api/product/search",
            data: {
                value: this.state.searchValue,
            },
        });
        if (response) {
            this.setState({
                products: response.data,
            });
            //console.log(response.data.product);
            console.log(this.state.products);
        }
    }

    render() {
        var { products } = this.state;

        return (
            <>
                <Header />

                <form>
                    <Form.Control
                        placeholder="Search..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={this.state.searchValue}
                        onChange={(e) =>
                            this.setState({ searchValue: e.target.value })
                        }
                    />
                    <Button
                        className="pd-3"
                        type="submit"
                        onClick={this.searchProducts}
                    >
                        <BsSearch />
                    </Button>
                </form>

                <h1>Products</h1>
                <ul>
                    {products.products &&
                        products.products.map((product) => (
                            <li className="display" key={product._id}>
                                <a href={"/product/" + product._id}>
                                    <div
                                        className="card"
                                        style={{ width: "18rem" }}
                                    >
                                        <img
                                            className="card-img-top"
                                            src={
                                                "http://localhost:2000/public/" +
                                                product.productPictures[0].img
                                            }
                                            alt="ok"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {product.name}
                                            </h5>
                                            <div
                                                className="alert alert-primary"
                                                role="alert"
                                            >
                                                Price: {product.price}$
                                            </div>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    this.addToCart(
                                                        product._id,
                                                        product.price
                                                    )
                                                }
                                            >
                                                Add to card
                                            </button>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                </ul>
            </>
        );
    }
}
export default Product;
