import { WebPartContext } from "@microsoft/sp-webpart-base";
import { getSP } from "../pnpjsConfig";
import { SPFI } from "@pnp/sp";
import { ListColumns } from "./ListColumns";
import { Log } from "@microsoft/sp-core-library";
import { ResponseValue } from "../models/ResponseValue";
const LOG_SOURCE = "MSGraphService";
export class SPService {
    private ListTitle: string = "HexgonLinks";
    private _context: WebPartContext;
    private sp: SPFI;
    constructor(context: WebPartContext) {
        this._context = context;
        this.sp = getSP(this._context);
    }
    public async ensureList(listName?: string, columns?: ListColumns[]): Promise<boolean> {
        const _web = this.sp.web;
        let result = false;
        this.ListTitle = listName ?? this.ListTitle;
        try {
            await this.sp.web.lists.getByTitle(this.ListTitle)().then(x => {
                console.log(`${this.ListTitle} list already exist`);
            }).catch(async x => {

                const ensureResult = await _web.lists.ensure(this.ListTitle, "HexaLinks", 100, true);
                // if we've got the list
                if (ensureResult.list !== null) {

                    // if the list has just been created
                    if (ensureResult.created) {
                        for (let index = 0; index < columns.length; index++) {
                            const x = columns[index];
                            switch (x.Type) {
                                case 'Text': await ensureResult.list.fields.addText(x.Name, { MaxLength: x.length }); break;
                                case 'Number': await ensureResult.list.fields.addNumber(x.Name, { Required: x.required }); break;
                                case 'Date': await ensureResult.list.fields.addDateTime(x.Name, { Required: x.required }); break;
                                case 'Boolean': await ensureResult.list.fields.addBoolean(x.Name, { Required: x.required }); break;
                            }
                            const allItemsView = ensureResult.list.views.getByTitle('All Items');
                            await allItemsView.fields.add(x.Name);
                            console.log(x.Name + 'Added');
                        }
                        result = true;
                    }
                }
            });

        } catch (e) {
            // if we fail to create the list, write an exception in the _context log
            Log.error(LOG_SOURCE + "enSureList():", e);
            result = false;
        }

        return result;
    }
    public async getListItems(listName?: string, columns?: string[], expand?: string[]): Promise<ResponseValue[]> {
        this.ListTitle = listName ?? this.ListTitle;
        const selectColumns = columns !== null ? columns.toString() : "*";
        const expandColumns = expand !== null ? expand.toString() : null;
        let items:ResponseValue[] = null;
        if (expandColumns === null && selectColumns !== null) {
            items = await this.sp.web.lists.getByTitle(this.ListTitle).items.select(selectColumns).top(4999).orderBy("Modified", false)();
        }
        else if (expandColumns !== null && selectColumns !== null) {
            items = await this.sp.web.lists.getByTitle(this.ListTitle).items.select(selectColumns).expand(expandColumns).top(4999).orderBy("Modified", false)();
        }
        else {
            items = await this.sp.web.lists.getByTitle(this.ListTitle).items.select("*").top(4999).orderBy("Modified", false)();
        }
        return items;
    }
}
export default SPService;
