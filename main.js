System.register(["tslib", "@angular/common", "@angular/core", "@angular/forms", "ids-enterprise-ng", "lime", "./core", "./miService", "./components/settings/settings", "./components/settings/settings-subcomponent-monitor", "./components/settings/settings-subcomponent-title", "./components/settings/settings-subcomponent-monitors", "./components/settings/settings-subcomponent-drillback", "./components/settings/settings-subcomponent-header-color"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, common_1, core_1, forms_1, sohoxi_angular_1, lime_1, core_2, miService_1, settings_1, settings_subcomponent_monitor_1, settings_subcomponent_title_1, settings_subcomponent_monitors_1, settings_subcomponent_drillback_1, settings_subcomponent_header_color_1, InformationViewerMonitorComponent, getActions, InformationViewerMonitorModule;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (sohoxi_angular_1_1) {
                sohoxi_angular_1 = sohoxi_angular_1_1;
            },
            function (lime_1_1) {
                lime_1 = lime_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (miService_1_1) {
                miService_1 = miService_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (settings_subcomponent_monitor_1_1) {
                settings_subcomponent_monitor_1 = settings_subcomponent_monitor_1_1;
            },
            function (settings_subcomponent_title_1_1) {
                settings_subcomponent_title_1 = settings_subcomponent_title_1_1;
            },
            function (settings_subcomponent_monitors_1_1) {
                settings_subcomponent_monitors_1 = settings_subcomponent_monitors_1_1;
            },
            function (settings_subcomponent_drillback_1_1) {
                settings_subcomponent_drillback_1 = settings_subcomponent_drillback_1_1;
            },
            function (settings_subcomponent_header_color_1_1) {
                settings_subcomponent_header_color_1 = settings_subcomponent_header_color_1_1;
            }
        ],
        execute: function () {
            InformationViewerMonitorComponent = class InformationViewerMonitorComponent {
                constructor(changeDetectionRef, miService) {
                    this.changeDetectionRef = changeDetectionRef;
                    this.miService = miService;
                    this.channels = [];
                    this.chartData = [
                        {
                            name: "test",
                            value: 100,
                        },
                        {
                            name: "test2",
                            value: 105,
                        },
                    ];
                    this.items = [
                        {
                            title: "Test",
                            description: "Test description",
                        },
                    ];
                    this.selectedMonitor = -1;
                }
                ngOnInit() {
                    this.contextMessageType = "context-" + this.widgetContext.getPageId();
                    //this.buildGridOptions([]);
                    const instance = this.widgetInstance;
                    console.log("Applications:");
                    this.widgetContext.getApplications().forEach((app) => {
                        console.log(app);
                    });
                    this.setEventHandlers();
                }
                getRightClickMenuStyle() {
                    return "";
                }
                ngAfterViewInit() {
                    var _a, _b;
                    const widgetContent = (_b = (_a = this.wrapper) === null || _a === void 0 ? void 0 : _a.nativeElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                    if (widgetContent) {
                        widgetContent.setAttribute("style", "display: flex; flex-direction: column; height: 100%");
                    }
                    this.updateActions();
                    //this.piechart.dataset = this.chartData;
                    /*
                    setTimeout(() => {
                      this.update();
                    }, 2000);
                    */
                    this.update();
                }
                setEventHandlers() {
                    console.log("Listening for context message type: " + this.contextMessageType);
                    this.widgetContext
                        .receive(this.contextMessageType)
                        .subscribe((msg) => this.handleContextMessage(msg));
                    this.widgetInstance.restored = () => this.update();
                    this.widgetInstance.settingsSaved = () => this.update();
                    this.widgetInstance.widgetSettingsFactory = () => {
                        return {
                            angularConfig: {
                                componentType: settings_1.SettingsComponent,
                            },
                        };
                    };
                }
                handleContextMessage(msg) {
                    console.log("Received context message.");
                    if (msg) {
                        console.log("msg");
                        console.log(msg);
                        this.channels = msg;
                        console.log(this.channels);
                        this.update();
                    }
                }
                setWidgetColor(color) {
                    console.log("Setting widget color: " + color);
                    if (color) {
                        const widgetElement = this.widgetContext.getElement();
                        const widgetWrapper = widgetElement.parent();
                        const widgetHeader = widgetWrapper.find(".widget-header");
                        console.log("widgetHeader:");
                        console.log(widgetHeader);
                        widgetHeader.css("background-color", color);
                    }
                    else {
                        console.log("No color");
                    }
                }
                update() {
                    console.log("InformationViewer.update()");
                    //this.widgetContext.setStandardTitle();
                    const settings = this.widgetContext.getSettings();
                    const color = JSON.parse(settings.get("headerColor", '""'));
                    console.log("Color: ");
                    console.log(color);
                    this.setWidgetColor(color);
                    console.log("settings: ");
                    console.log(settings);
                    const monitorData = JSON.parse(settings.get("monitors"));
                    console.log("Monitor data:");
                    console.log(monitorData);
                    this.monitors = monitorData.map((data) => new core_2.Monitor(data));
                    this.monitors.forEach((monitor) => {
                        console.log("Building grid options for monitor " + monitor.name);
                        console.log(monitor);
                        this.buildGridOptions(monitor);
                        this.getData(monitor);
                    });
                    this.displayAsViewer = JSON.parse(settings.get("displayAsViewer"));
                    //If there is only a single monitor, it should automatically be selected.
                    if (this.monitors.length == 1 && this.displayAsViewer) {
                        this.selectedMonitor = 0;
                    }
                    this.changeDetectionRef.detectChanges();
                    this.updateActions();
                }
                buildGridOptions(monitor) {
                    const columns = monitor.outputs.map((output, i) => ({
                        id: output,
                        name: monitor.outputDescriptions &&
                            monitor.outputDescriptions[i] &&
                            monitor.outputDescriptions[i].trim().length > 0
                            ? monitor.outputDescriptions[i]
                            : output,
                        field: output,
                    }));
                    const gridOptions = {
                        indeterminate: true,
                        //paging: true,
                        filterable: false,
                        stickyHeader: true,
                        //pagesize: 100,
                        //pagesizes: [5, 10, 25, 50, 75, 100],
                        menuId: "popupmenu",
                        menuSelected: (e, a) => {
                            var _a;
                            //console.log(e);
                            //console.log(a);
                            const x = e.currentTarget.ariaColIndex;
                            const y = ((_a = e.currentTarget.parentElement.ariaRowIndex) !== null && _a !== void 0 ? _a : e.currentTarget.ariaRowIndex) - 1;
                            console.log("menuSelected");
                            /*
                            console.log(e);
                            console.log(e.currentTarget);
                            console.log(e.currentTarget.parentElement);
                            console.log(e.currentTarget.parentElement.ariaRowIndex);
                            */
                            this.doDrillback(y);
                            console.log("(" + x + ", " + y + ")");
                            console.log(this.grid.dataset[y]);
                            //console.log(a);
                        },
                        rowHeight: "small",
                    };
                    gridOptions.columns = columns;
                    monitor.gridOptions = gridOptions;
                }
                doDrillback(line) {
                    var _a, _b;
                    console.log("doDrillback: " + line);
                    const url = this.monitors[this.selectedMonitor].drillback;
                    const values = (_b = (_a = this.grid.dataset[line]) !== null && _a !== void 0 ? _a : this.grid["_gridOptions"].dataset[line]) !== null && _b !== void 0 ? _b : {};
                    console.log(values);
                    console.log("grid");
                    console.log(this.grid);
                    console.log("grid[_gridOptions]");
                    console.log(this.grid["_gridOptions"]);
                    console.log("grid[_gridOptions].dataset");
                    console.log(this.grid["_gridOptions"].dataset);
                    const drillbackUrl = this.buildDrillbackUrl(url, values);
                    console.log("drillback url: " + drillbackUrl);
                    window.open(drillbackUrl);
                }
                buildDrillbackUrl(url, values) {
                    console.log("Building drillback url");
                    console.log(url);
                    console.log(values);
                    return Object.entries(values !== null && values !== void 0 ? values : {}).reduce((accumulator, [key, value], i) => {
                        return accumulator.split(`{${key}}`).join(value);
                        //return accumulator.replace(`{${key}}`, value);
                    }, url);
                }
                /*
                buildGridOptions(columns: SohoDataGridColumn[]): void {
                  const gridOptions: SohoDataGridOptions = {
                    indeterminate: true,
                    //paging: true,
                    filterable: false,
                    //pagesize: 100,
                    //pagesizes: [5, 10, 25, 50, 75, 100],
                    rowHeight: "small",
                  };
              
                  gridOptions.columns = columns;
              
                  this.gridOptions = gridOptions;
                }
                */
                getData(monitor) {
                    //const inputs = this.applyContext(monitor.api.inputs.map)
                    console.log("Getting data for monitor");
                    console.log(monitor);
                    const inputs = {};
                    Object.entries(monitor.inputs).forEach(([key, value]) => {
                        try {
                            console.log("Applying context to " + key + ", " + value);
                            inputs[key] = this.applyContext(value);
                        }
                        catch (err) {
                            //TODO: Maybe handle errors?
                            console.log(err);
                        }
                    });
                    console.log("inputs");
                    console.log(inputs);
                    if ((monitor === null || monitor === void 0 ? void 0 : monitor.program) && (monitor === null || monitor === void 0 ? void 0 : monitor.transaction)) {
                        this.miService
                            .makeApiCall(monitor.program, monitor.transaction, inputs, monitor.outputs, monitor.maxRecs)
                            .subscribe((response) => {
                            console.log("Response from " + monitor.program + "/" + monitor.transaction);
                            console.log(response);
                            monitor.data = this.applyFilters(monitor, response);
                            this.changeDetectionRef.detectChanges();
                        }, (err) => {
                            console.log("InformationMonitor error");
                            console.log(err);
                        });
                    }
                    //const inputs = this.applyContext(this.api.inputs.map());
                    /*
                    const inputs: Record<string, string> = {};
                    Object.entries(this.api.inputs).forEach(([key, value]) => {
                      inputs[key] = this.applyContext(value);
                    });
                    if (this.api?.program && this.api?.transaction) {
                      this.miService
                        .makeApiCall(this.api.program, this.api.transaction, inputs)
                        .subscribe(
                          (response) => {
                            console.log(
                              "Response from " + this.api.program + "/" + this.api.transaction
                            );
                            this.gridData = response;
                            console.log(response);
                            this.changeDetectionRef.detectChanges();
                          },
                          (err) => {
                            console.log("InformationViewer error");
                            console.log(err);
                          }
                        );
                    }
                    */
                }
                applyFilters(monitor, data) {
                    console.log("Applying filters to data:");
                    console.log(data);
                    const filteredData = data.filter((row, i) => {
                        const allFiltersMatch = Object.entries(monitor.filters).reduce((accumulator, [key, value], j) => {
                            const v = this.applyContext(value);
                            const match = row[key] == v;
                            return accumulator && match;
                        }, true);
                        /*
                        const allFiltersMatch = monitor.filterFields.reduce(
                          (accumulator, filterField, j) => {
                            console.log(row[filterField] + ":" + monitor.filterExpressions[j]);
                            const match = row[filterField] == monitor.filterExpressions[j];
                            const filterFieldIsEmpty = !filterField;
                            return accumulator && (match || filterFieldIsEmpty);
                          },
                          true
                        );
                        */
                        console.log("Row " + i + " matches filters: " + allFiltersMatch);
                        return allFiltersMatch;
                    });
                    return filteredData;
                }
                onListItemClick(i) {
                    console.log(i);
                    /*
                    this.chartData.push(
                      ...[
                        [100, 50, 1000],
                        [100, 50, 1000],
                      ]
                    );
                    */
                    this.selectedMonitor = i;
                    console.log("----- onListItemClick");
                    //console.log(this.monitors[this.selectedMonitor].data);
                    /*
                    this.chartData = this.monitors[i].data.map((row) => ({
                      value: parseFloat(row["ACAM"]),
                    }));
                    */
                    console.log("chartData:");
                    console.log(this.chartData);
                    this.changeDetectionRef.detectChanges();
                    this.updateActions();
                    console.log("charts:");
                    console.log(this.chart);
                    console.log(this.piechart);
                }
                resetSelectedMonitor() {
                    this.selectedMonitor = -1;
                    this.changeDetectionRef.detectChanges();
                    this.updateActions();
                }
                parseIfStatement(ifStatement) {
                    var _a, _b;
                    const result = [];
                    let currentText = "";
                    let parenthesisCount = 0;
                    console.log("Parsing if statement: " + ifStatement);
                    for (let i = 0; i < ifStatement.length; i++) {
                        const char = ifStatement[i];
                        if (char === "(") {
                            parenthesisCount++;
                            if (parenthesisCount == 1) {
                                currentText = "";
                            }
                            if (parenthesisCount >= 2) {
                                currentText += char;
                            }
                        }
                        else if (char === ")") {
                            parenthesisCount--;
                            if (parenthesisCount >= 1) {
                                currentText += char;
                            }
                            if (parenthesisCount === 0) {
                                result.push(currentText);
                                currentText = "";
                            }
                        }
                        else if (char === ":" && parenthesisCount === 0) {
                            //Do nothing
                        }
                        else {
                            currentText += char;
                        }
                    }
                    console.log("if statement parsed result: ");
                    console.log(result);
                    if (result[0]) {
                        return (_a = result[1]) !== null && _a !== void 0 ? _a : "";
                    }
                    else {
                        return (_b = result[2]) !== null && _b !== void 0 ? _b : "";
                    }
                }
                parseIfStatements(script) {
                    console.log("applying context to " + script);
                    let i = 0;
                    let matches;
                    do {
                        const regex = /IF{(.*?)}/;
                        matches = regex.exec(script);
                        console.log("script: " + script);
                        console.log("matches:");
                        console.log(matches);
                        if (matches) {
                            const replacement = this.parseIfStatement(matches[1]);
                            console.log("replacement: ");
                            console.log(replacement);
                            script = script.replace(matches[0], replacement);
                        }
                        i++;
                    } while (matches && i < 100);
                    if (i >= 100) {
                        console.log("You're either using too many if statements, or there's some issue with them.");
                    }
                    return script;
                    // const result: string[] = [];
                    // let currentText = "";
                    // let parenthesisCount = 0;
                    // for (let i = 0; i < script.length; i++) {
                    //   const char = script[i];
                    //   if (char === "(") {
                    //     parenthesisCount++;
                    //     // Only push currentText if it's not empty
                    //     /*
                    //     if (currentText !== "") {
                    //       result.push(currentText);
                    //       currentText = "";
                    //     }
                    //     */
                    //     if (parenthesisCount == 1) {
                    //       currentText = "";
                    //     }
                    //     if (parenthesisCount >= 3) {
                    //       currentText += char;
                    //     }
                    //   } else if (char === ")") {
                    //     parenthesisCount--;
                    //     // Only push currentText if it's not empty and all parentheses are balanced
                    //     if (parenthesisCount >= 2) {
                    //       currentText += char;
                    //     }
                    //     if (currentText !== "" && parenthesisCount === 1) {
                    //       result.push(currentText);
                    //       currentText = "";
                    //     }
                    //   } else if (char === ":" && parenthesisCount === 1) {
                    //     //colonCount++;
                    //     // Only push currentText if it's not empty and inside parentheses
                    //     //result.push(currentText);
                    //     //currentText = "";
                    //   } else {
                    //     currentText += char;
                    //   }
                    // }
                    // // Push the remaining currentText if it's not empty
                    // /*
                    // if (currentText !== "") {
                    //   result.push(currentText);
                    // }
                    // */
                    // return result;
                }
                applyContext(base) {
                    console.log("applying context to " + base);
                    let result = base;
                    //Adjust the query based on IF-statements:
                    /*
                    const ifRegex =
                      /IF\(([^()]+|(\((?:[^()]+|(?2))*\))):([^()]+|(\((?:[^()]+|(?4))*\)))\)/g;
                    */
                    /*
                    const ifRegexTestString = "testbefore IF(a:abc:123) testafter";
                    console.log(ifRegexTestString.replace);
                
                    const matches = ifRegex.test(ifRegexTestString);
                    console.log(matches);
                    */
                    //const ifRegexTestString = "IF((a):(abc:DATE(0)):(bcd:DATE(-30)))";
                    //console.log("parsing if statements:");
                    //console.log(ifRegexTestString);
                    //console.log(this.parseIfStatement(ifRegexTestString));
                    //Apply context from context provider
                    this.channels.forEach((channel) => {
                        channel.fieldValues.forEach((fieldValue) => {
                            //This is basically a replaceAll, but should work without the proper node version unlike replaceAll.
                            result = result
                                .split(`{${channel.name}.${fieldValue.Name}}`)
                                .join(fieldValue.Value);
                        });
                    });
                    //Replace remaining "variables", if any.
                    result = result.split(/{[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+}/).join("");
                    console.log("result: " + result);
                    result = this.parseIfStatements(result);
                    //Apply date
                    result = this.applyContextDate(result);
                    result = this.applyContextUsid(result);
                    console.log("Returning result: " + result);
                    return result;
                }
                applyContextDate(base) {
                    let result = base;
                    console.log("Applying date");
                    const dateRegex = /DATE\((-?[0-9]+)\)/;
                    const count = ((result || "").match(dateRegex) || []).length;
                    console.log("count: " + count);
                    for (let i = 0; i < count; i++) {
                        const match = result.match(dateRegex);
                        if (!match) {
                            break;
                        }
                        console.log(match);
                        console.log(result);
                        /*
                        const currentDateString = new Date()
                          .toISOString()
                          .replace(/-/g, "")
                          .slice(0, 8);
                        */
                        const d = new Date();
                        d.setDate(d.getDate() + parseInt(match[1]));
                        const appliedDateString = d.toISOString().replace(/-/g, "").slice(0, 8);
                        result = result.replace(dateRegex, appliedDateString);
                        console.log("result " + i + ", " + result);
                    }
                    console.log("result: " + result);
                    console.log("/Applying date");
                    return result;
                }
                applyContextUsid(base) {
                    const usid = this.widgetContext.getUserId();
                    //console.log("your usid is: " + usid);
                    const result = base.split(`{USID}`).join(usid);
                    return result;
                }
                onRowClick(event) {
                    console.log("onRowClick");
                }
                afterPaging(event) {
                    console.log("After paging");
                }
                updateActions() {
                    console.log("Updating action");
                    const exportExcelAction = this.widgetInstance.actions[0];
                    console.log("this.selectedMonitor:");
                    console.log(this.selectedMonitor);
                    console.log("this.grid:");
                    console.log(this.grid);
                    //console.log("this.monitors[].displayStyle:");
                    //console.log(this.monitors[this.selectedMonitor]?.displayStyle);
                    if (this.grid &&
                        this.selectedMonitor != -1
                    //this.monitors[this.selectedMonitor].displayStyle == "Grid"
                    ) {
                        console.log("enabling.");
                        exportExcelAction.isEnabled = true;
                    }
                    else {
                        console.log("disabling.");
                        exportExcelAction.isEnabled = false;
                    }
                    console.log("exportExcelAction.isEnabled");
                    console.log(exportExcelAction.isEnabled);
                    this.changeDetectionRef.detectChanges();
                    /*
                  if (
                    this.activeView != View.CONTROL &&
                    this.grid.selectedRows() &&
                    this.grid.selectedRows().length > 0
                  ) {
                    editAction.isEnabled = true;
                  } else {
                    editAction.isEnabled = false;
                  }
                  */
                    /*
                  editAction.execute = () => {
                    //On button click
                    console.log("Executing action");
                    const selected = this.grid.selectedRows();
                    console.log("selected:");
                    console.log(selected);
                
                    console.log("selected row data:");
                    //console.log(this.grid.dataset[selected["idx"]]);
                    this.manageFeature(this.grid.selectedRows()[0].data);
                  };
                  */
                    exportExcelAction.execute = () => {
                        console.log("exporting");
                        this.grid.exportToExcel("test");
                    };
                }
            };
            tslib_1.__decorate([
                core_1.ViewChild("grid"),
                tslib_1.__metadata("design:type", sohoxi_angular_1.SohoDataGridComponent)
            ], InformationViewerMonitorComponent.prototype, "grid", void 0);
            tslib_1.__decorate([
                core_1.ViewChild("chart"),
                tslib_1.__metadata("design:type", sohoxi_angular_1.SohoChartComponent)
            ], InformationViewerMonitorComponent.prototype, "chart", void 0);
            tslib_1.__decorate([
                core_1.ViewChild("piechart"),
                tslib_1.__metadata("design:type", sohoxi_angular_1.SohoPieComponent)
            ], InformationViewerMonitorComponent.prototype, "piechart", void 0);
            tslib_1.__decorate([
                core_1.ViewChild("wrapper"),
                tslib_1.__metadata("design:type", core_1.ElementRef)
            ], InformationViewerMonitorComponent.prototype, "wrapper", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", lime_1.IWidgetContext)
            ], InformationViewerMonitorComponent.prototype, "widgetContext", void 0);
            tslib_1.__decorate([
                core_1.Input(),
                tslib_1.__metadata("design:type", lime_1.IWidgetInstance)
            ], InformationViewerMonitorComponent.prototype, "widgetInstance", void 0);
            InformationViewerMonitorComponent = tslib_1.__decorate([
                core_1.Component({
                    providers: [miService_1.MIService],
                    template: `
    <div #wrapper style="flex: 1">
      <ul soho-popupmenu id="popupmenu" class="popupmenu">
        <li soho-popupmenu-item><a href="#">Drilldown</a></li>
      </ul>
      <!-- First panel, for selecting a monitor -->
      <soho-listview *ngIf="selectedMonitor == -1">
        <li
          soho-listview-item
          *ngFor="let monitor of monitors; index as i"
          (click)="onListItemClick(i)"
        >
          <div style="display: flex" soho-listview-header>
            <h3 style="flex: 1; color: #222222">
              {{ applyContext(monitor.name) }}
            </h3>
            <span class="round info badge" style="margin: 1px">
              {{ monitor.data ? monitor.data.length : 0 }}
            </span>
          </div>
        </li>
      </soho-listview>
      <!-- /First Panel -->

      <!-- Second panel -->
      <div
        *ngIf="selectedMonitor != -1"
        style="height: 100%; display: flex; flex-direction: column;"
      >
        <!-- Top bar for returning to first panel -->
        <div *ngIf="monitors.length > 1 || !displayAsViewer">
          <button
            class="btn-tertiary"
            (click)="resetSelectedMonitor()"
            style="z-index: 1"
          >
            <svg soho-icon icon="left-arrow" class="icon">
              <use href="#icon-left-arrow"></use>
            </svg>
            Monitors
          </button>
        </div>
        <!-- /Top bar -->
        <div style="flex: 1; display: flex; flex-direction: column">
          <!-- List -->
          <soho-listview
            *ngIf="monitors[selectedMonitor].displayStyle == 'List'"
            style="flex: 1"
          >
            <li
              soho-listview-item
              menuId="popupmenu"
              *ngFor="let record of monitors[selectedMonitor].data; index as i"
              (click)="doDrillback(i)"
            >
              <!--<p soho-listview-heading>Item {{ i + 1 }}</p>-->
              <div soho-listview-subheading>
                <table>
                  <tr *ngFor="let item of record | keyvalue; index as j">
                    <td style="padding-right: 10px">
                      <b>{{
                        monitors[selectedMonitor].outputDescriptions[j]
                      }}</b>
                    </td>
                    <td>
                      {{ record[monitors[selectedMonitor].outputs[j]] }}
                    </td>
                  </tr>
                </table>
              </div>
            </li>
          </soho-listview>
          <!-- /List -->
          <!-- Grid -->
          <div
            #grid
            *ngIf="selectedMonitor != -1"
            [style]="
              monitors[selectedMonitor].displayStyle == 'Grid'
                ? 'display: flex'
                : 'display: none' + '; ' + 'flex: 1'
            "
            soho-datagrid
            id="grid"
            class="datagrid soho"
            [gridOptions]="monitors[selectedMonitor].gridOptions"
            [dataset]="monitors[selectedMonitor].data"
            (rowClicked)="onRowClick($event)"
            (afterPaging)="afterPaging($event)"
          ></div>

          <!--
      <app-context-menu
        [contextMenuItems]="['a', 'b', 'c']"
        (onContextMenuItemClick)="update()"
      ></app-context-menu>
-->
          <!--
      <app-context-menu
        [ngStyle]="getRightClickMenuStyle()"
        [contextMenuItems]="rightClickMenuItems"
        (onContextMenuItemClick)="handleMenuItemClick($event)"
      ></app-context-menu>
-->

          <!-- /Grid -->
          <!-- Graph -->
          <div
            *ngIf="monitors[selectedMonitor].displayStyle == 'Graph'"
            style="flex: 1; z-index: 0; display: flex; flex-direction: column;"
          >
            <!--
            <div
              #chart
              soho-chart
              class="chart soho-chart pie soho-pie"
              style="flex: 1; background: red; padding: 0; margin: 0;"
              [chartOptions]="{
                dataset: chartData,
                chart: {}
              }"
              [dataSet]="chartData"
            >
              <div
                #pietest
                #piechart
                id="pie-chart-example"
                class="pie-chart pie chart-container"
                soho-pie
              ></div>
            </div>
            -->
            <div
              #piechart
              id="pie-chart-example"
              class="pie-chart pie chart-container"
              style="background: blue;"
              soho-pie
            ></div>
          </div>
          <!--
      <div
        #grid
        *ngIf="selectedMonitor != -1"
        [style]="
          monitors[selectedMonitor].displayStyle == 'Graph'
            ? 'display: flex'
            : 'display: none'
        "
        soho-datagrid
        id="grid"
        class="datagrid soho"
        [gridOptions]="monitors[selectedMonitor].gridOptions"
        [dataset]="monitors[selectedMonitor].data"
        (rowClicked)="onRowClick($event)"
        (afterPaging)="afterPaging($event)"
      ></div>
      -->
          <!-- /Graph -->
        </div>
      </div>
      <!-- Second panel -->
    </div>
  `,
                    styles: [
                        `
      /*
      .widget-content {
      }
      .widget-content ng-component {
        flex: 1,
        height: 100px;
      }
      */
    `,
                    ],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                }),
                tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef,
                    miService_1.MIService])
            ], InformationViewerMonitorComponent);
            exports_1("InformationViewerMonitorComponent", InformationViewerMonitorComponent);
            exports_1("getActions", getActions = () => {
                return [
                    //{ isPrimary: true, standardIconName: "#icon-edit", text: "Edit" },
                    { isPrimary: true, text: "Export to Excel" },
                ];
            });
            InformationViewerMonitorModule = class InformationViewerMonitorModule {
            };
            InformationViewerMonitorModule = tslib_1.__decorate([
                core_1.NgModule({
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        sohoxi_angular_1.SohoAccordionModule,
                        sohoxi_angular_1.SohoButtonModule,
                        sohoxi_angular_1.SohoChartModule,
                        sohoxi_angular_1.SohoPieModule,
                        sohoxi_angular_1.SohoBarModule,
                        sohoxi_angular_1.SohoContextMenuModule,
                        sohoxi_angular_1.SohoDataGridModule,
                        sohoxi_angular_1.SohoDropDownModule,
                        sohoxi_angular_1.SohoListViewModule,
                        sohoxi_angular_1.SohoLookupModule,
                        sohoxi_angular_1.SohoModalDialogModule,
                    ],
                    declarations: [
                        InformationViewerMonitorComponent,
                        settings_1.SettingsComponent,
                        settings_subcomponent_drillback_1.SettingsSubcomponentDrillback,
                        settings_subcomponent_header_color_1.SettingsSubcomponentHeaderColor,
                        settings_subcomponent_title_1.SettingsSubcomponentTitle,
                        settings_subcomponent_monitors_1.SettingsSubcomponentMonitors,
                        settings_subcomponent_monitors_1.SettingsSubcomponentMonitorsDialog,
                        settings_subcomponent_monitor_1.SettingsSubcomponentMonitor,
                    ],
                })
            ], InformationViewerMonitorModule);
            exports_1("InformationViewerMonitorModule", InformationViewerMonitorModule);
            /*
            export const getActions = (context: IWidgetContext): IWidgetAction[] => {
              return [
                {
                  isSubmenu: true,
                  text: "submenutest",
                  submenuItems: [
                    { text: "A" },
                    { isSeparator: true },
                    { text: "B" },
                    { text: "C", isEnabled: false },
                  ],
                },
              ];
            };
            */
            /*
            export const getActions = (context: IWidgetContext): IWidgetAction[] => {
                const language = context.getLanguage();
                return [{
                    isSubmenu: true,
                    text: language.get("submenu"),
                    submenuItems: [
                        { text: language.get("toastMessage") },
                        { isSeparator: true },
                        { text: language.get("logMessage") },
                        { text: language.get("disabledAction"), isEnabled: false }
                    ]
                }];
            };
            */
        }
    };
});
//# sourceMappingURL=main.js.map