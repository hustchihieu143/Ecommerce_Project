import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";

class CategoryAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowCreate: false,
            name: "",
            selectedFile: [],
            categories: [],
            categoryParent: "",
        };
    }
    onChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    onChangeCategoryParent = (e) => {
        this.setState({
            categoryParent: e.target.value,
        });
    };

    onChangeFile = (e) => {
        this.setState({
            selectedFile: e.target.files[0],
        });
    };

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
        });
    };

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

    handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:2000/api/category/create",
            headers: {
                Authorization: localStorage.getItem("user"),
            },
            data: {
                name: this.state.name,
                parentId: this.state.categoryParent,
                categoryImage: this.state.selectedFile,
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        let { categories } = this.state;

        return (
            <>
                <Button onClick={this.handleCreate}>
                    <IoMdAdd />
                    Thêm danh mục
                </Button>
                <Modal show={this.state.isShowCreate}>
                    <Modal.Header>Create Category</Modal.Header>
                    <Modal.Body>
                        <Form>
                            <h1>Create Category</h1>
                            <Form.Group>
                                <Form.Label>Name Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Category Parent</Form.Label>

                                <select
                                    name="categoryParent"
                                    id="inputcategory"
                                    className="form-control"
                                    value={this.state.categoryParent}
                                    onChange={this.onChangeCategoryParent}
                                >
                                    <option value="">Null</option>
                                    {categories.categoryList &&
                                        categories.categoryList.map(
                                            (category, index) => (
                                                <option
                                                    value={category._id}
                                                    key={index}
                                                >
                                                    {category.name}
                                                </option>
                                            )
                                        )}
                                </select>
                            </Form.Group>

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
                        <Button onClick={this.handleClose}>Close Modal</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default CategoryAdmin;
