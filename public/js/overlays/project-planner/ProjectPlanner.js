var onTransitionEnd = require('./../../lib/onTransitionEnd');
var ProjectPlannerData = require('./../../data/project-planner/registry');

Class(EM.Overlays, 'ProjectPlanner').inherits(EM.UI.Overlay).includes(BubblingSupport)({
    PATH : '/project-planner',

    prototype : {
        init : function init(config) {
            EM.UI.Overlay.prototype.init.call(this, config);
            this._setup()._bindEvents();
        },

        setup : function setup() {
            this.showStep(EM.UI.ProjectPlannerStep1.NAME);
        },

        _setup : function _setup() {
            this.appendChild(new EM.UI.ProjectPlannerStep1({
                name: EM.UI.ProjectPlannerStep1.NAME
            })).render(this.overlayBody);

            this.appendChild(new EM.UI.ProjectPlannerStep2({
                name: EM.UI.ProjectPlannerStep2.NAME
            })).render(this.overlayBody);

            this.appendChild(new EM.UI.ProjectPlannerStep3({
                name: EM.UI.ProjectPlannerStep3.NAME
            })).render(this.overlayBody);

            this.appendChild(new EM.UI.ProjectPlannerStep4({
                name: EM.UI.ProjectPlannerStep4.NAME
            })).render(this.overlayBody);

            this.appendChild(new EM.UI.ProjectPlannerStep5({
                name: EM.UI.ProjectPlannerStep5.NAME
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

        _setData : function _setData(ev) {
            ev.stopPropagation();

            console.log(ev.data);

            ev.data.forEach(function(data) {
                ProjectPlannerData.set(data.prop, data.value);
            });

            console.log(ProjectPlannerData);
        },

        _sendForm : function _sendForm(ev) {
            var formData = new FormData();
            var data = ProjectPlannerData.get();

            this.unbindESCKey();

            for (var property in data) {
                if (data.hasOwnProperty(property)) {
                    if (property !== 'supportingFiles') {
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
                url : '/sendProject',
                data : formData,
                processData : false,
                type : 'POST',
                contentType : false,
                success : function(data) {
                    console.log(data);

                    ProjectPlannerData.reset();
                    this.bindESCKey();

                    if (ev.callback && typeof ev.callback === 'function') {
                        ev.callback(null, data);
                    }
                }.bind(this),

                error : function(data) {
                    console.log(data);

                    this.bindESCKey();

                    if (ev.callback && typeof ev.callback === 'function') {
                        ev.callback(true, data);
                    }
                }.bind(this)
            });
        },

        _deactivate : function _deactivate() {
            EM.UI.Overlay.prototype._deactivate.call(this);

            onTransitionEnd(this.element, function() {
                this.dispatch('projectPlanner:closed');
                this.destroy();
            }.bind(this));
        }
    }
});
