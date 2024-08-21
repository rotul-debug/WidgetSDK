System.register([], function (exports_1, context_1) {
    "use strict";
    var Channel, Monitor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Channel = class Channel {
                constructor(channelData) {
                    this.name = channelData.name;
                    const fields = channelData.fields ? channelData.fields.split(";") : [];
                    const values = channelData.values ? channelData.values.split(";") : [];
                    this.fieldValues = [];
                    fields.forEach((field, i) => {
                        this.fieldValues.push({
                            Name: field,
                            Value: values[i] ? values[i] : "",
                        });
                        //this.fieldValues[field] = values[i] ? values[i] : "";
                    });
                }
            };
            exports_1("Channel", Channel);
            Monitor = class Monitor {
                constructor(monitorData) {
                    this.name = "";
                    this.program = "";
                    this.transaction = "";
                    this.inputs = {};
                    this.filters = {};
                    //filterFields: string[];
                    //filterExpressions: string[];
                    //filters: Record<string, string> = {};
                    this.outputs = [];
                    this.outputDescriptions = [];
                    console.log("Building new monitor from monitorData");
                    console.log(monitorData);
                    this.name = monitorData.name;
                    this.program = monitorData.program;
                    this.transaction = monitorData.transaction;
                    this.displayStyle = monitorData.displayStyle;
                    this.maxRecs = monitorData.maxRecs;
                    this.loadAll = monitorData.loadAll;
                    this.data = [];
                    this.drillback = monitorData.drillback;
                    /*
                    this.filterFields = monitorData.filterFields ?? [];
                    this.filterExpressions = monitorData.filterExpressions ?? [];
                    */
                    this.outputs = monitorData.outputs ? monitorData.outputs.split(";") : [];
                    this.outputDescriptions = monitorData.outputDescriptions
                        ? monitorData.outputDescriptions.split(";")
                        : [];
                    try {
                        const inArr = monitorData.inputs.split(";");
                        console.log("Inputs...");
                        inArr.forEach((nameValue, i) => {
                            console.log(nameValue);
                            const splitNameValue = nameValue.split("=");
                            const name = splitNameValue[0].trim();
                            const value = splitNameValue[1].trim();
                            this.inputs[name] = value;
                        });
                        const filterArr = monitorData.filters.split(";");
                        console.log("Filters...");
                        filterArr.forEach((nameValue, i) => {
                            console.log(nameValue);
                            const splitNameValue = nameValue.split("=");
                            const name = splitNameValue[0].trim();
                            const value = splitNameValue[1].trim();
                            this.filters[name] = value;
                        });
                    }
                    catch (err) {
                        this.filters = {};
                    }
                }
            };
            exports_1("Monitor", Monitor);
            /*
            export interface IMonitorData {
              name: string;
              maxRecords: number;
              apiData: IMonitorData;
            }
            */
            /*
            export class Monitor {
              name: string;
              maxRecords: number;
              api: Api;
              records: Record<string, string>[];
            
              constructor(monitorData: IMonitorData) {
                this.name = monitorData.name;
                this.maxRecords = monitorData.maxRecords;
                this.api = new Api(monitorData.apiData);
              }
            }
            */
        }
    };
});
//# sourceMappingURL=core.js.map