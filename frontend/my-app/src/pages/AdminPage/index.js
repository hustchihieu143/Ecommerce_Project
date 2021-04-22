import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class AdminPage extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
                <Navbar.Brand href="/">FPT Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/product/admin">product admin</Nav.Link>
                        <Nav.Link href="/category/admin">
                            category admin
                        </Nav.Link>
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
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default AdminPage;
