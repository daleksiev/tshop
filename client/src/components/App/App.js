import Header from '../Header';
import { Route, Switch } from 'react-router';

import {
  Login,
  Register,
  Home,
  Categories,
  Brands,
  Products,
  Orders,
  User,
  BrandsCreate,
  BrandsEdit,
  CategoriesCreate,
  CategoriesEdit,
  ProductsDetails,
  ProductsCreate,
  ProductsEdit,
  UserFavourites,
  UserCart
} from '../../pages'

import { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { setUserAuth } from '../../actions/userActions';
import { setError } from '../../actions/messageActions';
import firebaseService from '../../services/firebaseService';
import CartContext from '../../context/CartContext';
import AuthRoute from '../AuthRoute';
import cartReducer, { cartState } from '../../reducers/cartReducer'
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({
  setUserAuth,
  setError,
}) => {
  useEffect(() => {
    firebaseService.verifyAuth(setUserAuth, setError);
  }, [setUserAuth, setError]);

  const [cartContext, setCartContext] = useReducer(cartReducer, cartState);

  useEffect(() => {
    const cartLocalStorageState = JSON.parse(localStorage.getItem('cart'));

    if (cartLocalStorageState) {
      setCartContext(cartLocalStorageState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartContext));
  }, [cartContext]);

  return (
    <CartContext.Provider value={[cartContext, setCartContext]}>
      <section className="app-wrapper">
        <Header />

        <article className="app-container">
          <Switch>
            <Route path="/login" component={Login} />

            <Route path="/register" component={Register} />

            <Route path="/" exact component={Home} />

            <AuthRoute path="/categories/create" exact component={CategoriesCreate} />

            <AuthRoute path="/categories/edit/:categoryId" exact component={CategoriesEdit} />

            <Route path="/categories/:categoryId" exact component={Products} />

            <Route path="/categories" exact component={Categories} />

            <AuthRoute path="/brands/create" exact component={BrandsCreate} />

            <AuthRoute path="/brands/edit/:brandId" exact component={BrandsEdit} />

            <AuthRoute path="/brands" exact component={Brands} />

            <AuthRoute path="/products/create" exact component={ProductsCreate} />

            <Route path="/products/:productId" exact component={ProductsDetails} />

            <AuthRoute path="/products/edit/:productId" exact component={ProductsEdit} />

            <AuthRoute path="/profile" exact component={User} />

            <AuthRoute path="/cart" exact component={UserCart} />

            <AuthRoute path="/favourites" exact component={UserFavourites} />

            <AuthRoute path="/orders" exact component={Orders} />
          </Switch>
        </article>
      </section>
    </CartContext.Provider>
  );
}

const mapDispatchToProps = {
  setUserAuth,
  setError,
}

export default connect(undefined, mapDispatchToProps)(App);
