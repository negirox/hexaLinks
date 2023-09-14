import { HexLinksModel } from "../../../models/HexLinksModel"

export interface IHexalinksState {
    records: Array<HexLinksModel>
    errors: Array<string>
    loading: boolean
}