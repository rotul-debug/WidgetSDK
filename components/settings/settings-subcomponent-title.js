System.register(["tslib", "@angular/core", "./settings-subcomponent"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, core_1, settings_subcomponent_1, SettingsSubcomponentTitle;
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
            SettingsSubcomponentTitle = class SettingsSubcomponentTitle extends settings_subcomponent_1.SettingsSubcomponent {
                get lockIcon() {
                    return this.isTitleLocked ? "locked" : "unlocked";
                }
                ngOnInit() {
                    const widgetContext = this.widgetSettingsContext.getWidgetContext();
                    this.isTitleEditEnabled = widgetContext.isTitleEditEnabled();
                    this.isTitleLocked = widgetContext.isTitleLocked();
                    this.title = widgetContext.getResolvedTitle(this.isTitleLocked);
                    this.isTitleUnlockable = widgetContext.isTitleUnlockable();
                }
                /**
                 * Persist changes to the title and lock by saving to widget context.
                 */
                save() {
                    console.log("Saving title");
                    const widgetContext = this.widgetSettingsContext.getWidgetContext();
                    widgetContext.setTitleLocked(this.isTitleLocked);
                    //const settings = widgetContext.getSettings();
                    //settings.set("title", JSON.stringify(this.title));
                    if (this.isTitleEditEnabled) {
                        widgetContext.setTitle(this.title);
                    }
                }
                onLockClicked() {
                    this.isTitleLocked = !this.isTitleLocked;
                    if (this.isTitleLocked) {
                        this.title = this.widgetSettingsContext
                            .getWidgetContext()
                            .getStandardTitle();
                    }
                }
            };
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", Object)
            ], SettingsSubcomponentTitle.prototype, "widgetSettingsContext", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", String)
            ], SettingsSubcomponentTitle.prototype, "label", void 0);
            SettingsSubcomponentTitle = tslib_1.__decorate([
                core_1.Component({
                    selector: "settings-subcomponent-title",
                    template: `
    <div class="field">
      <label *ngIf="label">{{ label }}</label>
      <input
        [readOnly]="!isTitleEditEnabled || isTitleLocked"
        [(ngModel)]="title"
        [maxlength]="100"
      />
      <button
        soho-button="icon"
        [icon]="lockIcon"
        [disabled]="!isTitleUnlockable"
        (click)="onLockClicked()"
      ></button>
    </div>
  `,
                })
            ], SettingsSubcomponentTitle);
            exports_1("SettingsSubcomponentTitle", SettingsSubcomponentTitle);
        }
    };
});
//# sourceMappingURL=settings-subcomponent-title.js.map