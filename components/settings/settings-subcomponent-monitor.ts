import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { IWidgetSettingsContext2 } from "lime";
import { Monitor, IMonitorData, IChannelData } from "../../core";
import { MIService } from "../../miService";
import { SettingsSubcomponent } from "./settings-subcomponent";

/**
 * This component can be used to display a Title setting field with a padlock.
 * It works with the given (required) widgetSettingContext to determine whether title should
 * be locked, unlocked, editable, unlockable etc.
 *
 * Call save() to commit the changes to the widget settings.
 */
@Component({
  selector: "settings-subcomponent-monitor",
  template: `
    <div class="field">
      <label soho-label for="program-lookup">Program</label>
      <!--
      <input
        soho-lookup
        id="program-lookup"
        class="lookup"
        field="MINM"
        [(ngModel)]="monitorData.program"
        [dataset]="programData"
        [options]="programOptions"
        [disabled]="programData.length == -1"
        (ngModelChange)="onProgramChange()"
      />
      -->

      <input
        id="program-lookup"
        [(ngModel)]="monitorData.program"
        (ngModelChange)="onProgramChange()"
      />
      <!--
      <input
        #programInput
        soho-lookup
        id="program-lookup"
        class="lookup"
        name="program-lookup"
        field="MINM"
        [(ngModel)]="data.program"
        [dataset]="programData"
        [options]="programOptions"
        [disabled]="programData.length == 0"
        (ngModelChange)="onProgramChange()"
      />
--></div>
    <div class="field">
      <label soho-label for="transaction-lookup">Transaction</label>
      <!--
      <input
        soho-lookup
        id="transaction-lookup"
        class="lookup"
        field="TRNM"
        [(ngModel)]="monitorData.transaction"
        [dataset]="transactionData"
        [options]="transactionOptions"
        [disabled]="transactionData.length == -1"
        (ngModelChange)="onTransactionChange()"
      />
      -->

      <input
        id="transaction-lookup"
        [(ngModel)]="monitorData.transaction"
        (ngModelChange)="onTransactionChange()"
      />
      <!--
      <input
        #transactionInput
        soho-lookup
        id="transaction-lookup"
        class="lookup"
        name="transaction-lookup"
        field="TRNM"
        [(ngModel)]="data.transaction"
        [dataset]="transactionData"
        [options]="transactionOptions"
        [disabled]="transactionData.length == 0"
        (ngModelChange)="onTransactionChange()"
      />
      -->
    </div>

    <div class="field">
      <label soho-label for="inputs">Inputs</label>
      <input
        id="inputs"
        [(ngModel)]="monitorData.inputs"
        (ngModelChange)="onInputsChange()"
      />
    </div>
    <div class="field">
      <label soho-label for="outputs">Outputs</label>
      <input
        id="outputs"
        [(ngModel)]="monitorData.outputs"
        (ngModelChange)="onOutputsChange()"
      />
    </div>
    <div class="field">
      <label soho-label for="outputDescriptions">Output Descriptions</label>
      <input
        id="outputDescriptions"
        [(ngModel)]="monitorData.outputDescriptions"
        (ngModelChange)="onOutputDescriptionsChange()"
      />
    </div>
    <div class="field">
      <label soho-label for="maxRecs">Maximum Records</label>
      <input
        id="maxRecs"
        [(ngModel)]="monitorData.maxRecs"
        (ngModelChange)="onMaxRecsChange()"
      />
    </div>

    <div class="field">
      <label soho-label for="drillback">Drillback</label>
      <input id="drillback" [(ngModel)]="monitorData.drillback" />
    </div>
    <div class="field">
      <label soho-label for="selectDisplayStyle">Display content as</label>
      <select
        #selectDisplayStyle
        soho-dropdown
        id="selectDisplayStyle"
        name="selectDisplayStyle"
        [(ngModel)]="monitorData.displayStyle"
        (ngModelChange)="onDisplayStyleChange()"
      >
        <option *ngFor="let style of displayStyles" [ngValue]="style">
          <span>{{ style }}</span>
        </option>
      </select>
    </div>

    <div class="field">
      <label soho-label [for]="'filters'">Filters</label>
      <input [id]="'filters'" [(ngModel)]="monitorData.filters" />
    </div>
    <!--
    <ng-container
      *ngFor="let filterField of monitorData.filterFields; index as i"
    >
      <div class="field">
        <label soho-label [for]="'filterField-' + i">Filter Field</label>
        <input
          [id]="'filterField-' + i"
          [(ngModel)]="monitorData.filterFields[i]"
          (ngModelChange)="onFilterFieldChange(i)"
        />
      </div>

      <div class="field">
        <label soho-label [for]="'filterValue-' + i">Filter VAlue</label>
        <input
          [id]="'filterValue-' + i"
          [(ngModel)]="monitorData.filterExpressions[i]"
          (ngModelChange)="onFilterValueChange(i)"
        />
      </div>
      <div class="field">
        <button
          type="button"
          class="btn-secondary"
          id="btn-delete"
          (click)="removeFilter(i)"
        >
          <span>Remove Filter</span>
          <svg
            role="presentation"
            aria-hidden="true"
            focusable="false"
            class="icon"
          >
            <use href="#icon-delete"></use>
          </svg>
        </button>
      </div>
    </ng-container>
    -->

    <!--
    <div class="row">
      <div class="field">
        <button
          class="btn-primary"
          type="button"
          id="btn-add"
          (click)="addFilter($event)"
        >
          <svg
            class="icon"
            focusable="false"
            aria-hidden="true"
            role="presentation"
          >
            <use href="#icon-add"></use>
          </svg>
          <span>Add Filter</span>
        </button>
      </div>
    </div>
-->
  `,
})
export class SettingsSubcomponentMonitor
  extends SettingsSubcomponent
  implements OnInit
{
  @Input() widgetSettingsContext: IWidgetSettingsContext2;
  @Input() label: string;

  @Output() onChange: EventEmitter<IMonitorData> =
    new EventEmitter<IMonitorData>();

  @Input()
  monitorData: IMonitorData;

  programOptions: SohoDataGridOptions;
  programData: SohoDataSet = [];
  transactionOptions: SohoDataGridOptions;
  transactionData: SohoDataSet = [];

  displayStyles: string[] = ["Grid", "List" /*"Graph"*/];

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.widgetSettingsContext) {
      const widgetContext = this.widgetSettingsContext.getWidgetContext();
      const settings = widgetContext.getSettings();

      const monitorData = settings.get("api");
      this.monitorData = JSON.parse(monitorData) as IMonitorData;
      console.log("monitorData");
      console.log(this.monitorData);
    } else if (!this.monitorData) {
      this.monitorData = {} as IMonitorData;
    }
    this.buildAllOptions();

    this.getPrograms();
    if (this.monitorData.program) {
      this.getTransactions();
    }
  }

  onProgramChange() {
    console.log("Program Changed.");
    this.getTransactions();
    this.monitorData.transaction = "";
    console.log(this.monitorData);
    this.onChange.emit(this.monitorData);
  }
  onTransactionChange() {
    console.log("Transaction Changed.");
    console.log(this.monitorData);
    this.onChange.emit(this.monitorData);
  }

  onInputsChange() {
    this.onChange.emit(this.monitorData);
  }

  onOutputsChange() {
    this.onChange.emit(this.monitorData);
  }

  onOutputDescriptionsChange() {
    this.onChange.emit(this.monitorData);
  }

  onMaxRecsChange() {
    this.onChange.emit(this.monitorData);
  }

  onDisplayStyleChange() {
    console.log("onDisplayStyleChange");
    console.log(this.monitorData);
    this.onChange.emit(this.monitorData);
  }

  private buildAllOptions() {
    this.programOptions = this.buildOptions([
      {
        id: "MINM",
        name: "Program",
        field: "MINM",
      },
      {
        id: "MIDS",
        name: "Description",
        field: "MIDS",
      },
    ]);
    this.transactionOptions = this.buildOptions([
      {
        id: "TRNM",
        name: "Transaction",
        field: "TRNM",
      },
      {
        id: "TRDS",
        name: "Description",
        field: "TRDS",
      },
    ]);
  }

  private buildOptions(columns: SohoDataGridColumn[]): SohoDataGridOptions {
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
    } as SohoDataGridOptions;

    return options;
  }

  private getPrograms() {
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

  private getTransactions() {
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

  onFilterFieldChange(i: number) {
    console.log(i + ": Field changed");
  }

  onFilterValueChange(i: number) {
    console.log(i + ": Value changed");
  }

  /*
  removeFilter(i: number) {
    console.log("removing filter " + i);
    console.log(this.monitorData.filterFields);
    this.monitorData.filterFields.splice(i, 1); // = this.monitorData.filterFields.splice(i, 1);
    this.monitorData.filterExpressions.splice(i, 1);
    // = this.monitorData.filterExpressions.splice(i, 1);

    console.log(this.monitorData.filterFields);
  }

  addFilter(e: any) {
    if (!this.monitorData.filterFields) {
      this.monitorData.filterFields = [];
    }
    if (!this.monitorData.filterExpressions) {
      this.monitorData.filterExpressions = [];
    }
    this.monitorData.filterFields.push("");
    this.monitorData.filterExpressions.push("");
  }
  */

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
  save(): void {
    console.log("Saving monitor");
    console.log(this.monitorData);
    const widgetContext = this.widgetSettingsContext.getWidgetContext();
    const settings = widgetContext.getSettings();
    settings.set("api", JSON.stringify(this.monitorData));

    //settings.set("api", JSON.stringify(this.channels));
  }
}
