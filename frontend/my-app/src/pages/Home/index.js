import React from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Footer from "../../components/Footer";
import Promotion from "../../components/Promotion";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import DanhMuc from "../../components/DanhMuc";
import "./style.css";
import { Container } from "react-bootstrap";

/**
 * @author
 * @function Home
 **/

const Home = () => {
    return (
        <div className="all">
            <Header></Header>
            <Navbar />
            <div className="content">
                <Container>
                    <Carousel></Carousel>
                    <DanhMuc />
                    <Promotion></Promotion>
                </Container>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;
