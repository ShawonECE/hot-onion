import './App.css';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import NoMatch from './Components/NotFound/NoMatch';
import FoodDetail from './Components/FoodDetail/FoodDetail';
import LogIn from './Components/LogIn/LogIn';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './Components/SignUp/SignUp';
import Cart from './Components/Cart/Cart';
import { createContext, useEffect, useState } from 'react';
import { getDatabaseCart, addToDatabaseCart, removeFromDatabaseCart } from './DataBase/databaseManager';
import { allItems } from './DataBase/ImageData';
import Checkout from './Components/Checkout/Checkout';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const CommonContext = createContext();
export const UserContext = createContext();
 
function App() {
  const userDefault = {
    isLoggedIn: false,
    name: '',
    email: '',
    photo: ''
  };
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(userDefault);
  const [cart, setCart] = useState([]);
  //console.log(cart);
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const foodKeys = Object.keys(savedCart);
    const cartFoods = foodKeys.map(foodKey => {
      const food = allItems.find(item => item.key === foodKey);
      food.quantity = savedCart[foodKey];
      return food;
    })
    setCart(cartFoods);
  }, []);

  const addToCart = (currentFood, event) => {
      event.stopPropagation();
      const keyToBeAdded = currentFood.key;
      const sameFood = cart.find(item => item.key === keyToBeAdded);
      let newCart;
      let count;
      if (sameFood) {
          count = sameFood.quantity + 1;
          sameFood.quantity = count;
          const otherFoods = cart.filter(item => item.key !== keyToBeAdded);
          newCart = [...otherFoods, sameFood];
      }
      else {
          count = 1;
          currentFood.quantity = 1;
          newCart = [...cart, currentFood];
      }
      setCart(newCart);
      addToDatabaseCart(keyToBeAdded, count);
    };

  const removeItem = (key) => {
    const newCart = cart.filter(item => item.key !== key);
    setCart(newCart);
    removeFromDatabaseCart(key);
  }
  
  const decreaseItem = (currentFood) => {
    const keyToBeDecreased = currentFood.key;  
    //console.log(keyToBeDecreased, 'decreased'); 
    const sameFood = cart.find(item => item.key === keyToBeDecreased);
    //console.log(sameFood);
    if (sameFood) {
      if (sameFood.quantity === 1) {
        removeItem(keyToBeDecreased);
      }
      else if (sameFood.quantity > 1) {
        let count = sameFood.quantity - 1;
        sameFood.quantity = count;
        const otherFoods = cart.filter(item => item.key !== keyToBeDecreased);
        const newCart = [...otherFoods, sameFood];
        setCart(newCart);
        addToDatabaseCart(keyToBeDecreased, count);
      }
  }
};

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <CommonContext.Provider value={[cart, setCart]}>
      <Router>
        <NavBar setMessage={setMessage}></NavBar>
        <Routes>
          {/* <Route path='/home' element={<Home addToCart={addToCart}/>}/> */}
          <Route path='/' element={<Home addToCart={addToCart}/>}/>
          <Route path='/food_detail/:category/:key' element={<FoodDetail decreaseItem={decreaseItem} addToCart={addToCart}/>}></Route>
          <Route path='/login' element={<LogIn message={message} setMessage={setMessage} messageColor={messageColor} setMessageColor={setMessageColor}/>}/>
          <Route path='/signup' element={<SignUp message={message} setMessage={setMessage} messageColor={messageColor} setMessageColor={setMessageColor}/>}/>
          <Route path='/my-cart' element={<Cart decreaseItem={decreaseItem} addToCart={addToCart}/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path='/checkout' element={<Checkout/>}/>
          </Route>
          <Route path='*' element={<NoMatch/>}/>
        </Routes>
        <br /><br />
        <Footer></Footer>
      </Router>
    </CommonContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
