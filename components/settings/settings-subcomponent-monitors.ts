import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from "@angular/core";
//import { SohoModalDialogRef, SohoModalDialogService } from "ids-enterprise-ng";
import { IWidgetSettingsContext2 } from "lime";
import { Monitor, IMonitorData, IChannelData } from "../../core";
import { MIService } from "../../miService";
import { SettingsSubcomponent } from "./settings-subcomponent";
import { SettingsSubcomponentMonitor } from "./settings-subcomponent-monitor";

import {
  SohoAccordionComponent,
  SohoModalDialogRef,
  SohoModalDialogService,
} from "@infor/sohoxi-angular";

@Component({
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
export class SettingsSubcomponentMonitorsDialog
  extends Component
  implements OnInit
{
  @ViewChildren("subcomponent")
  subcomponents: QueryList<SettingsSubcomponent>;
  widgetSettingsContext: IWidgetSettingsContext2;

  @ViewChild("apiSettings")
  apiSettings: SettingsSubcomponentMonitor;

  name: string;

  ngOnInit(): void {}

  /*
  static Create(service: SohoModalDialogService, modalPlaceholder: ViewContainerRef, parameters: Record<string, any>) {
    
    const dialog: SohoModalDialogRef<SettingsSubcomponentMonitorsDialog> =
    service
      .modal<SettingsSubcomponentMonitorsDialog>(
        SettingsSubcomponentMonitorsDialog,
        modalPlaceholder
      )
      .id("onConfirm")
      .title("Add Monitor")
      .buttons([
        {
          text: "Cancel",
          click: (e, modal) => dialog.close("cancel"),
        },
        {
          text: "Ok",
          click: (e, modal) => dialog.close("ok"),
          isDefault: true,
        },
      ])
      .apply((dialogComponent) => {
        Object.entries(parameters).forEach(([key, value]) => {
          dialogComponent[key] = value;
        })
        dialogComponent["widgetSettingsContext"] = this.widgetSettingsContext;
        dialogComponent["test"] = "a";
      })
      .beforeClose((ref) => {
        console.log(ref);
        console.log(ref.componentDialog.apiSettings.apiData);
        return ref.dialogResult === "ok";
      })
      .afterClose((result) => {
        console.log("afterClose");
        console.log(result);
        if (result === "ok") {
          console.log("apiData");
          this.monitors.push({
            name: dialog.componentDialog.name,
            apiData: dialog.componentDialog.apiSettings.apiData,
            maxRecords: 100,
          });
          //console.log(dialog.componentDialog.apiSettings.apiData);
        }
        //if (result)
        //dialog.componentDialog.apiSettings.apiData
      });
      
  }
  */
}

/**
 * This component can be used to display a Title setting field with a padlock.
 * It works with the given (required) widgetSettingContext to determine whether title should
 * be locked, unlocked, editable, unlockable etc.
 *
 * Call save() to commit the changes to the widget settings.
 */
@Component({
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSubcomponentMonitors
  extends SettingsSubcomponent
  implements OnInit
{
  @ViewChildren("subcomponent")
  subcomponents: QueryList<SettingsSubcomponent>;
  @Input() widgetSettingsContext: IWidgetSettingsContext2;
  @Input() label: string;

  @ViewChild("modalPlaceholder")
  modalPlaceholder: ViewContainerRef;

  @ViewChild("accordion")
  accordion: SohoAccordionComponent;

  monitors: IMonitorData[];
  displayAsViewer: boolean;

  //apiData: IApiData;

  //programOptions: SohoDataGridOptions;
  //programData: SohoDataSet = [];
  //transactionOptions: SohoDataGridOptions;
  //transactionData: SohoDataSet = [];

  constructor(
    /*private modalService: SohoModalDialogService*/ private readonly changeDetectionRef: ChangeDetectorRef,
    private modalService: SohoModalDialogService
  ) {
    super();
  }

  ngOnInit(): void {
    const widgetContext = this.widgetSettingsContext.getWidgetContext();
    const settings = widgetContext.getSettings();

    const monitors = settings.get("monitors") ?? "[]";
    this.monitors = JSON.parse(monitors) as IMonitorData[];

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
    } as IMonitorData);
    console.log(this.monitors);
    this.changeDetectionRef.detectChanges();

    if (this.accordion) {
      this.accordion.updated();
    }

    //console.log("Open modal");

    //dialog.open();
  }

  removeMonitor(i: number) {
    this.monitors.splice(i, 1);
  }

  onMonitorInputChange(data: IMonitorData, i: number) {
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
  save(): void {
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
}
