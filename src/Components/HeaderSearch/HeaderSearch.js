import React, { useState } from 'react';
import './HeaderSearch.css'
import { Form } from 'react-bootstrap';
import '../NavBar/NavBar.css';
import { allItems } from '../../DataBase/ImageData';
import SearchResults from '../SearchResults/SearchResults';

const HeaderSearch = () => {
    //console.log(searchOnFocus);
    const [query, setQuery] = useState('');
    const foods = allItems.map(item => item.name.toLowerCase());
    const getFilteredItems = (query, foods) => {
        if (query) {
            return foods.filter(item => item.includes(query));
        }
        else {
            return [];
        }
    };
    const filteredItems = getFilteredItems(query, foods);
    //console.log(filteredItems);
    return (
        <div className='search-area'>
            <div className="container d-flex align-items-center justify-content-center" id="subscribe">
                <div>
                    <h1>Best food awaiting for you</h1>
                    <br />
                    <Form className='d-flex'>
                        <Form.Control type="text" placeholder="Search food items" onChange={(event) => setQuery((event.target.value).toLowerCase())}/>
                    </Form>
                    {
                        <SearchResults className='search-list' results={filteredItems}></SearchResults>
                    }  
                </div>
            </div>
        </div>
    );
};

export default HeaderSearch;