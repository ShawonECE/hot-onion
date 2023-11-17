import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { allItems } from '../../DataBase/ImageData';
import './FoodDetail.css';
import '../Food.css';
import { CommonContext } from '../../App';

const FoodDetail = (props) => {
    const addToCart = props.addToCart;
    const decreaseItem = props.decreaseItem;
    const {key} = useParams();
    const [cart] = useContext(CommonContext);
    // const [inputDisabled, setInputDisabled] = useState(true);
    const food = allItems.find(element => element.key === key);
    const currentFoodInCart = cart.find(element => element.key === key);
    const currentQuantityInCart = currentFoodInCart? currentFoodInCart.quantity : 0;
    
    return (
        <div className="container">
            <br />
            <div className='row'>
                <div className="col-12 col-sm-5">
                    <br /><br /><br />
                    <h1>{food.name}</h1>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum placeat, beatae modi aliquid quia non omnis saepe magni eaque quibusdam tempora sit id? Consequatur, nesciunt blanditiis. Aspernatur vel facilis perferendis.
                    </p>
                    <br />
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>${food.price}</h2>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button className='increment d-flex justify-content-center align-items-center' onClick={(event) => addToCart(food, event)}><span class="material-symbols-outlined">add</span></button>
                            <input type="text" className='quantity-field text-center' value={currentQuantityInCart} disabled={true}/>
                            <button className='decrement d-flex justify-content-center align-items-center' onClick={() => decreaseItem(food)} ><span class="material-symbols-outlined">remove</span></button>
                        </div>
                    </div> 
                    <br />
                    <button className='btn-type-two' onClick={(event) => addToCart(food, event)}>
                        <span className='d-flex align-items-center'>
                            <span className="material-symbols-outlined">shopping_cart</span>Add to cart
                        </span>
                    </button>       
                    
                </div>
                <div className="col-12 col-sm-7 d-flex justify-content-center">
                    <img src={food.photoUrl} className='photo-detail' alt="" />
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;