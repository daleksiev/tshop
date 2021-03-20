import Header from '../Header';
import { Route, Switch } from 'react-router';
import Login from '../Login';
import Register from '../Register';
import GlobalContext from '../../store';
import initialState from "../../reducers";
import './App.scss';

const App = () => (
	<GlobalContext.Provider value={initialState()}>
		<div className="app-wrapper">
			<Header />

			<div className="app-container">
				<Switch>
					<Route path="/login" component={Login} />

					<Route path="/register" component={Register} />
				</Switch>
			</div>
		</div>
	</GlobalContext.Provider>
);

export default App;
