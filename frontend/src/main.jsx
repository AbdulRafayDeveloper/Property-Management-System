import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import { ToastContainer } from 'react-toastify';

const store = configureStore({ reducer: rootReducer, devTools: true });

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
			<Provider store={store}>
				<React.Fragment>
					<ToastContainer />
					<BrowserRouter basename={import.meta.env.PUBLIC_URL}>
						<App />
					</BrowserRouter>
				</React.Fragment>
			</Provider>
	</React.StrictMode>
);

reportWebVitals();
