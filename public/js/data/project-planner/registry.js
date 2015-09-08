var schema = {
    // Project types required [Array] (1/5)
    type : null,
    // Project Description [Text] (2/5)
    description : null,
    // Uploaded Files [FileList] (2/5)
    supportingFiles : null,
    // Free Input Deadline [String] (3/5)
    deadLine : null,
    // Budget  Info (4/5)
    budgetGiven : true,
    budgetRangeSliderValue : 50,
    budgetValue : '',
    // Contact Info [Object] (5/5)
    infoNname : '',
    infoEmail : '',
    infoCompany : '',
    infoPhoneNumber : '',
    infoWebsite : '',
    infoHowDidYouHearAboutUs : ''
};

module.exports = {
    _data : null,

    get : function get() {
        return this._data;
    },

    set : function set(property, value) {
        if (this.get() === null) {
            this.reset();
        }

        if (this.get()[property] === 'undefined') {
            throw Error(property + ' is not defined');
        }

        this.get()[property] = value;
    },

    reset : function reset() {
        this._data = JSON.parse(JSON.stringify(schema));
    }
};
