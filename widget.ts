import { IWidgetContext, IWidgetInstance } from "lime";
import {
  InformationViewerMonitorComponent,
  InformationViewerMonitorModule,
  getActions,
} from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
  return {
    actions: getActions(),
    angularConfig: {
      moduleType: InformationViewerMonitorModule,
      componentType: InformationViewerMonitorComponent,
    },
  };
};
