import React, { useContext } from 'react';
import { CommonContext } from '../../App';
import './Cart.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate('/checkout');
    };
    const deliveryCharge = 3;
    const addToCart = props.addToCart;
    const decreaseItem = props.decreaseItem;
    const [cart] = useContext(CommonContext);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return (
        <div className='container'>
            <br />
            <div className="row">
                <div className="col-12 col-sm-8">
                    {
                    cart.map(item => (
                        <Card className='item'>
                            <Card.Body>
                                <Row>
                                    <Col xs={4} md={2} className='d-flex align-items-center justify-content-center'>
                                        <img src={item.photoUrl} className='item-img' alt="" /> 
                                    </Col>
                                    <Col xs={8} md={6}>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                                        <Card.Text>Unit price: ${item.price}</Card.Text>
                                        <Card.Text>Price: ${item.price * item.quantity}</Card.Text>
                                    </Col>
                                    <Col xs={12} md={4} className='d-flex justify-content-center align-items-center'>      
                                        <button className='increment d-flex justify-content-center align-items-center' onClick={(event) => addToCart(item, event)}><span class="material-symbols-outlined">add</span></button>
                                        <input type="text" className='quantity-field text-center' value={item.quantity} disabled={true}/>
                                        <button className='decrement d-flex justify-content-center align-items-center' onClick={() => decreaseItem(item)} ><span class="material-symbols-outlined">remove</span></button>
                                    </Col>
                                </Row>                   
                            </Card.Body>
                        </Card>
                        ))
                    }
                </div>
                <div className="col-12 col-sm-4">
                    <Card className='summary-card'>
                        <Card.Body>
                            <Card.Title className='text-center'>Order Summary</Card.Title>
                            <br />
                            <Row>
                                <Col><Card.Text>Items:</Card.Text></Col>
                                <Col className='d-flex justify-content-end'><Card.Text className='bold'>{totalItems}</Card.Text></Col>
                            </Row>
                            <Row>
                                <Col><Card.Text>Total price:</Card.Text></Col>
                                <Col className='d-flex justify-content-end'><Card.Text className='bold'>${totalPrice.toFixed(2)}</Card.Text></Col>
                            </Row>
                            <Row>
                                <Col><Card.Text>Delivery charge:</Card.Text></Col>
                                <Col className='d-flex justify-content-end'><Card.Text className='bold'>${totalItems > 0 ? deliveryCharge : 0}</Card.Text></Col>
                            </Row>
                            <Row>
                                <Col><Card.Text>Grand Total:</Card.Text></Col>
                                <Col className='d-flex justify-content-end'><Card.Text className='bold'>${totalItems > 0 ? (totalPrice + deliveryCharge).toFixed(2) : 0}</Card.Text></Col>
                            </Row>
                            <br />
                            <div class="d-grid">
                                <button disabled={!(totalItems > 0)} className="btn-checkout" type="button" onClick={handleCheckout}>Checkout</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Cart;