import React from 'react';
import './InvestInput.less';



export default class InvestInput extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="invest-input-wrapper">
				<div className="invest-input">
					<div className="input-label">投资金额</div>
					<div className="input-section">
						<input ref="invest-input"/>
						<span>元</span>
					</div>
				</div>
				<p className="input-explain">起投金额100元，递增金额100元</p>
				<div className="next-step">下一步</div>
			</div>
		);
	}
}