System.register(["tslib", "@angular/core", "./settings-subcomponent"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, core_1, settings_subcomponent_1, SettingsSubcomponentHeaderColor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (settings_subcomponent_1_1) {
                settings_subcomponent_1 = settings_subcomponent_1_1;
            }
        ],
        execute: function () {
            SettingsSubcomponentHeaderColor = class SettingsSubcomponentHeaderColor extends settings_subcomponent_1.SettingsSubcomponent {
                constructor() {
                    super(...arguments);
                    this.label = "Header Color";
                }
                ngOnInit() {
                    const widgetContext = this.widgetSettingsContext.getWidgetContext();
                    this.value = JSON.parse(widgetContext.getSettings().get("headerColor", '""'));
                }
                /**
                 * Persist changes to the title and lock by saving to widget context.
                 */
                save() {
                    console.log("Saving Header Color");
                    const widgetContext = this.widgetSettingsContext.getWidgetContext();
                    const settings = widgetContext.getSettings();
                    settings.set("headerColor", JSON.stringify(this.value));
                }
            };
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", Object)
            ], SettingsSubcomponentHeaderColor.prototype, "widgetSettingsContext", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", String)
            ], SettingsSubcomponentHeaderColor.prototype, "label", void 0);
            SettingsSubcomponentHeaderColor = tslib_1.__decorate([
                core_1.Component({
                    selector: "settings-subcomponent-header-color",
                    template: `
    <div class="field">
      <label *ngIf="label">{{ label }}</label>
      <input [(ngModel)]="value" [maxlength]="100" />
    </div>
  `,
                })
            ], SettingsSubcomponentHeaderColor);
            exports_1("SettingsSubcomponentHeaderColor", SettingsSubcomponentHeaderColor);
        }
    };
});
//# sourceMappingURL=settings-subcomponent-header-color.js.map