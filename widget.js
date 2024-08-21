System.register(["./main"], function (exports_1, context_1) {
    "use strict";
    var main_1, widgetFactory;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (main_1_1) {
                main_1 = main_1_1;
            }
        ],
        execute: function () {
            exports_1("widgetFactory", widgetFactory = (context) => {
                return {
                    actions: main_1.getActions(),
                    angularConfig: {
                        moduleType: main_1.InformationViewerMonitorModule,
                        componentType: main_1.InformationViewerMonitorComponent,
                    },
                };
            });
        }
    };
});
//# sourceMappingURL=widget.js.map