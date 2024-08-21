import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
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
  selector: "settings-subcomponent-drillback",
  template: `
    <div class="field">
      <label soho-label for="bookmark-input">URL</label>
      <input id="bookmark-input" [(ngModel)]="bookmark" />
    </div>
  `,
})
export class SettingsSubcomponentDrillback
  extends SettingsSubcomponent
  implements OnInit
{
  @Input() widgetSettingsContext: IWidgetSettingsContext2;
  @Input() label: string;

  @Output() onChange: EventEmitter<IMonitorData> =
    new EventEmitter<IMonitorData>();

  @Input()
  bookmark: string;

  //bookmark: string = "";

  constructor() {
    super();
  }

  ngOnInit(): void {
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
    console.log("Saving drillback");
    console.log(this.bookmark);
    const widgetContext = this.widgetSettingsContext.getWidgetContext();
    const settings = widgetContext.getSettings();
    settings.set("bookmark", this.bookmark);
    console.log("Saved " + this.bookmark + " to bookmark setting.");

    //settings.set("api", JSON.stringify(this.channels));
  }
}
