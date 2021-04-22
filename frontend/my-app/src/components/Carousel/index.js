import React, { Component } from "react";
import { Carousel, Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import "./style.css";

class Carousel1 extends Component {
    render() {
        return (
            <div className="parentCarousel">
                <BrowserRouter>
                    <div className="boxCarousel">
                        <div id="left" style={{ height: "100%" }}>
                            <Carousel>
                                <Carousel.Item interval={1000}>
                                    <img
                                        style={{ borderRadius: "5px" }}
                                        src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/4/14/637540415133289761_F-H1_800x300.png"
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item interval={500}>
                                    <img
                                        style={{ borderRadius: "5px" }}
                                        src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/4/14/637540415133289761_F-H1_800x300.png"
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        style={{ borderRadius: "5px" }}
                                        src="https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/4/14/637540415133289761_F-H1_800x300.png"
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div id="right">
                            <img
                                style={{ borderRadius: "5px" }}
                                style={({ height: "70px" }, { width: "100%" })}
                                src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/4/6/637532663865219473_F-H2_385x100.png"
                            ></img>
                            <img
                                style={({ height: "70px" }, { width: "100%" })}
                                src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/4/1/637528348995862395_F-H2_385x100.png"
                            ></img>
                            <h6>Thông tin nổi bật</h6>
                            <span>
                                <img
                                    style={{ borderRadius: "5px" }}
                                    src="https://images.fpt.shop/unsafe/fit-in/70x40/filters:quality(90):fill(white)/https://fptshop.com.vn/uploads/images/tin-tuc/128769/Originals/stories_ava.png"
                                ></img>
                                <h6 style={{ float: "right" }}>
                                    Iphone 12 giảm đến 2 triệu
                                </h6>
                            </span>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
export default Carousel1;
