import Header from '../Header';
import { Route, Switch, Redirect } from 'react-router';
import Login from '../Login';
import Register from '../Register';
import Products from '../Products';
import ProductsDetails from '../Products/ProductsDetails';
import ProductsCreate from '../Products/ProductsCreate';
import ProductsEdit from '../Products/ProductsEdit';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserAuth } from '../../actions/userActions';
import firebaseService from '../../services/firebaseService';
import './App.scss';
import User from '../User/User';

const App = ({
	setUserAuth,
}) => {
	useEffect(() => {
		firebaseService.verifyAuth(setUserAuth);
	}, [setUserAuth]);

	return (
		<section className="app-wrapper">
			<Header />

			<article className="app-container">
				<Switch>
					<Route path="/login" component={Login} />

					<Route path="/register" component={Register} />

					<Route path="/" exact render={() => <Redirect to="/products" />} />

					<Route path="/products" exact component={Products} />

					<Route path="/create" exact component={ProductsCreate} />

					<Route path="/products/:productId" exact component={ProductsDetails} />

					<Route path="/products/edit/:productId" exact component={ProductsEdit} />

					<Route path="/user" exact component={User} />
				</Switch>
			</article>
		</section>
	);
}

const mapDispatchToProps = {
	setUserAuth,
}

export default connect(undefined, mapDispatchToProps)(App);
