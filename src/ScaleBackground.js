import React from 'react';

const ScaleBackground = (props) => {
	let bgStyle = {
		position:'absolute',
		height:'9.9rem',
		background:'#FFF',
		width:'100%',
		left:0,
		right:0,
	}
	let cStyle = {
		width:'33.3%',
		height: 'calc(100% + 5px)',
		borderBottom: '6px solid #FC7946',
		textAlign:'center',
		margin:'0 auto',
		paddingTop:'1.5rem',
		color : '#FC7946',
		fontSize:'1.3rem',
		backgroundImage : '-webkit-gradient(linear, center top, center bottom, color-stop(0, #FFFFFF), color-stop(1, #FFF2EE))',
	}
	return <div style={bgStyle}><div style={cStyle}><span>选择锁定期</span></div></div>
}

export default ScaleBackground;