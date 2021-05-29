import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import "./style.css";

class ProductByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            parentCategories: [],
            checked: false,
            checkedName: "",
            listChecked: [],
        };
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `http://localhost:2000/api/getproducts/${this.props.match.params.categoryId}`,
        })
            .then((res) => {
                this.setState({
                    products: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });

        axios({
            method: "GET",
            url: "http://localhost:2000/api/category/getcategory",
        })
            .then((response) => {
                this.setState({ parentCategories: response.data });
            })
            .catch(function (err) {
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
    handleChange = async (e) => {
        if (e.target.checked) {
            await this.setState({
                listChecked: [...this.state.listChecked, e.target.name],
            });
        } else {
            let newState = this.state.listChecked.filter((item) => {
                return item !== e.target.name;
            });
            await this.setState({ listChecked: newState });
        }
        console.log("list state checked: ", this.state.listChecked);
        const lengthChecked = this.state.listChecked.length;
        console.log("length: ", lengthChecked);
        if (lengthChecked === 0) {
            axios({
                method: "GET",
                url: `http://localhost:2000/api/getproducts/${this.props.match.params.categoryId}`,
            })
                .then((res) => {
                    this.setState({
                        products: res.data,
                    });
                    // console.log("result: ", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios({
                method: "GET",
                url: `http://localhost:2000/api/products/${
                    this.state.listChecked[lengthChecked - 1]
                }`,
                headers: {
                    Authorization: localStorage.getItem("user"),
                },
            })
                .then((response) => {
                    if (response.data.message === "not found product") {
                        this.setState({
                            products: [],
                        });
                    }
                    this.setState({
                        products: response.data,
                    });
                    console.log("product: ", response.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        console.log(e.target.checked);
        console.log(e.target.name);
    };

    render() {
        let { parentCategories } = this.state;
        let categoryId = this.props.match.params.categoryId;
        let childListCategories;
        let countProducts;
        let nameCategory;

        if (parentCategories.categoryList) {
            childListCategories = parentCategories.categoryList.filter(
                (category) => {
                    return category._id === categoryId;
                }
            );
            nameCategory = childListCategories[0].name;
        }
        let { products } = this.state;
        if (products.products) {
            countProducts = products.products.length;
        }

        return (
            <>
                <Header />
                <Navbar />
                <div className="container">
                    <div className="row" id="content">
                        <div className="col-sm-3">
                            <h3>Hãng sản xuất</h3>
                            <div class="row">
                                {childListCategories &&
                                    childListCategories[0].children.map(
                                        (category) => (
                                            <div className="col-6">
                                                <input
                                                    type="checkbox"
                                                    id={category._id}
                                                    name={category.slug}
                                                    onChange={this.handleChange}
                                                    style={
                                                        ({ width: "40px" },
                                                        { margin: "0" },
                                                        { padding: "0" },
                                                        { height: "25px" },
                                                        { marginLeft: "5px" })
                                                    }
                                                />
                                                <label style={{}}>
                                                    {category.name}
                                                </label>
                                                <br />
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                        <div
                            className="col-sm-9"
                            style={{ backgroundColor: "white" }}
                        >
                            <div style={{ border: "1px solid white" }}>
                                <h2>
                                    {nameCategory}({countProducts} sản phẩm)
                                </h2>
                            </div>
                            <section>
                                <div className="row" style={{}}>
                                    {products.products ? (
                                        products.products.map((product) => (
                                            <div
                                                className="col-sm-3"
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <div className>
                                                    <div>
                                                        <a
                                                            href={
                                                                "/product/" +
                                                                product._id
                                                            }
                                                        >
                                                            <div>
                                                                <img
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
                                                                <div />
                                                            </div>
                                                        </a>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginLeft: "20px",
                                                        }}
                                                    >
                                                        <h5>{product.name}</h5>
                                                        <div
                                                            class="badge badge-danger"
                                                            style={
                                                                ({
                                                                    padding:
                                                                        "5px",
                                                                },
                                                                {
                                                                    width: "70px",
                                                                })
                                                            }
                                                        >
                                                            {product.price} $
                                                        </div>
                                                    </div>

                                                    <a
                                                        href={
                                                            "/product/" +
                                                            product._id
                                                        }
                                                    >
                                                        <button
                                                            className="btn btn-primary"
                                                            style={
                                                                ({
                                                                    marginLeft:
                                                                        "100px",
                                                                },
                                                                {
                                                                    marginTop:
                                                                        "15px",
                                                                })
                                                            }
                                                        >
                                                            Xem chi tiết
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <h1 style={{ marginLeft: "50px" }}>
                                            Không có sản phẩm
                                        </h1>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default ProductByCategory;
