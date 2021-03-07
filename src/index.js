import { BrowserRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import GlobalContext from './store';
import './index.scss';

ReactDOM.render(
	<BrowserRouter>
		<GlobalContext.Provider  value={{}}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</GlobalContext.Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
