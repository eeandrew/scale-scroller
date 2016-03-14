import React from 'react';
import './ScaleBackground.less';

const ScaleBackground = (props) => {
	let bgStyle = {
		position:'absolute',
		height:'9.9rem',
		background:'#FFF',
		width:'100%',
		left:0,
		right:0,
	}
	
	return <div style={bgStyle} className="scale-background"><div className="scale-content"><span>选择锁定期</span></div></div>
}

export default ScaleBackground;