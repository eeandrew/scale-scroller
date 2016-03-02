import ReactDom from 'react-dom';
import React from 'react';
import ScaleScroller from './ScaleScroller.js';



ReactDom.render(<ScaleScroller itemWidth={150} maxScale={1.5}/>,document.getElementById('app'))