import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import recommend1 from '../../images/recommend1.png';
import recommend2 from '../../images/recommend2.png';
import recommend3 from '../../images/recommend3.png';
import './Recommendation.css';

const Recommendation = () => {
    return (
        <div className='container'>
            <h2>Why to choose us</h2> 
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quasi harum voluptate, cumque natus quibusdam est dicta tempora molestiae quam.</p> 
            <br />
            <Row xs={1} md={3} className="g-4">
                <Col>
                    <Card className='recommend-card'>
                        <Card.Img className='card-img' variant="top" src={recommend1} />
                        <Card.Body>
                            <Row>
                                <Col xs='auto' md='auto'>
                                <div className="avatar rounded-circle d-flex align-items-center justify-content-center">
                                <span class="white material-symbols-outlined">directions_bus</span>
                                </div> 
                                </Col>
                                <Col>
                                    <Card.Title>Fast Delivery</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content.
                                    </Card.Text>
                                    <Card.Link style={{textDecoration: 'none'}}>See more</Card.Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='recommend-card'>
                        <Card.Img className='card-img' variant="top" src={recommend2} />
                        <Card.Body>
                            <Row>
                                <Col xs='auto' md='auto'>
                                <div className="avatar rounded-circle d-flex align-items-center justify-content-center">
                                    <span class="white material-symbols-outlined">notifications</span>
                                </div> 
                                </Col>
                                <Col>
                                    <Card.Title>A Good Auto Responder</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content.
                                    </Card.Text>
                                    <Card.Link style={{textDecoration: 'none'}}>See more</Card.Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className='recommend-card'>
                        <Card.Img className='card-img' variant="top" src={recommend3} />
                        <Card.Body>
                            <Row>
                                <Col xs='auto' md='auto'>
                                <div className="avatar rounded-circle d-flex align-items-center justify-content-center">
                                    <span className="white material-symbols-outlined">local_shipping</span>
                                </div> 
                                </Col>
                                <Col>
                                    <Card.Title>Home Delivery</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content.
                                    </Card.Text>
                                    <Card.Link style={{textDecoration: 'none'}}>See more</Card.Link>
                                </Col>
                            </Row>                   
                        </Card.Body>
                    </Card>
                </Col>
            </Row>          
        </div>
    );
};

export default Recommendation;