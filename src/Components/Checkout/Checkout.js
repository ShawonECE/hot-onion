import React, { useContext, useState } from 'react';
import './Checkout.css';
import { CommonContext } from '../../App';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { processOrder } from '../../DataBase/databaseManager';

const Checkout = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const deliveryInfoDefault = {
        road: '',
        house: '',
        business: '',
        instruction: ''
    };

    const deliveryInfoCollection ={};
    const [deliveryInfo, setDeliveryInfo] = useState(deliveryInfoDefault);
    const handleBlur = (event) => {
        deliveryInfoCollection[event.target.name] = event.target.value;
    };
    const handleSubmit = (event) => {
        setDeliveryInfo(deliveryInfoCollection);
        event.preventDefault();
    };
    const handleOrder = () => {
        processOrder();
        setCart([]);
        setOrderPlaced(true);
    };
    const deliveryCharge = 3;
    const [cart, setCart] = useContext(CommonContext);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    return (
        <div className='container'>
            <div className="row">
                <div className="col-12 col-sm-6">
                    <div className="address">
                        <p className='delivery-title'>Edit delivery details</p>
                        <hr />
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input type="text" onBlur={handleBlur} className="form-control" name="road" placeholder='Road name' required/>
                            </div>
                            <br />
                            <div>
                                <input type="text" onBlur={handleBlur} className="form-control" name="house" placeholder='House no, flat or floor no.' required/>
                            </div>
                            <br />
                            <div>
                                <input type="text" onBlur={handleBlur} className="form-control" name="business" placeholder='Business name (if any)'/>
                            </div>
                            <br />
                            <div>
                                <input type="text" onBlur={handleBlur} className="form-control" name="instruction" placeholder='Delivery Instruction (if any)'/>
                            </div>
                            <br />
                            <div class="d-grid">
                                <input className="btn-checkout" type="submit" value='Save & continue'/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                    <Card className="summary">
                        <Card.Body>
                            <p className='summary-text'>From: <span className='food-title'>PTI Morh</span></p>
                            <p className='summary-text'>To: <span className='food-title'>{deliveryInfo.house} {deliveryInfo.road}</span></p>
                            <p className='summary-text'>Arriving in 20-30 minutes</p>
                            <br />
                            {
                            cart.map(item => (
                                <Card className='item'>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={5} className='d-flex align-items-center justify-content-center'>
                                                <img src={item.photoUrl} className='item-img' alt="" /> 
                                            </Col>
                                            <Col xs={7}>
                                                <p className='food-title'>{item.name}</p>
                                                <p className='summary-text'>Quantity: <span className='food-title'>{item.quantity}</span></p>
                                                <p className='summary-text'>Price: <span className='food-title'>${item.price * item.quantity}</span></p>
                                            </Col>
                                        </Row>                   
                                    </Card.Body>
                                </Card>
                            ))}
                            <br />
                            <div className="row">
                                <div className="col"><span className='summary-text'>Subtotal: <span className='food-title'>{totalItems}</span> item</span></div>
                                <div className="col d-flex justify-content-end"><span className='food-title'>${totalPrice}</span></div>
                            </div>
                            <div className="row">
                                <div className="col"><span className='summary-text'>Delivery charge:</span></div>
                                <div className="col d-flex justify-content-end"><span className='food-title'>${totalItems > 0 ? deliveryCharge : 0}</span></div>
                            </div>
                            <div className="row">
                                <div className="col"><span className='summary-text'>Total:</span></div>
                                <div className="col d-flex justify-content-end"><span className='food-title'>${totalItems > 0 ? (totalPrice + deliveryCharge).toFixed(2) : 0}</span></div>
                            </div>
                            <br />
                            <div class="d-grid">
                                <button onClick={handleOrder} disabled={!(totalItems > 0) || !(deliveryInfo.road)} className="btn-checkout" type="button">Place order</button>
                            </div>
                        </Card.Body>
                    </Card>
                    <br />
                    {
                        orderPlaced && <h4 className='d-flex justify-content-center'>Order placed successfully!</h4>
                    }
                </div>
            </div>
        </div>
    );
};

export default Checkout;