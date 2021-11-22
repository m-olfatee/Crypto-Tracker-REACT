import React from 'react';
import MyContext from './context/MyContext';
import App from './App';
import ReactDOM from 'react-dom';
import 'react-alice-carousel/lib/alice-carousel.css';

ReactDOM.render(
    <MyContext>
        <App />
    </MyContext>,
    document.querySelector('#root')
);


