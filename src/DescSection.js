import React from 'react';
import MsgCenter from './MsgCenter.js';
import './DescSection.less';

export default class DescSection extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			activeIndex : 0
		}
	}

	componentDidMount() {
		MsgCenter.on('on-item-changed',(index)=>{
			this.setState({
				activeIndex:index
			})
		})
	}

	componentWillUnmount() {
		MsgCenter.remove('on-item-changed')
	}

	getExtraSectionClass(target) {
		if(this.state.activeIndex === target) {
			return 'active';
		}else {
			return '';
		}
	}


	render() {
		return (
			<div>	
				<div className="desc-section">
					<h4 className="desc-section-title">昨日年化收益率<span className="section-value">{this.state.activeIndex}%</span></h4>	
					<h4 className="desc-section-title">可投<span className="section-value">{this.state.activeIndex * 1000}</span>元</h4>
				</div>
				<div className={'extra-section ' + this.getExtraSectionClass(1)} >
					<h4>比继续持有活期2天收益降低约29.68元，</h4>
					<h4>试试其他锁定期</h4>
				</div>	
				{/*用于占位*/}
				<div className={'placeholder-section ' + this.getExtraSectionClass(1)}/>
			</div>
		)
	}
}