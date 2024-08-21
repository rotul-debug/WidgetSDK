import { Component, Input, OnInit } from "@angular/core";
import { IWidgetSettingsContext2 } from "lime";
import { SettingsSubcomponent } from "./settings-subcomponent";

/**
 * This component can be used to display a Title setting field with a padlock.
 * It works with the given (required) widgetSettingContext to determine whether title should
 * be locked, unlocked, editable, unlockable etc.
 *
 * Call save() to commit the changes to the widget settings.
 */
@Component({
  selector: "settings-subcomponent-header-color",
  template: `
    <div class="field">
      <label *ngIf="label">{{ label }}</label>
      <input [(ngModel)]="value" [maxlength]="100" />
    </div>
  `,
})
export class SettingsSubcomponentHeaderColor
  extends SettingsSubcomponent
  implements OnInit
{
  @Input() widgetSettingsContext: IWidgetSettingsContext2;
  @Input() label: string = "Header Color";

  value: string;

  ngOnInit(): void {
    const widgetContext = this.widgetSettingsContext.getWidgetContext();
    this.value = JSON.parse(
      widgetContext.getSettings().get("headerColor", '""')
    );
  }

  /**
   * Persist changes to the title and lock by saving to widget context.
   */
  save(): void {
    console.log("Saving Header Color");
    const widgetContext = this.widgetSettingsContext.getWidgetContext();
    const settings = widgetContext.getSettings();

    settings.set("headerColor", JSON.stringify(this.value));
  }
}
