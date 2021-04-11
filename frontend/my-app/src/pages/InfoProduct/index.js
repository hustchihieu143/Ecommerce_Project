import React, { Component } from "react";
import axios from "axios";

class InfoProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
        };
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `http://localhost:2000/api/product/${this.props.match.params.id}`,
        })
            .then((response) => {
                this.setState({ product: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let { product } = this.state;
        console.log("id: ", this.props.match.params.id);
        return <h1>{product.product && product.product.name}</h1>;
    }
}
export default InfoProduct;
