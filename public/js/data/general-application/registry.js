var schema = {
	// Job information
	inputName : '',
	inputEmail : '',
	inputWebsite : '',
	inputMessage : '',
	canRelocate : '',
	supportingFiles : null
};

module.exports = {
	_data: null,

	get : function get() {
		return this._data;
	},

	set : function set(property,value){
		if (this.get() === null){
			this.reset();
		}

		if (this.get()[property] === 'undefined'){
			throw Error(property + 'is not defined');
		}

		this.get()[property] = value;
	},

	reset: function reset(){
		this._data = JSON.parse(JSON.stringify(schema));
	}
};