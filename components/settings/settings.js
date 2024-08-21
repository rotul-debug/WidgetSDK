System.register(["tslib", "@angular/core"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, core_1, SettingsComponent;
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
            SettingsComponent = class SettingsComponent {
                constructor() { }
                ngOnInit() {
                    console.log("SettingsComponent.onInit()");
                    this.initSettings();
                    this.setSettingsClosingHandler();
                }
                initSettings() {
                    const widgetContext = this.widgetSettingsContext.getWidgetContext();
                    const settings = widgetContext.getSettings();
                    const lang = widgetContext.getLanguage();
                }
                setSettingsClosingHandler() {
                    this.widgetSettingsInstance.closing = (closingArg) => {
                        if (closingArg.isSave) {
                            console.log("Saving settings");
                            this.subcomponents.forEach((subcomponent) => {
                                subcomponent.save();
                            });
                            console.log("Saved.");
                            const widgetContext = this.widgetSettingsContext.getWidgetContext();
                            console.log(JSON.parse(widgetContext.getSettings().getValues().monitors));
                        }
                        else {
                            console.log("Not saving.");
                        }
                    };
                }
            };
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", Object)
            ], SettingsComponent.prototype, "widgetSettingsContext", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", Object)
            ], SettingsComponent.prototype, "widgetSettingsInstance", void 0);
            tslib_1.__decorate([
                core_1.ViewChildren("subcomponent"),
                tslib_1.__metadata("design:type", core_1.QueryList)
            ], SettingsComponent.prototype, "subcomponents", void 0);
            SettingsComponent = tslib_1.__decorate([
                core_1.Component({
                    template: `
    <div>
      <settings-subcomponent-title
        #subcomponent
        [widgetSettingsContext]="widgetSettingsContext"
      >
      </settings-subcomponent-title>

      <settings-subcomponent-header-color
        #subcomponent
        [widgetSettingsContext]="widgetSettingsContext"
      >
      </settings-subcomponent-header-color>

      <settings-subcomponent-monitors
        #subcomponent
        [widgetSettingsContext]="widgetSettingsContext"
      >
      </settings-subcomponent-monitors>
      <!--
      <settings-subcomponent-channels
        #subcomponent
        [widgetSettingsContext]="widgetSettingsContext"
      ></settings-subcomponent-channels>
      -->
    </div>
  `,
                }),
                tslib_1.__metadata("design:paramtypes", [])
            ], SettingsComponent);
            exports_1("SettingsComponent", SettingsComponent);
        }
    };
});
//# sourceMappingURL=settings.js.map