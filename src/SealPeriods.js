import ReactDom from 'react-dom';
import React from 'react';
import ScaleScroller from './ScaleScroller.js';
import ScaleBackground from './ScaleBackground.js';
import DescSection from './DescSection.js';
import InvestInput from './InvestInput.js';

export default class SealPeriods extends React.Component {


	render() {
		return (
			<div>
				<ScaleBackground/>
				<ScaleScroller itemsCount={3} maxFont={3.2}/>
				<DescSection/>
				<InvestInput/>
			</div>
		);
	}
}