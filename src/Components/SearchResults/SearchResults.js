import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { allItems } from '../../DataBase/ImageData';

const SearchResults = (props) => {
    const results = props.results;
    const capitalize = (string) => string[0].toUpperCase() +
    string.slice(1);
    const navigate = useNavigate();
    const handleSelect = (name) => {
        const food = allItems.find(item => item.name.toLowerCase() === name);
        navigate(`food_detail/${food.category}/${food.key}`);
    };
    return (
        <Dropdown show={results.length > 0}>
            <Dropdown.Menu>
                {       
                    results.map(item => {
                    const name = capitalize(item);
                    return <Dropdown.Item as='button' onClick={() => handleSelect(item)} eventKey={name}><span className='d-flex align-items-center'><span class="material-symbols-outlined" style={{marginRight: '20px'}}>
                    search</span>{name}</span></Dropdown.Item>
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SearchResults;