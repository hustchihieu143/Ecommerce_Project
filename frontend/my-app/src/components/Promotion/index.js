import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import "./style.css";
/**
 * @author
 * @function Promotion
 **/

const Promotion = (props) => {
    return (
        <Container>
            <div className="khuyen-mai">
                <div className="text">
                    <h2>KHUYẾN MÃI HOT</h2>
                </div>
                <div className="row">
                    <Button style={{ width: "24%" }} variant="Light">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/2/3/637479612642653058_ip-12-pro-dd-2nam.jpg"
                            />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Button>
                    <Button Button style={{ width: "24%" }} variant="Light">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/1/14/637462639794639518_ss-s21-ultra-128-dd.png"
                            />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Button>
                    <Button Button style={{ width: "24%" }} variant="Light">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/2/3/637479617639114947_ip-12-dd-2nam.jpg"
                            />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Button>
                    <Button Button style={{ width: "24%" }} variant="Light">
                        <Card>
                            <Card.Img
                                variant="top"
                                src="https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/3/3/637503636824959109_ss-s20-plus-dd.jpg"
                            />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Promotion;
