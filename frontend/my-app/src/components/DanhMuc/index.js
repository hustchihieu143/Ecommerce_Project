import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import "./style.css";

class DanhMuc extends Component {
    render() {
        return (
            <div className="boxDanhMuc">
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/dien-thoai.png"></img>
                    <p>Điện thoại</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/laptop.png"></img>
                    <p>Laptop</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/apple.png"></img>
                    <p>Apple</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/tablet.png"></img>
                    <p>Máy tính bảng</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/smart-watch.png"></img>
                    <p>Đồng hồ thông minh</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/xiaomi2.png"></img>
                    <p>Xiaomi</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/may_cu.png"></img>
                    <p>Máy cũ</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/monitor2x.png"></img>
                    <p>Màn hình</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/thu_cu_doi_moi.png"></img>
                    <p>Thu cũ đổi mới</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/kinhcuongluc.png"></img>
                    <p>Kính cường lực</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/may-tinh-de-ban.png"></img>
                    <p>Máy tính để bàn</p>
                </button>
                <button className="button">
                    <img src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/https://fptshop.com.vn/Uploads/images/v5d/may-in.png"></img>
                    <p>Máy in</p>
                </button>
            </div>
        );
    }
}
export default DanhMuc;
