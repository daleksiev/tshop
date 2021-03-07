import { BrowserRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalContext from './store';
import './index.scss';

ReactDOM.render(
	<GlobalContext>
		<BrowserRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</GlobalContext>,
	document.getElementById('root')
);
