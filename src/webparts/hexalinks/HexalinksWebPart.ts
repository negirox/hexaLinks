import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  //PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'HexalinksWebPartStrings';
import Hexalinks from './components/Hexalinks';
import { IHexalinksProps } from './components/IHexalinksProps';
import SPService from '../../services/SPServices';
const columns = [
  { Name: 'ItemOrder', Type: 'Number', Default: 0, },
  { Name: 'Description', Type: 'Text', Default: '' },
  { Name: 'Display', Type: 'Boolean', Default: 1 },
  { Name: 'IconName', Type: 'Text', Default: '' },
  { Name: 'QuickLinkUrl', Type: 'Text', Default: '' },
  { Name: 'ForeGroundColor', Type: 'Text', Default: '' },
  { Name: 'BackgroundColor', Type: 'Text', Default: '' },
  { Name: 'BackgroundImageURL', Type: 'Text', Default: '' }
];
export interface IHexalinksWebPartProps {
  description: string;
  backgroundColor?:string;
  showOnlyInfo:boolean;
}

export default class HexalinksWebPart extends BaseClientSideWebPart<IHexalinksWebPartProps> {
  private _service: SPService;
  public render(): void {
    const service: SPService = new SPService(this.context);
    const cols = columns.map(x=>{
      return x.Name;
    });
    cols.push("Title");
    cols.push("Id");
    const element: React.ReactElement<IHexalinksProps> = React.createElement(
      Hexalinks,
      {
        description: this.properties.description,
        service: service,
        listName:'HexaLinks',
        columns: cols,
        backgroundColor:this.properties.backgroundColor,
        showOnlyInfo:this.properties.showOnlyInfo ?? false
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  public async onInit(): Promise<void> {
    this._service = new SPService(this.context);
    await this._service.ensureList('HexaLinks', columns);
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('backgroundColor', {
                  label: "Enter Background color"
                }),
              /*   PropertyPaneToggle('showOnlyInfo',{
                  label:"Show Info Only"
                }) */
              ]
            }
          ]
        }
      ]
    };
  }
}
