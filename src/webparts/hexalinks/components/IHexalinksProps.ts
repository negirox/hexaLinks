import SPService from "../../../services/SPServices";

export interface IHexalinksProps {
  description: string;
  service?:SPService;
  listName?:string;
  columns?:string[];
  backgroundColor?:string;
  showOnlyInfo:boolean;
}
