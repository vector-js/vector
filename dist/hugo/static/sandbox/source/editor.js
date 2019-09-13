import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
/**
* A text editor for the web.
*/
export default class Editor {
    /**
    * Construts a new instance of editor
    */
    constructor(id) {
        ace.require("ace/ext/language_tools");
        this.editor = ace.edit(id);
        this.editor.session.setMode("ace/mode/javascript");
    }
    /**
    * Returns the current session's content.
    */
    getValue() {
        return this.editor.getValue();
    }
    getEndRowNum() {
        for (let i = this.editor.session.getLength() - 1; i >= 0; i++) {
            if (this.editor.session.getRowLength(i) != 0) {
                return i + 1;
            }
        }
        return 0;
    }
}
//# sourceMappingURL=editor.js.map