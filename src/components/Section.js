export class Section {
    constructor( items, renderer, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    };
  
    renderItems() {
        this._renderedItems.forEach(item => {
            const card = this._renderer(item);
            this.addItem(card);
        });
    };
  
    addItem(element) {
        this._container.prepend(element);
    };
};