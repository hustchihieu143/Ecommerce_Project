import React, { Component } from "react";
import axios from "axios";
import { NavDropdown, Dropdown } from "react-bootstrap";

class Dropdown1 extends Component {
    render() {
        let listItems = this.props.children.map((element, index) => (
            <Dropdown.Item href={"#" + (index + 1)}>
                {element.name}
            </Dropdown.Item>
        ));
        return { listItems };
    }
}
export default Dropdown1;
