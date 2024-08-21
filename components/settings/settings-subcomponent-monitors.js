System.register(["tslib", "@angular/core", "./settings-subcomponent", "./settings-subcomponent-monitor", "ids-enterprise-ng"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, core_1, settings_subcomponent_1, settings_subcomponent_monitor_1, sohoxi_angular_1, SettingsSubcomponentMonitorsDialog, SettingsSubcomponentMonitors;
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
            },
            function (settings_subcomponent_monitor_1_1) {
                settings_subcomponent_monitor_1 = settings_subcomponent_monitor_1_1;
            },
            function (sohoxi_angular_1_1) {
                sohoxi_angular_1 = sohoxi_angular_1_1;
            }
        ],
        execute: function () {
            SettingsSubcomponentMonitorsDialog = class SettingsSubcomponentMonitorsDialog extends core_1.Component {
                ngOnInit() { }
            };
            tslib_1.__decorate([
                core_1.ViewChildren("subcomponent"),
                tslib_1.__metadata("design:type", core_1.QueryList)
            ], SettingsSubcomponentMonitorsDialog.prototype, "subcomponents", void 0);
            tslib_1.__decorate([
                core_1.ViewChild("apiSettings"),
                tslib_1.__metadata("design:type", settings_subcomponent_monitor_1.SettingsSubcomponentMonitor)
            ], SettingsSubcomponentMonitorsDialog.prototype, "apiSettings", void 0);
            SettingsSubcomponentMonitorsDialog = tslib_1.__decorate([
                core_1.Component({
                    selector: "settings-subcomponent-monitors-dialog",
                    template: `
    <div class="field">
      <label for="input-name">Monitor Name</label>
      <input
        soho-input
        class="input"
        id="input-name"
        type="text"
        [(ngModel)]="name"
      />
    </div>

    <settings-subcomponent-monitor
      #apiSettings
      [widgetSettingsContext]="widgetSettingsContext"
    ></settings-subcomponent-monitor>
  `,
                })
            ], SettingsSubcomponentMonitorsDialog);
            exports_1("SettingsSubcomponentMonitorsDialog", SettingsSubcomponentMonitorsDialog);
            SettingsSubcomponentMonitors = class SettingsSubcomponentMonitors extends settings_subcomponent_1.SettingsSubcomponent {
                //apiData: IApiData;
                //programOptions: SohoDataGridOptions;
                //programData: SohoDataSet = [];
                //transactionOptions: SohoDataGridOptions;
                //transactionData: SohoDataSet = [];
                constructor(
                /*private modalService: SohoModalDialogService*/ changeDetectionRef, modalService) {
                    super();
                    this.changeDetectionRef = changeDetectionRef;
                    this.modalService = modalService;
                }
                ngOnInit() {
                    var _a;
                    const widgetContext = this.widgetSettingsContext.getWidgetContext();
                    const settings = widgetContext.getSettings();
                    const monitors = (_a = settings.get("monitors")) !== null && _a !== void 0 ? _a : "[]";
                    this.monitors = JSON.parse(monitors);
                    console.log("monitors:");
                    console.log(this.monitors);
                    const displayAsViewer = settings.get("displayAsViewer");
                    this.displayAsViewer = JSON.parse(displayAsViewer);
                    //console.log("api");
                    //console.log(this.apiData);
                    //this.buildAllOptions();
                    /*
                    this.getPrograms();
                    if (this.monitors.program) {
                      this.getTransactions();
                    }
                    */
                }
                onAddClick() {
                    console.log("Adding new monitor");
                    this.monitors.push({
                        name: "",
                        program: "",
                        transaction: "",
                        inputs: "",
                        outputs: "",
                        outputDescriptions: "",
                        maxRecs: 100,
                        loadAll: true,
                        displayStyle: "Grid",
                    });
                    console.log(this.monitors);
                    this.changeDetectionRef.detectChanges();
                    if (this.accordion) {
                        this.accordion.updated();
                    }
                    //console.log("Open modal");
                    //dialog.open();
                }
                removeMonitor(i) {
                    this.monitors.splice(i, 1);
                }
                onMonitorInputChange(data, i) {
                    console.log("onMonitorInputChange(): " + i);
                    console.log(data);
                    this.monitors[i] = data;
                    console.log(this.monitors[i]);
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
                    console.log("Saving monitors");
                    const widgetContext = this.widgetSettingsContext.getWidgetContext();
                    const settings = widgetContext.getSettings();
                    settings.set("monitors", JSON.stringify(this.monitors));
                    settings.set("displayAsViewer", JSON.stringify(this.displayAsViewer));
                    this.subcomponents.forEach((subcomponent) => {
                        console.log("Saving monitors subcomponent");
                        subcomponent.save();
                    });
                    //settings.set("api", JSON.stringify(this.channels));
                }
            };
            tslib_1.__decorate([
                core_1.ViewChildren("subcomponent"),
                tslib_1.__metadata("design:type", core_1.QueryList)
            ], SettingsSubcomponentMonitors.prototype, "subcomponents", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", Object)
            ], SettingsSubcomponentMonitors.prototype, "widgetSettingsContext", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", String)
            ], SettingsSubcomponentMonitors.prototype, "label", void 0);
            tslib_1.__decorate([
                core_1.ViewChild("modalPlaceholder"),
                tslib_1.__metadata("design:type", core_1.ViewContainerRef)
            ], SettingsSubcomponentMonitors.prototype, "modalPlaceholder", void 0);
            tslib_1.__decorate([
                core_1.ViewChild("accordion"),
                tslib_1.__metadata("design:type", sohoxi_angular_1.SohoAccordionComponent)
            ], SettingsSubcomponentMonitors.prototype, "accordion", void 0);
            SettingsSubcomponentMonitors = tslib_1.__decorate([
                core_1.Component({
                    selector: "settings-subcomponent-monitors",
                    template: `
    <div #modalPlaceholder></div>
    <label>Monitors</label>

    <div class="field">
      <input
        type="checkbox"
        class="checkbox"
        id="checkDisplayAsViewer"
        [(ngModel)]="displayAsViewer"
      />
      <label for="checkDisplayAsViewer" class="checkbox-label"
        >Skip first panel if only one monitor</label
      >
    </div>
    <!--
    <soho-listview>
      <li soho-listview-item *ngFor="let monitor of monitors; index as i">
        <p soho-listview-header>
          {{ monitor.name }}
        </p>
      </li>
    </soho-listview>
-->
    <soho-accordion #accordion [allowOnePane]="false" expanderDisplay="chevron">
      <ng-container *ngFor="let monitor of monitors; index as i">
        <soho-accordion-header #accordionHeader>
          Monitor {{ i + 1 + ": " + monitor.name }}
        </soho-accordion-header>
        <soho-accordion-pane
          #accordionPane
          [id]="'accordion-pane-' + channelIndex"
        >
          <div class="accordion-content">
            <div class="field">
              <label soho-label [for]="'input-name-' + i">Name</label>
              <input [id]="'input-name-' + i" [(ngModel)]="monitor.name" />
            </div>
            <settings-subcomponent-monitor
              [monitorData]="monitor"
              (onChange)="onMonitorInputChange($event, i)"
            >
            </settings-subcomponent-monitor>
            <button
              type="button"
              id="primary-with-icon"
              class="btn-tertiary"
              (click)="removeMonitor(i)"
            >
              <svg
                class="icon"
                focusable="false"
                aria-hidden="true"
                role="presentation"
              >
                <use href="#icon-delete"></use>
              </svg>
              <span>Remove Monitor</span>
            </button>
          </div>
        </soho-accordion-pane>
      </ng-container>
    </soho-accordion>
    <button class="btn-tertiary add-monitor-btn" (click)="onAddClick()">
      Add Monitor
    </button>
  `,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                }),
                tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef,
                    sohoxi_angular_1.SohoModalDialogService])
            ], SettingsSubcomponentMonitors);
            exports_1("SettingsSubcomponentMonitors", SettingsSubcomponentMonitors);
        }
    };
});
//# sourceMappingURL=settings-subcomponent-monitors.js.map