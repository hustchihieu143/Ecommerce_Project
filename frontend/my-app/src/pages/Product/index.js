import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
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
                console.log(this.state.products);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async addToCart(product, price, img) {
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
                    img: img,
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

                <div>
                    <input
                        placeholder="Search..."
                        value={this.state.searchValue}
                        onChange={(e) =>
                            this.setState({ searchValue: e.target.value })
                        }
                    />
                    <Button type="submit" onClick={this.searchProducts}>
                        <BsSearch />
                    </Button>
                </div>

                {/*Section: Block Content*/}

                <section className="text-center">
                    <h1>Products</h1>
                    {/* Grid row */}
                    <div className="row" style={{ marginTop: "50px" }}>
                        {products.products &&
                            products.products.map((product) => (
                                <div
                                    className="col-sm-2"
                                    style={{ marginBottom: "20px" }}
                                >
                                    <div className>
                                        <div className="view zoom overlay z-depth-2 rounded">
                                            <a href="#!">
                                                <div className="mask">
                                                    <img
                                                        className="img-fluid w-100"
                                                        src={
                                                            "http://localhost:2000/public/" +
                                                            product
                                                                .productPictures[0]
                                                                .img
                                                        }
                                                        alt="Product"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                    <div className="mask rgba-black-slight" />
                                                </div>
                                            </a>
                                        </div>
                                        <div className="pt-4">
                                            <h5>{product.name}</h5>
                                            <h6>{product.price} $</h6>
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            style={{ marginLeft: "30px" }}
                                            onClick={() =>
                                                this.addToCart(
                                                    product._id,
                                                    product.price,
                                                    product.productPictures[0]
                                                        .img
                                                )
                                            }
                                        >
                                            Add to card
                                        </button>
                                    </div>
                                </div>
                            ))}

                        {/* Grid column */}
                    </div>
                    {/* Grid row */}
                </section>
                {/*Section: Block Content
                 */}
            </>
        );
    }
}
export default Product;
