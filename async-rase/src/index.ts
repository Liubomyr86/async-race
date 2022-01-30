import './style.scss';

import App from './app/app';

const root = document.getElementById('root');
if (!root) throw Error('App root element not found');
const app = new App(root);
app.start();
