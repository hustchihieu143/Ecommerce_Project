import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import "./style.css";
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            value: "",
            quantity: 1,
        };
        // this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `http://localhost:2000/api/product/${this.props.match.params.id}`,
        })
            .then((product) => {
                this.setState({
                    product: product.data,
                });
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }

    async addToCart(product, quantity, price, img) {
        await axios({
            method: "POST",
            url: "http://localhost:2000/api/user/cart/addtocart",
            headers: {
                Authorization: localStorage.getItem("user"),
            },
            data: {
                cartItems: {
                    product: product,
                    quantity: quantity,
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
        // e.preventDefault();
        await this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        const { product, quantity, value } = this.state;
        let price;
        let oldPrice;
        let productId, productImg;
        let productQuantity;
        // console.log("selected: ", this.state);
        if (product.product) {
            console.log("product: ", product.product);
            productQuantity = product.product.quantity;
            if (value === "giam-tien") {
                price = product.product.price - 10;
            } else price = product.product.price;
            oldPrice = product.product.price * 1.2;
            console.log("product: ", product.product);
            productId = product.product._id;
            productImg = product.product.productPictures[0].img;
        }

        return (
            <>
                <Header />
                <Navbar />
                <div className="container" style={{ marginTop: "30px" }}>
                    <div className="name-product">
                        <h2 style={{ color: "red" }}>
                            {product.product && product.product.name}
                        </h2>
                        <span style={{ fontSize: "20px" }}>
                            ({productQuantity} sản phẩm)
                        </span>
                        <hr></hr>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {product.product &&
                                product.product.productPictures.map((item) => (
                                    <img
                                        key={item._id}
                                        style={
                                            ({ width: "100%" },
                                            { height: "300px" })
                                        }
                                        src={
                                            "http://localhost:2000/public/" +
                                            item.img
                                        }
                                        alt="product"
                                    ></img>
                                ))}
                        </div>
                        <div className="col-6">
                            <div className="info">
                                <span
                                    className="price-km"
                                    style={{ color: "red" }}
                                >
                                    {price} $
                                </span>

                                <span className="price">{oldPrice} $</span>
                            </div>
                            <div className="uu-dai">
                                <div className="header-uudai">
                                    <span>Chọn 1 trong 2 khuyến mãi sau</span>
                                </div>
                                <form className="select">
                                    <label>
                                        <input
                                            type="radio"
                                            name="value"
                                            value="giam-tien"
                                            checked={
                                                this.state.value === "giam-tien"
                                            }
                                            onChange={this.handleChange}
                                        />
                                        Giảm ngay 10$
                                    </label>
                                    <br></br>
                                    <label>
                                        <input
                                            type="radio"
                                            name="value"
                                            value="tra-gop"
                                            checked={
                                                this.state.value === "tra-gop"
                                            }
                                            onChange={this.handleChange}
                                        />
                                        Trả góp 0%
                                    </label>
                                </form>
                                <div className="uu-dai-them">
                                    <span>Ưu đãi thêm</span>
                                    <br></br>
                                    <span>
                                        Tặng gói iCloud 50GB miễn phí 3 tháng
                                    </span>
                                    <br></br>
                                    <span>Tặng Bảo hành 2 năm chính hãng</span>
                                    <br></br>
                                    <span>
                                        Thu cũ đổi mới - Trợ giá ngay 15%
                                    </span>
                                    <br></br>
                                    <span>
                                        Cơ hội trúng 100 vé bay miễn phí
                                    </span>
                                </div>
                            </div>
                            <div
                                className="set-quantity"
                                style={{ marginTop: "20px" }}
                            >
                                <h3>Số lượng</h3>
                                <form style={{}}>
                                    <input
                                        className="quantity"
                                        min={0}
                                        name="quantity"
                                        defaultValue={1}
                                        type="number"
                                        onChange={(e) => {
                                            this.setState({
                                                quantity: e.target.value,
                                            });
                                        }}
                                    />
                                </form>
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ marginTop: "30px" }}
                                onClick={() =>
                                    this.addToCart(
                                        productId,
                                        quantity,
                                        price,
                                        productImg
                                    )
                                }
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="description">
                        <h1>Mô tả chi tiết</h1>
                        <span>
                            {product.product && product.product.description}
                        </span>
                    </div>
                </div>
            </>
        );
    }
}
export default ProductDetail;
