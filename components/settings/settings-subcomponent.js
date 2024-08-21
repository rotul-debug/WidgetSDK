System.register(["tslib", "@angular/core"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, core_1, SettingsSubcomponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            SettingsSubcomponent = class SettingsSubcomponent {
                save() {
                    throw new Error("save() must be overridden.");
                }
            };
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", Object)
            ], SettingsSubcomponent.prototype, "widgetSettingsContext", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", String)
            ], SettingsSubcomponent.prototype, "name", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", Function)
            ], SettingsSubcomponent.prototype, "afterChange", void 0);
            SettingsSubcomponent = tslib_1.__decorate([
                core_1.Component({
                    template: ``,
                })
            ], SettingsSubcomponent);
            exports_1("SettingsSubcomponent", SettingsSubcomponent);
        }
    };
});
//# sourceMappingURL=settings-subcomponent.js.map