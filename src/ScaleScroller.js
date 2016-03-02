import React from 'react';
import ReactDOM from 'react-dom';
import './ScaleScroller.css'

export default class ScaleScroller extends React.Component {
	constructor() {
		super()
		this.state = {
			activeItemIndex : 0,
			adjacentItemIndex : 0,
			scrollerWidth : 0,
			scale:1,
		}
	}

	onScroll() {
		let delataScale = (this.props.maxScale - 1) / this.props.itemWidth
		let delataDistance = Math.abs(this.state.activeItemIndex*this.props.itemWidth - Math.abs(this.scroller.x))
		let newScale = this.props.maxScale - delataScale * delataDistance
		this.setState({
			scale : newScale < 1 ? 1 : newScale
		})
	}

	componentDidMount() {
		this.scroller = new IScroll(ReactDOM.findDOMNode(this),{
			scrollX : true,
			scrollY : false,
			scrollbars : false,
			probeType : 3,
			momentum : true,
		})


		this.scroller.on('scroll',()=>{
			console.log('scroller')
			console.log(this.scroller.directionX)
			this.onScroll.apply(this);
		})

		this.scroller.on('iscrollTouchEnd',()=>{
			console.log('iscrollTouchEnd')
			console.log(this.scroller.x)
			let nextIndex = this.state.activeItemIndex
			if(this.scroller.x >= 0) {
				if(nextIndex === 1) {
					nextIndex = 0
				}
			}else if(Math.abs(this.scroller.x) >= (this.props.itemWidth/2 + nextIndex*this.props.itemWidth)) {
				++nextIndex
				
			}else if(Math.abs(this.scroller.x) < (nextIndex*this.props.itemWidth - this.props.itemWidth/2)) {
				--nextIndex
			}
			nextIndex >= 10 ? nextIndex=9 : nextIndex < 0 ? nextIndex=0 :nextIndex
			this.setState({
				activeItemIndex : nextIndex
			})
			this.scroller.scrollTo(this.props.itemWidth*nextIndex*-1,0,1000)

		})

		this.setState({
			scrollerWidth : ReactDOM.findDOMNode(this).offsetWidth
		})

		this.onScroll.apply(this)

	}

	componentDidUpdate() {
		this.scroller.refresh()
	}

	getItemStyle(width,scale) {
		return {
			width : width + 'px',
			height:'100%',
			float:'left',
			padding:'10px 20px',
			listStyle:'none',
			transform: 'scale3d(' + scale + ',' + scale + ',1)',
			WebkitTransform: 'scale3d(' + scale + ',' + scale + ',1)',
			transition: 'transform .05s linear',
			WebkitTransition : 'transform .05s linear',
		}
	}

	getMockChildren() {
		return [1,2,3,4,5,6,7,8,9,10].map((item,index)=>{
			let itemScale = this.state.activeItemIndex === index ? this.state.scale : 1
			let itemStyle = this.getItemStyle(this.props.itemWidth,itemScale)
			return <li style={itemStyle} key={item}><div style={{background:'gray',height:'100%'}}>{item}</div></li>
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
			width: (this.props.itemWidth * 10 + this.state.scrollerWidth - this.props.itemWidth) + 'px',
		}
		let listStyle = {
			padding:'0',
			listStyle:'none',
			margin:'0',
		}

		let placeholderWidth = (this.state.scrollerWidth / 2 - this.props.itemWidth / 2) + 'px'

		return (
			<div style={wrapperStyle} className="scale-scroller">
				<div style={scrollerStyle}>
					<li style={{height:'50px',width: placeholderWidth ,float:'left',listStyle:'none'}}></li>
					{this.getMockChildren.apply(this)}
					<li style={{height:'50px',width: placeholderWidth ,float:'left',listStyle:'none'}}></li>
				</div>
			</div>	
		)
	}
}

ScaleScroller.propTypes = {
	itemWidth : React.PropTypes.number,
	maxScale : React.PropTypes.number,
}
