import Header from '../Header';
import { Route, Switch, Redirect } from 'react-router';
import Login from '../Login';
import Register from '../Register';
import Products from '../Products';
import ProductsDetails from '../Products/ProductsDetails';
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

				<Route path="/products/:productId" exact component={ProductsDetails} />
			</Switch>
		</article>
	</section>
);

export default App;
