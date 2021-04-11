import React, { Component } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { VscEdit } from "react-icons/vsc";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import Header from "../../components/Header";
import { withRouter } from "react-router";
class ProductAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isShowCreate: false,
            isShowUpdate: false,
            id: "",
            categories: [],
            name: "",
            price: 0,
            quantity: 0,
            description: "",
            category: "",
            selectedFile: [],
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
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

    handleCreate = (event) => {
        event.preventDefault();
        this.setState({
            isShowCreate: true,
        });
    };
    handleClose = (event) => {
        event.preventDefault();
        this.setState({
            isShowCreate: false,
            isShowUpdate: false,
        });
    };

    handleUpdate = (id) => {
        this.setState({
            isShowUpdate: true,
            id: id,
        });
    };
    handleSubmit = (event) => {
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
    };

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

        axios({
            method: "POST",
            url: `http://localhost:2000/api/admin/product/delete/${this.props.match.params.id}`,
            headers: {
                Authorization: localStorage.getItem("user"),
            },
        })
            .then((response) => {
                console.log(response);
                alert("Xóa thành công");
                this.props.history.push("/products");
            })
            .catch((error) => {
                console.log(error);
            });
    }
    update = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("price", this.state.price);
        formData.append("quantity", this.state.quantity);
        formData.append("description", this.state.description);
        formData.append("category", this.state.category);
        formData.append("productPictures", this.state.selectedFile);

        axios({
            method: "POST",
            url: `http://localhost:2000/api/admin/product/update/${this.state.id}`,
            data: formData,
            headers: {
                Authorization: localStorage.getItem("user"),
            },
        })
            .then((response) => {
                console.log(response);
                alert("update thanh cong");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        let { products, categories } = this.state;
        console.log("id update: ", this.state.id);
        return (
            <>
                <Header />
                <Container>
                    <Button onClick={this.handleCreate}>
                        <IoMdAdd />
                        Thêm sản phẩm
                    </Button>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ProductId</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.products &&
                                products.products.map((product, index) => (
                                    <tr>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <Button
                                                onClick={() =>
                                                    this.handleUpdate(
                                                        product._id
                                                    )
                                                }
                                            >
                                                <VscEdit />
                                                Sửa
                                            </Button>

                                            <a
                                                href={
                                                    "/product/delete/" +
                                                    product._id
                                                }
                                            >
                                                <Button>
                                                    <RiDeleteBinLine />
                                                    Xóa
                                                </Button>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <Modal show={this.state.isShowCreate}>
                        <Modal.Header>Create Product</Modal.Header>
                        <Modal.Body>
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
                                        value={this.state.category}
                                        onChange={this.onChangeCategory}
                                    >
                                        {categories.categoryList &&
                                            categories.categoryList.map(
                                                (category, index) =>
                                                    category.children &&
                                                    category.children.map(
                                                        (child, index) => (
                                                            <option
                                                                value={
                                                                    child._id
                                                                }
                                                                key={index}
                                                            >
                                                                {child.name}
                                                            </option>
                                                        )
                                                    )
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

                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={this.handleSubmit}
                                >
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

                    <Modal show={this.state.isShowUpdate}>
                        <Modal.Header>Update Product</Modal.Header>
                        <Modal.Body>
                            <Form>
                                <h1>Update Product</h1>
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
                                        value={this.state.category}
                                        onChange={this.onChangeCategory}
                                    >
                                        {categories.categoryList &&
                                            categories.categoryList.map(
                                                (category, index) =>
                                                    category.children &&
                                                    category.children.map(
                                                        (child, index) => (
                                                            <option
                                                                value={
                                                                    child._id
                                                                }
                                                                key={index}
                                                            >
                                                                {child.name}
                                                            </option>
                                                        )
                                                    )
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

                                <a href={"/product/update/" + this.state.id}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={this.update}
                                    >
                                        Submit
                                    </Button>
                                </a>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>
                                Close Modal
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </>
        );
    }
}
export default withRouter(ProductAdmin);
