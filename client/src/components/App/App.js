import Header from '../Header';
import { Route, Switch, Redirect } from 'react-router';
import Login from '../Login';
import Register from '../Register';
import Products from '../Products';
import Categories from '../Categories';
import CategoriesCreate from '../Categories/CategoriesCreate';
import ProductsDetails from '../Products/ProductsDetails';
import ProductsCreate from '../Products/ProductsCreate';
import ProductsEdit from '../Products/ProductsEdit';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserAuth } from '../../actions/userActions';
import { setError } from '../../actions/messageActions';
import firebaseService from '../../services/firebaseService';
import User from '../User/User';
import AuthRoute from '../AuthRoute';
import CategoriesEdit from '../Categories/CategoriesEdit/';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({
	setUserAuth,
	setError,
}) => {
	useEffect(() => {
		firebaseService.verifyAuth(setUserAuth, setError);
	}, [setUserAuth, setError]);

	return (
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

					<AuthRoute path="/products/create" exact component={ProductsCreate} />

					<Route path="/products/:productId" exact component={ProductsDetails} />

					<AuthRoute path="/products/edit/:productId" exact component={ProductsEdit} />

					<AuthRoute path="/profile" exact component={User} />

				</Switch>
			</article>
		</section>
	);
}

const mapDispatchToProps = {
	setUserAuth,
	setError,
}

export default connect(undefined, mapDispatchToProps)(App);
