/**
* This is a static class for creating container elements with unique
* identifiers.
*/
export default class Container {
    static count = 0;
    /**
    * Returns a container with a unique id.
    */
    static createContainer() {
        let div = document.createElement('div');
        let section = document.getElementById('tests');
        div.classList.add('test-container');
        div.id = `id-${Container.count++}`;
        section.appendChild(div);
        return div;
    }
}
//# sourceMappingURL=container.js.map