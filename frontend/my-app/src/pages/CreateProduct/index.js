import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class CreateProduct extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            categories: [],
            name: "",
            price: 0,
            quantity: 0,
            description: "",
            category: "",
            selectedFile: [],
        };
    }

    onChangeName(e) {
        this.setState({ name: e.target.value });
    }
    onChangePrice(e) {
        this.setState({ price: e.target.value });
    }
    onChangeQuantity(e) {
        this.setState({ quantity: e.target.value });
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }
    onChangeCategory(e) {
        this.setState({ category: e.target.value });
    }
    onChangeFile(e) {
        this.setState({ selectedFile: e.target.files[0] });
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:2000/api/category/getcategory",
        })
            .then((response) => {
                this.setState({ categories: response.data });
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("price", this.state.price);
        formData.append("quantity", this.state.quantity);
        formData.append("description", this.state.description);
        formData.append("category", this.state.category);
        formData.append("productPictures", this.state.selectedFile);
        console.log("file: ", this.state.selectedFile);
        axios({
            method: "POST",
            url: "http://localhost:2000/api/admin/product/create",
            data: formData,
            headers: {
                Authorization: localStorage.getItem("user"),
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response);
                alert("Them thanh cong");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { categories, selectedFile } = this.state;
        console.log("state: ", this.state);
        return (
            <Form onSubmit={this.handleSubmit}>
                <h1>Create Product</h1>
                <Form.Group>
                    <Form.Label>Name product</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter price"
                        value={this.state.price}
                        onChange={this.onChangePrice}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter price"
                        value={this.state.quantity}
                        onChange={this.onChangeQuantity}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category </Form.Label>

                    <select
                        name="category"
                        id="inputcategory"
                        className="form-control"
                        required="required"
                        value={this.state.category}
                        onChange={this.onChangeCategory}
                    >
                        {categories.categoryList &&
                            categories.categoryList.map(
                                (category, index) =>
                                    category.children &&
                                    category.children.map((child, index) => (
                                        <option value={child._id} key={index}>
                                            {child.name}
                                        </option>
                                    ))
                            )}
                    </select>
                </Form.Group>
                {/* {this.state.selectedFile &&
                    this.state.selectedFile.map((child, index) => (
                        <div key={index}>{JSON.stringify(child)}</div>
                    ))} */}
                <Form.Group>
                    <Form.Label>Picture</Form.Label>
                    <input
                        type="file"
                        name="productPictures"
                        onChange={this.onChangeFile}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default CreateProduct;
