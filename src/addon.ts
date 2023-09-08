import hooks from "./hooks";
import { createZToolkit } from "./utils/ztoolkit";
import { DialogHelper } from "zotero-plugin-toolkit/dist/helpers/dialog";
import { ProgressWindowHelper } from "zotero-plugin-toolkit/dist/helpers/progressWindow";

class Addon {
    public data: {
        alive: boolean;
        // Env type, see build.js
        env: "development" | "production";
        // ztoolkit: MyToolkit;
        ztoolkit: ZToolkit;
        locale?: {
            current: any;
        };
        prefs?: {
            window: Window;
        };
        dialogs: {
            richTextToolBar?: DialogHelper | undefined;
            selectLang?: DialogHelper | undefined;
            duplicationDialog?: DialogHelper | undefined;
        };
        lint: {
            queue: [];
            current: {
                item: Zotero.Item | null;
                dataFromAPI: {
                    doi?: object;
                    crossRef?: object;
                };
            };
            progressWin: ProgressWindowHelper | null;
        };
    };
    // Lifecycle hooks
    public hooks: typeof hooks;
    // APIs
    public api: object = {};

    constructor() {
        this.data = {
            alive: true,
            env: __env__,
            // ztoolkit: new MyToolkit(),
            ztoolkit: createZToolkit(),
            dialogs: {},
            lint: {
                queue: [],
                current: {
                    item: null,
                    dataFromAPI: {},
                },
                progressWin: null,
            },
        };
        this.hooks = hooks;
        this.api = {};
    }
}

export default Addon;
