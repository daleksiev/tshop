import Header from '../Header';
import { Route, Switch, Redirect } from 'react-router';
import Login from '../Login';
import Register from '../Register';
import Products from '../Products';
import ProductsDetails from '../Products/ProductsDetails';
import ProductsCreate from '../Products/ProductsCreate';
import ProductsEdit from '../Products/ProductsEdit';
import './App.scss';

const App = () => (
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


			</Switch>
		</article>
	</section>
);

export default App;
