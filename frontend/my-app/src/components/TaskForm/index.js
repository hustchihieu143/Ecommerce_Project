import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class TaskForm extends Component {
    render() {
        return (
            <div>
                <Modal>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Woohoo, you're reading this text in a modal!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default TaskForm;
