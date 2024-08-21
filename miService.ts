import { HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import {
  IIonApiRequestOptions,
  IWidgetContext,
  Log,
  widgetContextInjectionToken,
  WidgetMessageType,
  WidgetState,
} from "lime";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { IMIRecord, IMIResponse, INameValue } from "./core";

@Injectable({
  providedIn: "root",
})
export class MIService {
  private logPrefix = "[MIService] ";

  private urlBase = "/M3/m3api-rest/execute";

  constructor(
    @Inject(widgetContextInjectionToken)
    private readonly widgetContext: IWidgetContext
  ) {}

  private setBusy(isBusy: boolean): void {
    this.widgetContext.setState(
      isBusy ? WidgetState.busy : WidgetState.running
    );
  }

  makeApiCall(
    program: string,
    transaction: string,
    params: Record<string, string>,
    outputs: string[],
    maxrecs: number = 100
  ) {
    const url =
      `${this.urlBase}/${program}/${transaction}` +
      (maxrecs ? `;maxrecs=${maxrecs}` : "");
    return this.get(url, params, outputs, false);
  }

  private get(
    url: string,
    params: Record<string, string>,
    outputs: string[],
    filter?: boolean
  ): Observable<Record<string, string>[]> {
    this.setBusy(true);
    const request = {
      method: "GET",
      url: url,
      params: params,
      data: outputs,
      headers: {
        Accept: "application/json",
      },
    } as IIonApiRequestOptions;

    return this.widgetContext.executeIonApiAsync<IMIResponse>(request).pipe(
      map((res) => res.data.MIRecord),
      map((records) => this.mapRecords(records, outputs, filter)),
      tap(() => this.setBusy(false)),
      catchError((err) => {
        this.setBusy(false);
        console.log("Something went wrong");
        throw err;
      })
    );
  }

  private mapRecords(
    records: IMIRecord[],
    outputs: string[],
    filter?: boolean
  ): Record<string, string>[] {
    console.log("records:");
    console.log(records);
    return records.map((record) => {
      const o: Record<string, string> = {};
      record.NameValue.filter(
        (nameValue) => outputs.indexOf(nameValue.Name) != -1 || !filter
      ).forEach((nameValue) => {
        o[nameValue.Name] = nameValue.Value.trim();
      });
      return o;
    });
  }

  /*
  get(url: string, displayFields: string[], requestFields: INameValue[]) {
    const queryString = requestFields.reduce((accumulator, current, i) => {
      accumulator += current.Name + "=" + current.Value;
      accumulator += i != requestFields.length - 1 ? "&" : "";
      return accumulator;
    }, "?");
    const request = {
      method: "GET",
      url: `${url}${encodeURI(queryString)}`,
      cache: false,
      headers: {
        Accept: "application/json",
      },
    };
    return this.widgetContext
      .executeIonApiAsync<IMIResponse>(request)
      .pipe(map((res) => this.getFiltered(res.data.MIRecord, displayFields)));
  }

  private createRequestSearchGenLedger(sqry: string): IIonApiRequestOptions {
    return {
      method: "GET",
      url: `/M3/m3api-rest/execute/GLS200MI/SearchGenLedger?SQRY=${sqry}`,
      cache: false,
      headers: {
        Accept: "application/json",
      },
    };
  }

  private getFiltered(records: IMIRecord[], fields: string[]): IMIRecord[] {
    console.log("getFiltered()");
    console.log(records);
    return records.map((record) => {
      const filteredRecord = JSON.parse(JSON.stringify(record));
      filteredRecord.NameValue = record.NameValue.filter(
        (nameValue) => fields.indexOf(nameValue.Name) != -1
      );
      return filteredRecord;
    });
  }

  private getValue(nameValues: INameValue[], name: string): string {
    const nameValueWithMatchingName = nameValues.find(
      (nameValue) => nameValue.Name === name
    );
    if (nameValueWithMatchingName) {
      return nameValueWithMatchingName.Value.trim();
    } else {
      return null;
    }
  }
  */

  /*
  private showErrorMessage(error: HttpErrorResponse): void {
    Log.error(this.logPrefix + "ION API Error: " + JSON.stringify(error));
    this.widgetContext.showWidgetMessage({
      type: WidgetMessageType.Error,
      message: "Unable to load customer data",
    });
    this.setBusy(false);
  }
  */
}
