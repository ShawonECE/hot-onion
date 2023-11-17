import React, { useContext } from 'react';
import logo2 from '../../images/logo2.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { Link } from 'react-router-dom';
import { CommonContext, UserContext } from '../../App';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Firebase-Config/FirebaseConfig';


const app = initializeApp(firebaseConfig);
const NavBar = (props) => {
    const {setMessage} = props;
    const userDefault = {
        isLoggedIn: false,
        name: '',
        email: '',
        photo: ''
    };
    const [cart] = useContext(CommonContext);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const itemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogOut = () => {
        const auth = getAuth(app);
        signOut(auth)
        .then(() => {
          setLoggedInUser(userDefault);
          setMessage('');
          console.log('Successfully Signed Out');
        })
        .catch(error => {
          console.log(error.message);
        });
    }
    return (
        <Navbar expand="lg" className="bg-white py-1">
            <Container>
                <Link to='/'>
                    <img
                        src={logo2}
                        width="160"
                        height="43"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className='navItem'>
                            <Link to='/my-cart' style={{color: '#f52a64', textDecoration: 'none'}}><span className="material-symbols-outlined">shopping_cart</span><span id='itemNumber'>{(itemsInCart)}</span></Link>
                        </Nav.Link>
                        <Nav.Link className='navItem'><Link to='/login' className='link'>Log in</Link></Nav.Link>
                        {
                            loggedInUser.isLoggedIn ? <button className='btn-type-one navItem' onClick={handleLogOut}>Log out</button> : <button className='btn-type-one navItem'><Link to='/signup' className='link-2'>Sign Up</Link></button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
};

export default NavBar;