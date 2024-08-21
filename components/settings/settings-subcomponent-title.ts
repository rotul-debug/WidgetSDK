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
  selector: "settings-subcomponent-title",
  template: `
    <div class="field">
      <label *ngIf="label">{{ label }}</label>
      <input
        [readOnly]="!isTitleEditEnabled || isTitleLocked"
        [(ngModel)]="title"
        [maxlength]="100"
      />
      <button
        soho-button="icon"
        [icon]="lockIcon"
        [disabled]="!isTitleUnlockable"
        (click)="onLockClicked()"
      ></button>
    </div>
  `,
})
export class SettingsSubcomponentTitle
  extends SettingsSubcomponent
  implements OnInit
{
  @Input() widgetSettingsContext: IWidgetSettingsContext2;
  @Input() label: string;

  title: string;
  isTitleEditEnabled: boolean;
  isTitleUnlockable: boolean;
  isTitleLocked: boolean;

  get lockIcon(): string {
    return this.isTitleLocked ? "locked" : "unlocked";
  }

  ngOnInit(): void {
    const widgetContext = this.widgetSettingsContext.getWidgetContext();
    this.isTitleEditEnabled = widgetContext.isTitleEditEnabled();
    this.isTitleLocked = widgetContext.isTitleLocked();
    this.title = widgetContext.getResolvedTitle(this.isTitleLocked);
    this.isTitleUnlockable = widgetContext.isTitleUnlockable();
  }

  /**
   * Persist changes to the title and lock by saving to widget context.
   */
  save(): void {
    console.log("Saving title");
    const widgetContext = this.widgetSettingsContext.getWidgetContext();
    widgetContext.setTitleLocked(this.isTitleLocked);
    //const settings = widgetContext.getSettings();
    //settings.set("title", JSON.stringify(this.title));

    if (this.isTitleEditEnabled) {
      widgetContext.setTitle(this.title);
    }
  }

  onLockClicked(): void {
    this.isTitleLocked = !this.isTitleLocked;
    if (this.isTitleLocked) {
      this.title = this.widgetSettingsContext
        .getWidgetContext()
        .getStandardTitle();
    }
  }
}
