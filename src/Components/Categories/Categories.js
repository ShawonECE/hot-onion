import React, { useContext, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import './Categories.css';
import BreakfastItems from '../BreakfastItems/BreakfastItems';
import LaunchItems from '../LaunchItems/LaunchItems';
import DinnerItems from '../DinnerItems/DinnerItems';
import '../Food.css';
import { useNavigate } from 'react-router-dom';
import { CommonContext } from '../../App';

const Categories = (props) => {
    const {addToCart} = props;
    const [activeTab, setActiveTab] = useState("breakfast");
    const navigate = useNavigate();
    const clickOnFood = (category, key) => {
        navigate(`food_detail/${category}/${key}`);
    };
    const handleCheckout = () => {
        navigate('/my-cart');
    };
    const [cart] = useContext(CommonContext);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    
    return (
        <div>
            <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                <Nav className="justify-content-center" variant="underline">
                    <Nav.Item>
                        <Nav.Link eventKey="breakfast">Breakfast</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="launch">Launch</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="dinner">Dinner</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey="breakfast">
                        <BreakfastItems addToCart={addToCart} clickOnFood={clickOnFood}></BreakfastItems>
                    </Tab.Pane>
                    <Tab.Pane eventKey="launch">
                        <LaunchItems addToCart={addToCart} clickOnFood={clickOnFood}></LaunchItems>
                    </Tab.Pane>
                    <Tab.Pane eventKey="dinner">
                        <DinnerItems addToCart={addToCart} clickOnFood={clickOnFood}></DinnerItems>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            <br /><br />
            <div className="text-center">
                <button disabled={!(totalItems > 0)} className='btn-type-two' onClick={handleCheckout}>
                    <span className='d-flex align-items-center'>
                        <span className="material-symbols-outlined">shopping_cart_checkout</span>Checkout your food
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Categories;