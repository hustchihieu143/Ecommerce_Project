import React, { Component } from "react";
import {
    Navbar,
    Nav,
    Button,
    InputGroup,
    FormControl,
    NavDropdown,
    Dropdown,
    Container,
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
    handleLogout() {
        localStorage.clear();
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
                <Container>
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
                </Container>
            </Navbar>
        );
    }
}

export default Header;
