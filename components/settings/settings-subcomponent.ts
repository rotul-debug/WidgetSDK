import { Component, Input, QueryList, ViewChildren } from "@angular/core";
import { SohoModalDialogService } from "ids-enterprise-ng";
import { DialogService, IWidgetSettingsContext2 } from "lime";
import { isInterfaceDeclaration, isThisTypeNode } from "typescript";
@Component({
  template: ``,
})
export class SettingsSubcomponent {
  @Input() widgetSettingsContext: IWidgetSettingsContext2;
  @Input() name: string;
  @Input() afterChange: () => void;

  save() {
    throw new Error("save() must be overridden.");
  }
}
