import Header from '../Header';
import { Route, Switch } from 'react-router';
import Login from '../Login';
import Register from '../Register';
import Products from '../Products';
import './App.scss';

const App = () => (
	<section className="app-wrapper">
		<Header />

		<article className="app-container">
			<Switch>
				<Route path="/login" component={Login} />

				<Route path="/register" component={Register} />

				<Route path="/" component={Products} />
			</Switch>
		</article>
	</section>
);

export default App;
