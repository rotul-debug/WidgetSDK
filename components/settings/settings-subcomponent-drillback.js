System.register(["tslib", "@angular/core", "./settings-subcomponent"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, core_1, settings_subcomponent_1, SettingsSubcomponentDrillback;
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
            SettingsSubcomponentDrillback = class SettingsSubcomponentDrillback extends settings_subcomponent_1.SettingsSubcomponent {
                //bookmark: string = "";
                constructor() {
                    super();
                    this.onChange = new core_1.EventEmitter();
                }
                ngOnInit() {
                    /*
                    if (this.widgetSettingsContext) {
                      console.log("SettingsSubcomponentDrillback.ngOnInit()");
                      const widgetContext = this.widgetSettingsContext.getWidgetContext();
                      const settings = widgetContext.getSettings();
                
                      const bookmark = settings.get("bookmark");
                      console.log("bookmark: " + bookmark);
                      if (bookmark) {
                        console.log("bookmark:");
                        console.log(bookmark);
                        this.bookmark = bookmark;
                      } else {
                        this.bookmark = "";
                      }
                    }
                    */
                }
                buildOptions(columns) {
                    //const columns = simpleColumnOptions.map((column) => buildColumn(column));
                    const options = {
                        selectable: "single",
                        rowNavigation: true,
                        paging: true,
                        pagesizes: [5, 10, 25, 50, 100],
                        pagesize: 25,
                        rowHeight: "small",
                        toolbar: {
                            results: true,
                            keywordFilter: true,
                            advancedFilter: false,
                            actions: false,
                            selectable: "single",
                            filterable: true,
                            views: true,
                            rowHeight: false,
                            collapsibleFilter: false,
                            fullWidth: true,
                        },
                        columns: columns,
                    };
                    return options;
                }
                getPrograms() {
                    /*
                    this.miService.makeApiCall("MRS001MI", "LstPrograms", {}, 9999).subscribe(
                      (response) => {
                        this.programData = response;
                        console.log(response);
                      },
                      (err) => {
                        console.log("Something went wrong when getting program list.");
                        console.log(err);
                      }
                    );
                    */
                }
                getTransactions() {
                    /*
                    this.miService
                      .makeApiCall(
                        "MRS001MI",
                        "LstTransactions",
                        {
                          MINM: this.apiData.program,
                        },
                        9999
                      )
                      .subscribe(
                        (response) => {
                          this.transactionData = response;
                        },
                        (err) => {
                          console.log("Something went wrong when getting transaction list.");
                          console.log(err);
                        }
                      );
                      */
                }
                validate() {
                    /*
                    const channelNames = this.channels.map((channel) => channel.name);
                    const channelNamesSet = new Set(channelNames);
                    const channelNamesNoEmpty = channelNames.filter(
                      (name) => name.trim().length > 0
                    );
                    console.log(channelNames);
                    console.log(channelNamesSet);
                    channelNamesNoEmpty.length === channelNamesSet.size;
                    */
                }
                /**
                 * Persist changes
                 */
                save() {
                    console.log("Saving drillback");
                    console.log(this.bookmark);
                    const widgetContext = this.widgetSettingsContext.getWidgetContext();
                    const settings = widgetContext.getSettings();
                    settings.set("bookmark", this.bookmark);
                    console.log("Saved " + this.bookmark + " to bookmark setting.");
                    //settings.set("api", JSON.stringify(this.channels));
                }
            };
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", Object)
            ], SettingsSubcomponentDrillback.prototype, "widgetSettingsContext", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", String)
            ], SettingsSubcomponentDrillback.prototype, "label", void 0);
            tslib_1.__decorate([
                core_1.Output(),
                tslib_1.__metadata("design:type", core_1.EventEmitter)
            ], SettingsSubcomponentDrillback.prototype, "onChange", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", String)
            ], SettingsSubcomponentDrillback.prototype, "bookmark", void 0);
            SettingsSubcomponentDrillback = tslib_1.__decorate([
                core_1.Component({
                    selector: "settings-subcomponent-drillback",
                    template: `
    <div class="field">
      <label soho-label for="bookmark-input">URL</label>
      <input id="bookmark-input" [(ngModel)]="bookmark" />
    </div>
  `,
                }),
                tslib_1.__metadata("design:paramtypes", [])
            ], SettingsSubcomponentDrillback);
            exports_1("SettingsSubcomponentDrillback", SettingsSubcomponentDrillback);
        }
    };
});
//# sourceMappingURL=settings-subcomponent-drillback.js.map