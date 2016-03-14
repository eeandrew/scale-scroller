const MsgCenter = {
	
	handlers : {},

	on(key,handlerFunc) {
		if(this.handlers[key]) return;
		this.handlers[key] = handlerFunc;
	},

	invoke(key,option) {
		if(!this.handlers[key]) return;
		this.handlers[key](option);
	},

	remove(key) {
		delete this.handlers[key]
	}

}

export default MsgCenter;