export default class Storage {
    constructor() {
        this.svg = document.querySelector('#svg');
    }
    save() {
        localStorage.setItem('document', document.querySelector('#drawing').innerHTML);
    }
    reset() {
        localStorage.removeItem('document');
    }
}
//# sourceMappingURL=local-storage.js.map