var onTransitionEnd = require('./../../lib/onTransitionEnd');
var generalApplicationData = require ('./../../data/general-application/registry');

Class(EM.Overlays, 'GeneralApplication').inherits(EM.UI.Overlay).includes(BubblingSupport)({
    PATH : '/general-application',

    prototype : {
        init : function init(config) {
            EM.UI.Overlay.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.showStep(EM.UI.GeneralApplicationStep.NAME);
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.GeneralApplicationStep({
                name: EM.UI.GeneralApplicationStep.NAME
            })).render(this.overlayBody);

            this.appendChild(new EM.UI.ProjectPlannerStep6({
                name: EM.UI.ProjectPlannerStep6.NAME
            })).render(this.overlayBody);

            return this;
        },

        _bindEvents : function _bindEvents() {
            EM.UI.Overlay.prototype.bindEvents.call(this);

            this._showStepRef = this._showStep.bind(this);
            this.bind('showPage', this._showStepRef);

            this._setDataRef = this._setData.bind(this);
            this.bind('setData', this._setDataRef);

            this.bind('sendForm', this._sendForm);
        },

        _showStep : function _showStep(ev) {
            ev.stopPropagation();

            if (this[ev.name]) {
                this.showStep(ev.name);
            }
        },

        showStep : function showStep(stepName) {
            this.children.forEach(function(child) {
                child.deactivate();
            });

            this[stepName].activate();
        },

        _setData : function _setData(ev){
            ev.stopPropagation();

            ev.data.forEach(function(data){
                generalApplicationData.set(data.prop, data.value);
            });
        },

        _sendForm : function _sendForm (){
            var formData = new FormData();
            var data = generalApplicationData.get();

            for (var property in data){
                if (data.hasOwnProperty(property)){
                    if (property !== 'supportingFiles'){
                        formData.append(property, data[property]);
                    }
                }
            }

            if (data.supportingFiles) {
                data.supportingFiles.forEach(function(file) {
                    formData.append('file', file);
                });
            }

            $.ajax({
                url : '/sendApplication',
                data : formData,
                processData : false,
                type : 'POST',
                contentType : false,
                success : function(){
                    generalApplicationData.reset();
                }
            });
        },

        _deactivate : function _deactivate() {
            EM.UI.Overlay.prototype._deactivate.call(this);

            onTransitionEnd(this.element, function() {
                this.dispatch('generalApplication:closed');
                this.destroy();
            }.bind(this));
        }
    }
});
