import Header from '../Header';
import { Route, Switch, Redirect } from 'react-router';
import Login from '../Login';
import Register from '../Register';
import Categories from '../Categories';
import CategoriesCreate from '../Categories/CategoriesCreate';
import CategoriesEdit from '../Categories/CategoriesEdit/';
import Brands from '../Brands/Brands';
import BrandsCreate from '../Brands/BrandsCreate';
import BrandsEdit from '../Brands/BrandsEdit';
import Products from '../Products';
import ProductsDetails from '../Products/ProductsDetails';
import ProductsCreate from '../Products/ProductsCreate';
import ProductsEdit from '../Products/ProductsEdit';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setUserAuth } from '../../actions/userActions';
import { setError } from '../../actions/messageActions';
import firebaseService from '../../services/firebaseService';
import User from '../User/User';
import UserFavourites from '../User/UserFavourites';
import CartContext from '../../context/CartContext';
import AuthRoute from '../AuthRoute';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({
	setUserAuth,
	setError,
}) => {
	useEffect(() => {
		firebaseService.verifyAuth(setUserAuth, setError);
	}, [setUserAuth, setError]);

	const [cartState, setCartState] = useState([]);

	useEffect(() => {
		const cartLocalStorageState = JSON.parse(localStorage.getItem('cart'));

		if (cartLocalStorageState) {
			setCartState(cartLocalStorageState);
		}
	}, []);

	const setCartStateWithLocalStorage = (state) => {
		setCartState(state);
		localStorage.setItem('cart', JSON.stringify(state));
	}

	return (
		<CartContext.Provider value={[cartState, setCartStateWithLocalStorage]}>
			<section className="app-wrapper">
				<Header />

				<article className="app-container">
					<Switch>
						<Route path="/login" component={Login} />

						<Route path="/register" component={Register} />

						<Route path="/" exact render={() => <Redirect to="/categories" />} />

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

						<AuthRoute path="/favourites" exact component={UserFavourites} />

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
