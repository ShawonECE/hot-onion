import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { breakfastItems } from '../../DataBase/ImageData';
import '../Food.css'

const BreakfastItems = (props) => {
    const {addToCart, clickOnFood} = props;
    return (
        <div className="container">
            <Row xs={1} md={3} className="g-4">
            {breakfastItems.map( food => (
                <Col key={food.key}>
                <Card className='text-center food-card' onClick={()=>clickOnFood(food.category, food.key)}>
                    <Card.Img variant="top" src={food.photoUrl} />
                    <Card.Body>
                        <Card.Title>{food.name}</Card.Title>
                        <Card.Text className='description'>
                            {food.description}
                        </Card.Text>
                        <h5>Price: ${food.price}</h5>
                        <br />
                        <button className='btn-type-two' onClick={(event) => addToCart(food, event)}>
                            <span className='d-flex align-items-center'>
                                <span className="material-symbols-outlined">shopping_cart</span>Add to Cart
                            </span>
                        </button>
                    </Card.Body>
                </Card>
                </Col>
            ))}
        </Row>
        </div>
    );
};

export default BreakfastItems;