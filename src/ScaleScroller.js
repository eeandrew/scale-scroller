import React from 'react';
import ReactDOM from 'react-dom';
import MsgCenter from './MsgCenter.js';
import './ScaleScroller.less';

export default class ScaleScroller extends React.Component {
	constructor() {
		super()
		this.state = {
			activeItemIndex : 0,
			adjacentItemIndex : 0,
			scrollerWidth : 0,
			itemWidth : 0,
			font:1.6,
		}
	}

	onScroll() {
		let delataFont = (this.props.maxFont - this.props.normalFont) / this.state.itemWidth
		let delataDistance = Math.abs(this.state.activeItemIndex*this.state.itemWidth - Math.abs(this.scroller.x))
		let newFont = this.props.maxFont - delataFont * delataDistance
		this.setState({
			font : newFont < this.props.normalFont ? this.props.normalFont : newFont
		})
	}

	componentDidMount() {
		this.scroller = new IScroll(ReactDOM.findDOMNode(this),{
			scrollX : true,
			scrollY : false,
			scrollbars : false,
			probeType : 3,
			momentum : false,
		})


		this.scroller.on('scroll',()=>{
			this.onScroll.apply(this);
		})


		this.scroller.on('iscrollTouchEnd',()=>{
			let nextIndex = this.state.activeItemIndex
			if(this.scroller.x >= 0) {
				if(nextIndex === 1) {
					nextIndex = 0
				}
			}else if(Math.abs(this.scroller.x) >= (this.state.itemWidth/2 + nextIndex*this.state.itemWidth)) {
				++nextIndex
				
			}else if(Math.abs(this.scroller.x) < (nextIndex*this.state.itemWidth - this.state.itemWidth/2)) {
				--nextIndex
			}
			nextIndex >= this.props.items.length ? nextIndex=(this.props.items.length - 1) : nextIndex < 0 ? nextIndex=0 :nextIndex
			this.setState({
				activeItemIndex : nextIndex,
			});
			MsgCenter.invoke('on-item-changed',nextIndex);
			this.scroller.scrollTo(this.state.itemWidth*nextIndex*-1,0,300);
		})

		this.setState({
			scrollerWidth : ReactDOM.findDOMNode(this).offsetWidth,
			itemWidth : ReactDOM.findDOMNode(this).offsetWidth / this.props.columns
		})

		this.setState({
			font : this.props.maxFont
		})

		setTimeout(()=>{
			this.scroller.refresh()
		},1)
	}

	componentDidUpdate() {
		//this.scroller.refresh()
	}

	getItemStyle(width,font) {
		return {
			width : width + 'px',
			height:'100%',
			float:'left',
			listStyle:'none',
			fontSize:font + 'rem',
			display:'flex',
			display:'-webkit-flex',
			justifyContent:'center',
			flexDirection:'column',
			alignItems:'center',
			// transition: 'transform .05s linear',
			// WebkitTransition : 'transform .05s linear',
		}
	}

	getMockChildren() {
		let children = [];
		for(let i=0;i<this.props.items.length;i++) {
			let itemFont = this.state.activeItemIndex === i ? this.state.font : 1;
			let itemStyle = this.getItemStyle(this.state.itemWidth,itemFont);
			let isActive = this.state.activeItemIndex === i ? 'active' : '';
			children.push(<li style={itemStyle} className={"scroller-item " + isActive} key={i}><div className="seal-txt">{this.props.items[i].seal}</div></li>)
		}
		return children;
	}


	render() {
		let scrollerStyle = {
			width: (this.state.itemWidth * this.props.items.length + this.state.scrollerWidth - this.state.itemWidth) + 'px',
		}
		let listStyle = {
			padding:'0',
			listStyle:'none',
			margin:'0',
		}

		let placeholderWidth = (this.state.scrollerWidth / this.props.columns) + 'px'

		return (
				<div className="scale-wrapper">
					<div style={scrollerStyle} className="scale-scroller">
						<li style={{height:'100%',width: placeholderWidth ,float:'left',listStyle:'none'}}></li>
						{this.getMockChildren.apply(this)}
						<li style={{height:'100%',width: placeholderWidth ,float:'left',listStyle:'none'}}></li>
					</div>
				</div>	
		)
	}
}

ScaleScroller.propTypes = {
	maxFont : React.PropTypes.number,
	normalFont : React.PropTypes.number,
	itemsCount : React.PropTypes.number,
	columns : React.PropTypes.number,
	items : React.PropTypes.array,
}

ScaleScroller.defaultProps = {
	maxFont : 3,
	normalFont : 1.6,
	itemsCount : 3,
	columns : 3,
	items:[{seal:'活期'},{seal:'14天'},{seal:'28天'},{seal:'30天'},{seal:'60天'},{seal:'100天'},{seal:'999天'}]
}
