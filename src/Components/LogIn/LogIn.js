import React, { useContext, useState } from 'react';
import './LogIn.css';
import logo2 from '../../images/logo2.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../Firebase-Config/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';

const app = initializeApp(firebaseConfig);
const LogIn = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {message, setMessage, messageColor, setMessageColor} = props;

    const handleBlur = (event) => {
        let validForm = true;
        if (event.target.name === 'email') {
          const validEmail = /^\S+@\S+\.\S+$/.test(event.target.value);
          validForm = validForm && validEmail;
          //console.log(validEmail);
        }
        else if (event.target.name === 'password') {
          const validPassword = /\d{1}/.test(event.target.value) && event.target.value.length > 6;
          validForm = validPassword && validForm;
          //console.log(validPassword);
        }
        if(validForm) {
          const newUser = {...user};
          newUser[event.target.name] = event.target.value;
          setUser(newUser);
          //console.log('validated');
        }
      }

    const handleSubmit = (event) => {
        if (user.email && user.password) {
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then(res => {
            const {displayName, email, photoURL} = res.user;
            const userLoggedIn = {
                isLoggedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            };
            setUser(userLoggedIn);
            setLoggedInUser(userLoggedIn);
            setMessage('You have successfully Logged in');
            setMessageColor('green');
            
            if(location.state?.from) {
                navigate(location.state.from);
            }
            
            })
            .catch((error) => {
            const errorMessage = error.message;
            setMessage(errorMessage);
            setMessageColor('red');
            });
        }
        event.preventDefault();
    }

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            const userLoggedIn = {
            isLoggedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
            };
            setLoggedInUser(userLoggedIn);
            setMessage('Successfully Signed in');
            setMessageColor('green');
            
            if(location.state?.from) {
                navigate(location.state.from);
              }
        })
        .catch(error => setMessage(error.message));
    };
    return (
        <div className="background">
            <div className='container'>
                {
                    location.state?.from && <h5 className='d-flex justify-content-center' style={{color: '#f52a64'}}>Please log in to proceed</h5>
                }
                <br />
                <div className='d-flex justify-content-center'>
                    <img src={logo2} className='logo-img' alt="" />
                </div>
                <br /><br />
                <div className='d-flex justify-content-center'>
                    <form style={{width: '300px'}} onSubmit={handleSubmit}>
                        <div>
                            <input type="email" className="form-control" name="email" onBlur={handleBlur} aria-describedby="emailHelp" placeholder='Enter your email'/>
                        </div>
                        <br />
                        <div>
                            <input type="password" className="form-control" name="password" onBlur={handleBlur} placeholder='Enter your password'/>
                        </div>
                        <br />
                        <div class="d-grid">
                            <input className="btn-login" type="submit" value='Log in'/>
                        </div>
                    </form>    
                </div>
                <br />
                <h6 className="aux-text d-flex justify-content-center" style={{color: messageColor}}>{message} {loggedInUser.name}</h6>
                <br />
                <Link className="aux-text d-flex justify-content-center" to='/signup'>Haven't registered yet</Link>
                <h6 className="aux-text d-flex justify-content-center" onClick={handleGoogleSignIn}>
                    Log in with Google
                </h6>
                <br /><br /><br /><br />
            </div>
        </div>
    );
};

export default LogIn;