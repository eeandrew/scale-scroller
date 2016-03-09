import ReactDom from 'react-dom';
import React from 'react';
import ScaleScroller from './ScaleScroller.js';



ReactDom.render(<div style={{height:'100px'}}><ScaleScroller itemsCount={3} maxScale={1.5}/></div>,document.getElementById('app'))