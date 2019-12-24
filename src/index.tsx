import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SoundBoard } from './soundboard';
import { SoundContext } from './SoundContext';
import Modal from 'react-modal';

const root = document.getElementById('root')!;

Modal.setAppElement(root);

const thingy = new SoundBoard();

ReactDOM.render(
	<SoundContext.Provider value={thingy}>
		<App />
	</SoundContext.Provider>,
	root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
