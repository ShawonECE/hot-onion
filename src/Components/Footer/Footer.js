import React from 'react';
import './Footer.css';
import logo from '../../images/logo.png'

const Footer = () => {
    const copyright = String.fromCodePoint(0x00A9);
    return (
        <div className='footer'>
            <div className="container">
                <br /><br /><br />
                <div className="row">
                    <div className="col-12 col-sm-6 footer-col">
                        <img className='footer-logo' src={logo} alt="" />
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="footer-col">
                            <p className='footer-item'>About online food</p>
                            <p className='footer-item'>Read our blog</p>
                            <p className='footer-item'>Sign up for deliver</p>
                            <p className='footer-item'>Add your restaurant</p>
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <div className="footer-col">
                            <p className='footer-item'>Get help</p>
                            <p className='footer-item'>Read FAQs</p>
                            <p className='footer-item'>View all cities</p>
                            <p className='footer-item'>Restaurants near me</p>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <div className="footer-col">
                            <small className='copyright'> {copyright} Copyright 2020 Onion Food</small>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="d-flex footer-col">
                            <p className="footer-item2">Privacy policy</p>
                            <p className="footer-item2">Terms of use</p>
                            <p className="footer-item2">Pricing</p>
                        </div>
                    </div>
                </div>
                <br /><br />
            </div>
        </div>
    );
};

export default Footer;