import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  IWidgetSettingsComponent,
  IWidgetSettingsContext2,
  IWidgetSettingsInstance2,
} from "lime";
import { MIService } from "../../miService";
import { SettingsSubcomponent } from "./settings-subcomponent";

@Component({
  template: `
    <div>
      <settings-subcomponent-title
        #subcomponent
        [widgetSettingsContext]="widgetSettingsContext"
      >
      </settings-subcomponent-title>

      <settings-subcomponent-header-color
        #subcomponent
        [widgetSettingsContext]="widgetSettingsContext"
      >
      </settings-subcomponent-header-color>

      <settings-subcomponent-monitors
        #subcomponent
        [widgetSettingsContext]="widgetSettingsContext"
      >
      </settings-subcomponent-monitors>
      <!--
      <settings-subcomponent-channels
        #subcomponent
        [widgetSettingsContext]="widgetSettingsContext"
      ></settings-subcomponent-channels>
      -->
    </div>
  `,
})
export class SettingsComponent implements IWidgetSettingsComponent, OnInit {
  @Input() widgetSettingsContext: IWidgetSettingsContext2;
  @Input() widgetSettingsInstance: IWidgetSettingsInstance2;

  @ViewChildren("subcomponent")
  subcomponents: QueryList<SettingsSubcomponent>;

  constructor() {}

  ngOnInit(): void {
    console.log("SettingsComponent.onInit()");
    this.initSettings();
    this.setSettingsClosingHandler();
  }

  private initSettings(): void {
    const widgetContext = this.widgetSettingsContext.getWidgetContext();
    const settings = widgetContext.getSettings();
    const lang = widgetContext.getLanguage();
  }

  private setSettingsClosingHandler(): void {
    this.widgetSettingsInstance.closing = (closingArg) => {
      if (closingArg.isSave) {
        console.log("Saving settings");
        this.subcomponents.forEach((subcomponent) => {
          subcomponent.save();
        });

        console.log("Saved.");
        const widgetContext = this.widgetSettingsContext.getWidgetContext();
        console.log(
          JSON.parse(widgetContext.getSettings().getValues().monitors)
        );
      } else {
        console.log("Not saving.");
      }
    };
  }
}
