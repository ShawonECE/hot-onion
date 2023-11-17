import React, { useState } from 'react';
import './SignUp.css';
import logo2 from '../../images/logo2.png';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../Firebase-Config/FirebaseConfig';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const app = initializeApp(firebaseConfig);
const SignUp = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const {message, setMessage, messageColor, setMessageColor} = props;
    
    const updateUserName = (name) => {
        const auth = getAuth(app);
        updateProfile(auth.currentUser, {
          displayName: name
        })
        .then(() => {
          console.log('Name updated successfully');
        }).catch((error) => {
          console.log(error);
        });
      }

    const handleBlur = (event) => {
        let validForm = true;
        let password = '';
        if (event.target.name === 'name') {
            const validName = /^[a-zA-Z ]{2,30}$/.test(event.target.value);
            validForm = validForm && validName;
        }
        else if (event.target.name === 'email') {
            const validEmail = /^\S+@\S+\.\S+$/.test(event.target.value);
            validForm = validForm && validEmail;
        }
        else if (event.target.name === 'password') {
            const validPassword = /\d{1}/.test(event.target.value) && event.target.value.length > 6;
            validForm = validPassword && validForm;
            password = validPassword? event.target.value : '';
        }
        else if (event.target.name === 'confirmPassword') {
            const validConfirmPassword = event.target.name === password;
            validForm = validConfirmPassword && validForm;
        }
        if(validForm) {
            const newUser = {...user};
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    }

    const handleSubmit = (event) => {
        if (user.name && user.email && user.password) {
            const auth = getAuth(app);
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(() => {
                updateUserName(user.name);
                setMessage('Successfully Signed Up');
                setMessageColor('green');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setMessage(errorMessage);
                setMessageColor('red');
            })
        }
        event.preventDefault();
    }

    return (
        <div className="background">
            <div className='container'>
                <br />
                <div className='d-flex justify-content-center'>
                    <img src={logo2} className='logo-img' alt="" />
                </div>
                <br /><br />
                <div className='d-flex justify-content-center'>
                    <form style={{width: '300px'}} onSubmit={handleSubmit}>
                        <div>
                            <input type="text" className="form-control" onBlur={handleBlur} name="name" placeholder='Enter your name'/>
                        </div>
                        <br />
                        <div>
                            <input type="email" className="form-control" onBlur={handleBlur} name="email" aria-describedby="emailHelp" placeholder='Enter your email'/>
                        </div>
                        <br />
                        <div>
                            <input type="password" className="form-control" onBlur={handleBlur} name="password" placeholder='Enter your password'/>
                        </div>
                        <br />
                        <div>
                            <input type="password" className="form-control" name="confirmPassword" onBlur={handleBlur} placeholder='Confirm your password'/>
                        </div>
                        <br />
                        <div class="d-grid">
                            <input className="btn-login" type="submit" value='Sign up'/>
                        </div>
                    </form>    
                </div>
                <br />
                <h6 className="aux-text d-flex justify-content-center" style={{color: messageColor}}>{message}</h6>
                <br />
                <Link class="aux-text d-flex justify-content-center" to='/login'>Already registered</Link>
                <br /><br /><br />
            </div>
        </div>
    );
};

export default SignUp;