export interface IMIResponse {
  Program: string;
  Transaction: string;
  MIRecord: IMIRecord[];
}

export interface IMIRecord {
  RowIndex: number;
  NameValue: INameValue[];
}

export interface INameValue {
  Name: string;
  Value: string;
}

export interface IListItem {
  title: string;
  description: string;
}

export interface IChannelData {
  name: string;
  fields: string;
  values: string;
}

export class Channel {
  name: string;
  fieldValues: INameValue[];
  constructor(channelData: IChannelData) {
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
}

export interface IMonitorData {
  name: string;
  program: string;
  transaction: string;
  inputs: string;
  filters: string;
  //filterFields: string[];
  //filterExpressions: string[];
  outputs: string;
  outputDescriptions: string;
  displayStyle: string;
  maxRecs: number;
  drillback: string;
  loadAll: boolean;
}

export class Monitor {
  name: string = "";
  program: string = "";
  transaction: string = "";
  inputs: Record<string, string> = {};
  filters: Record<string, string> = {};
  //filterFields: string[];
  //filterExpressions: string[];
  //filters: Record<string, string> = {};
  outputs: string[] = [];
  outputDescriptions: string[] = [];
  displayStyle: string;
  maxRecs: number;
  loadAll: boolean;
  gridOptions: SohoDataGridOptions;
  drillback: string;
  data: Record<string, string>[];

  constructor(monitorData: IMonitorData) {
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
    } catch (err) {
      this.filters = {};
    }
  }
}

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
