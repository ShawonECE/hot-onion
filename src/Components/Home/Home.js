import React from 'react';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import Categories from '../Categories/Categories';
import Recommendation from '../Recommendation/Recommendation';




const Home = (props) => {
    const addToCart = props.addToCart;
    return (
        <div>
            <HeaderSearch></HeaderSearch>
            <br />
            <Categories addToCart={addToCart}></Categories>
            <br />
            <Recommendation></Recommendation>
        </div>
    );
};

export default Home;