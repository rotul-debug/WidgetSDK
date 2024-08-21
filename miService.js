System.register(["tslib", "@angular/core", "lime", "rxjs/operators"], function (exports_1, context_1) {
    "use strict";
    var tslib_1, core_1, lime_1, operators_1, MIService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (tslib_1_1) {
                tslib_1 = tslib_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lime_1_1) {
                lime_1 = lime_1_1;
            },
            function (operators_1_1) {
                operators_1 = operators_1_1;
            }
        ],
        execute: function () {
            MIService = class MIService {
                constructor(widgetContext) {
                    this.widgetContext = widgetContext;
                    this.logPrefix = "[MIService] ";
                    this.urlBase = "/M3/m3api-rest/execute";
                }
                setBusy(isBusy) {
                    this.widgetContext.setState(isBusy ? lime_1.WidgetState.busy : lime_1.WidgetState.running);
                }
                makeApiCall(program, transaction, params, outputs, maxrecs = 100) {
                    const url = `${this.urlBase}/${program}/${transaction}` +
                        (maxrecs ? `;maxrecs=${maxrecs}` : "");
                    return this.get(url, params, outputs, false);
                }
                get(url, params, outputs, filter) {
                    this.setBusy(true);
                    const request = {
                        method: "GET",
                        url: url,
                        params: params,
                        data: outputs,
                        headers: {
                            Accept: "application/json",
                        },
                    };
                    return this.widgetContext.executeIonApiAsync(request).pipe(operators_1.map((res) => res.data.MIRecord), operators_1.map((records) => this.mapRecords(records, outputs, filter)), operators_1.tap(() => this.setBusy(false)), operators_1.catchError((err) => {
                        this.setBusy(false);
                        console.log("Something went wrong");
                        throw err;
                    }));
                }
                mapRecords(records, outputs, filter) {
                    console.log("records:");
                    console.log(records);
                    return records.map((record) => {
                        const o = {};
                        record.NameValue.filter((nameValue) => outputs.indexOf(nameValue.Name) != -1 || !filter).forEach((nameValue) => {
                            o[nameValue.Name] = nameValue.Value.trim();
                        });
                        return o;
                    });
                }
            };
            MIService = tslib_1.__decorate([
                core_1.Injectable({
                    providedIn: "root",
                }),
                tslib_1.__param(0, core_1.Inject(lime_1.widgetContextInjectionToken)),
                tslib_1.__metadata("design:paramtypes", [lime_1.IWidgetContext])
            ], MIService);
            exports_1("MIService", MIService);
        }
    };
});
//# sourceMappingURL=miService.js.map