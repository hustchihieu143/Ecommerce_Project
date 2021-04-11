import React from "react";
import { Container } from "react-bootstrap";
import "./style.css";

const FooterPage = () => {
    return (
        <footer
            className="text-center text-white"
            style={{ backgroundColor: "#caced1" }}
        >
            {/* Grid container */}
            <div className="container p-4">
                {/* Section: Images */}
                <section className>
                    <div className="row">
                        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                            <div
                                className="bg-image hover-overlay ripple shadow-1-strong rounded"
                                data-ripple-color="light"
                            >
                                <img
                                    src="https://mdbootstrap.com/img/new/fluid/city/113.jpg"
                                    className="w-100"
                                />
                                <a href="#!">
                                    <div
                                        className="mask"
                                        style={{
                                            backgroundColor:
                                                "rgba(251, 251, 251, 0.2)",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                            <div
                                className="bg-image hover-overlay ripple shadow-1-strong rounded"
                                data-ripple-color="light"
                            >
                                <img
                                    src="https://mdbootstrap.com/img/new/fluid/city/111.jpg"
                                    className="w-100"
                                />
                                <a href="#!">
                                    <div
                                        className="mask"
                                        style={{
                                            backgroundColor:
                                                "rgba(251, 251, 251, 0.2)",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                            <div
                                className="bg-image hover-overlay ripple shadow-1-strong rounded"
                                data-ripple-color="light"
                            >
                                <img
                                    src="https://mdbootstrap.com/img/new/fluid/city/112.jpg"
                                    className="w-100"
                                />
                                <a href="#!">
                                    <div
                                        className="mask"
                                        style={{
                                            backgroundColor:
                                                "rgba(251, 251, 251, 0.2)",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                            <div
                                className="bg-image hover-overlay ripple shadow-1-strong rounded"
                                data-ripple-color="light"
                            >
                                <img
                                    src="https://mdbootstrap.com/img/new/fluid/city/114.jpg"
                                    className="w-100"
                                />
                                <a href="#!">
                                    <div
                                        className="mask"
                                        style={{
                                            backgroundColor:
                                                "rgba(251, 251, 251, 0.2)",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                            <div
                                className="bg-image hover-overlay ripple shadow-1-strong rounded"
                                data-ripple-color="light"
                            >
                                <img
                                    src="https://mdbootstrap.com/img/new/fluid/city/115.jpg"
                                    className="w-100"
                                />
                                <a href="#!">
                                    <div
                                        className="mask"
                                        style={{
                                            backgroundColor:
                                                "rgba(251, 251, 251, 0.2)",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                            <div
                                className="bg-image hover-overlay ripple shadow-1-strong rounded"
                                data-ripple-color="light"
                            >
                                <img
                                    src="https://mdbootstrap.com/img/new/fluid/city/116.jpg"
                                    className="w-100"
                                />
                                <a href="#!">
                                    <div
                                        className="mask"
                                        style={{
                                            backgroundColor:
                                                "rgba(251, 251, 251, 0.2)",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Section: Images */}
            </div>
            {/* Grid container */}
            {/* Copyright */}
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © 2020 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">
                    MDBootstrap.com
                </a>
            </div>
            {/* Copyright */}
        </footer>
    );
};

export default FooterPage;
