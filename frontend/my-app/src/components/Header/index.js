import React, { Component } from "react";
import {
    Navbar,
    Nav,
    Button,
    InputGroup,
    FormControl,
    NavDropdown,
    Dropdown,
} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BiCart } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
        this.handleLogout = this.handleLogout.bind(this);
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:2000/api/category/getcategory",
        })
            .then((res) => {
                this.setState({
                    categories: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleLogout() {
        localStorage.clear();
    }
    render() {
        const { categories } = this.state;
        return (
            <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
                <Navbar.Brand href="/">FPT Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <InputGroup className="ml-5 mt-1">
                            <FormControl
                                placeholder="Search..."
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <Button className="pd-3">
                                <BsSearch />
                            </Button>
                        </InputGroup>
                        <Nav.Link href="/products">Products</Nav.Link>
                        {categories.categoryList &&
                            categories.categoryList.map((item) => (
                                <NavDropdown
                                    title={item.name}
                                    id="collasible-nav-dropdown"
                                >
                                    {item.children &&
                                        item.children.map((element, index) => (
                                            <Dropdown.Item
                                                key={index}
                                                href={"/" + element.slug}
                                            >
                                                {element.name}
                                            </Dropdown.Item>
                                        ))}
                                </NavDropdown>
                            ))}
                        <Nav.Link href="/create/product">
                            Create product
                        </Nav.Link>
                        <Nav.Link href="/product/admin">product admin</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">
                            Xin Chào {localStorage.getItem("name")}
                        </Nav.Link>
                        <Nav.Link
                            eventKey={2}
                            href="/"
                            onClick={this.handleLogout}
                        >
                            LogOut
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="/cart">
                            <BiCart />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
