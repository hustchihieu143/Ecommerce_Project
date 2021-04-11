import React from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Footer from "../../components/Footer";
import Promotion from "../../components/Promotion";

/**
 * @author
 * @function Home
 **/

const Home = () => {
    console.log("Home");
    return (
        <section>
            <Header></Header>
            <Title></Title>
            <Promotion></Promotion>
            <Footer></Footer>
        </section>
    );
};

export default Home;
