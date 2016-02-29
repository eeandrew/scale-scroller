import React from 'react';
import ReactDOM from 'react-dom';
import './ScaleScroller.css'

export default class ScaleScroller extends React.Component {
	constructor() {
		super()
		this.state = {
			activeItemIndex : 0
		}
	}

	componentDidMount() {
		this.scroller = new IScroll(ReactDOM.findDOMNode(this),{
			scrollX : true,
			scrollY : false,
			scrollbars : true,
			probeType : 3
		})

		this.scroller.on('scroll',()=>{
			console.log(this.scroller.x);
			this.setState({
				activeItemIndex : Math.floor((Math.abs(this.scroller.x) / 50 ))
			})
		})
	}

	getMockChildren() {
		let itemStyle = {
			width:'50px',
			height:'50px',
			float:'left',
			margin:'10px',
			background :'gray',
			listStyle:'none',
		}
		return [1,2,3,4,5,6,7,8,9,10].map((item,index)=>{
			console.log(item)
			let activeClassName = this.state.activeItemIndex === index ? 'active' : ''
			activeClassName = 'scroller-item ' + activeClassName
			return <li className={activeClassName} style={itemStyle} key={item}>{item}</li>
		})
	}

	render() {
		let wrapperStyle = {
			position:'relative',
			width:'100%',
			height:'100px',
			overflow:'hidden',
		}
		let scrollerStyle = {
			position : 'absolute',
			height: '100%',
			width:'800px',
		}
		let listStyle = {
			padding:'0',
			listStyle:'none',
			margin:'0',
		}
		return (
			<div style={wrapperStyle} className="scale-scroller">
				<div style={scrollerStyle}>
					{this.getMockChildren.apply(this)}
				</div>
			</div>	
		)
	}
}