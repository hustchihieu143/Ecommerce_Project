import React, { Component } from "react";
import axios from "axios";

class ProductsBySlug extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `http://localhost:2000/api/products/${this.props.match.params.slug}`,
            headers: {
                Authorization: localStorage.getItem("user"),
            },
        })
            .then((response) => {
                this.setState({ products: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        const { products } = this.state;
        return (
            <div>
                {products.products &&
                    products.products.map((product) => <p>{product.name}</p>)}
            </div>
        );
    }
}

export default ProductsBySlug;
