export class Section {
    constructor( items, renderer, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };
  
    renderItems() {
        this._renderedItems.forEach(item => {
            const newItem = this._renderer(item);
            this.addItem(newItem);
        });
    };
  
    addItem(element) {
        this._container.prepend(element);
    };
};