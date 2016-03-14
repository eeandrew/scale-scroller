import ReactDom from 'react-dom';
import React from 'react';
import ScaleScroller from './ScaleScroller.js';
import ScaleBackground from './ScaleBackground.js';
import DescSection from './DescSection.js';

export default class SealPeriods extends React.Component {


	render() {
		return (
			<div>
				<ScaleBackground/>
				<ScaleScroller itemsCount={3} maxFont={2.6}/>
				<DescSection/>
			</div>
		);
	}
}