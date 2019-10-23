import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from './app';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render((<App />), document.getElementById('reactMountPoint'));
});
