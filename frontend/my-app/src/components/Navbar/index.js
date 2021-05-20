import { Component } from "react";
import axios from "axios";
import { Navbar, Nav, NavDropdown, Dropdown, Container } from "react-bootstrap";
import "./style.css";

class Navbar1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
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
    render() {
        const { categories } = this.state;
        return (
            <Navbar
                style={{ padding: "0px" }}
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
            >
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {categories.categoryList &&
                                categories.categoryList.map((item) => (
                                    <NavDropdown
                                        title={item.name}
                                        id="collasible-nav-dropdown"
                                    >
                                        {item.children &&
                                            item.children.map(
                                                (element, index) => (
                                                    <Dropdown.Item
                                                        key={index}
                                                        href={
                                                            "/" + element.slug
                                                        }
                                                    >
                                                        {element.name}
                                                    </Dropdown.Item>
                                                )
                                            )}
                                    </NavDropdown>
                                ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Navbar1;
