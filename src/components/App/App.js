import Header from '../Header';
import { Route, Switch } from 'react-router';
import Login from '../Login';
import Register from '../Register';
import './App.scss';

const App = () => (
	<div className="app-wrapper">
		<Header />

		<div className="app-container">
			<Switch>
				<Route path="/login" component={Login} />

				<Route path="/register" component={Register} />
			</Switch>
		</div>
	</div>
);

export default App;
