import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store'
import './firebase';
import './index.scss';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
