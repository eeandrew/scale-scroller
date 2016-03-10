import ReactDom from 'react-dom';
import React from 'react';
import ScaleScroller from './ScaleScroller.js';
import ScaleBackground from './ScaleBackground.js';



ReactDom.render(<div><ScaleBackground/><ScaleScroller itemsCount={3} maxFont={3}/></div>,document.getElementById('app'))